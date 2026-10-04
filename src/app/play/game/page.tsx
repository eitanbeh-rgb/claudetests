'use client';

import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Chess, Square } from 'chess.js';
import { MainLayout } from '@/components/layout/MainLayout';
import { ChessBoard } from '@/components/chess/ChessBoard';
import { GameClock } from '@/components/chess/GameClock';
import { MoveHistory } from '@/components/chess/MoveHistory';
import { CapturedPieces } from '@/components/chess/CapturedPieces';
import { GameControls } from '@/components/chess/GameControls';
import { GameEndModal } from '@/components/chess/GameEndModal';
import { TimeCategory, GameMode, PieceColor } from '@/types/chess';
import { calculateElo } from '@/lib/chess/elo';
import { Repository } from '@/lib/storage/repository';

function PlayGameContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tcId = searchParams.get('tc') || 'rapid_10_0';
  const isRanked = searchParams.get('ranked') !== '0';
  const mode = (searchParams.get('mode') as GameMode) || 'ranked';
  const aiLevel = parseInt(searchParams.get('aiLevel') || '3', 10);

  const profile = Repository.getProfile();
  const settings = Repository.getSettings();

  // Determine initial time in seconds
  const initialSeconds = tcId.includes('1_0')
    ? 60
    : tcId.includes('3_0')
    ? 180
    : tcId.includes('5_0')
    ? 300
    : 600;

  const category: TimeCategory = initialSeconds <= 120 ? 'bullet' : initialSeconds <= 300 ? 'blitz' : 'rapid';

  const [game, setGame] = useState<Chess>(new Chess());
  const [boardOrientation, setBoardOrientation] = useState<PieceColor>('w');
  const [history, setHistory] = useState<string[]>([]);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);

  // Clocks
  const [whiteTime, setWhiteTime] = useState<number>(initialSeconds);
  const [blackTime, setBlackTime] = useState<number>(initialSeconds);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [gameResultTitle, setGameResultTitle] = useState<string>('');
  const [gameResultSubtitle, setGameResultSubtitle] = useState<string>('');
  const [ratingChange, setRatingChange] = useState<number>(0);
  const [newRating, setNewRating] = useState<number>(profile.ratings[category]);

  const [captured, setCaptured] = useState({
    w: { p: 0, n: 0, b: 0, r: 0, q: 0 },
    b: { p: 0, n: 0, b: 0, r: 0, q: 0 },
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Player Info
  const whitePlayer = {
    id: profile.id,
    name: profile.username,
    rating: profile.ratings[category],
  };

  const blackPlayer = {
    id: mode === 'ai' ? 'ai_bot' : 'opponent_player',
    name: mode === 'ai' ? `Stockfish AI (Lvl ${aiLevel})` : 'GrandmasterOpponent',
    rating: mode === 'ai' ? 700 + aiLevel * 150 : profile.ratings[category] + 15,
  };

  // Timer Tick Interval
  useEffect(() => {
    if (isGameOver) return;

    timerRef.current = setInterval(() => {
      const turn = game.turn();
      if (turn === 'w') {
        setWhiteTime((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleGameOver('b', 'Black wins on time (White ran out of time)');
            return 0;
          }
          return prev - 1;
        });
      } else {
        setBlackTime((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleGameOver('w', 'White wins on time (Black ran out of time)');
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [game.fen(), isGameOver]);

  const handleGameOver = (winnerColor: PieceColor | 'draw', reason: string) => {
    setIsGameOver(true);
    if (timerRef.current) clearInterval(timerRef.current);

    let title = 'GAME DRAW';
    let isWin = false;
    let scorePlayer: 1 | 0.5 | 0 = 0.5;

    if (winnerColor === 'w') {
      title = 'YOU WON!';
      isWin = true;
      scorePlayer = 1;
    } else if (winnerColor === 'b') {
      title = 'DEFEAT';
      scorePlayer = 0;
    }

    setGameResultTitle(title);
    setGameResultSubtitle(reason);

    // Calculate Elo change if ranked
    if (isRanked && mode !== 'friend') {
      const eloRes = calculateElo(
        profile.ratings[category],
        blackPlayer.rating,
        scorePlayer,
        profile.ratingStats[category].gamesPlayed
      );

      setRatingChange(eloRes.changePlayer);
      setNewRating(eloRes.newRatingPlayer);

      // Save updated profile
      const updatedProfile = { ...profile };
      updatedProfile.ratings[category] = eloRes.newRatingPlayer;
      const stats = updatedProfile.ratingStats[category];
      stats.gamesPlayed += 1;
      stats.rating = eloRes.newRatingPlayer;
      stats.highest = Math.max(stats.highest, eloRes.newRatingPlayer);
      if (scorePlayer === 1) stats.wins += 1;
      else if (scorePlayer === 0) stats.losses += 1;
      else stats.draws += 1;

      Repository.saveProfile(updatedProfile);
    }
  };

  const updateCapturedPieces = useCallback((currentFen: string) => {
    const temp = new Chess(currentFen);
    const counts = {
      w: { p: 8, n: 2, b: 2, r: 2, q: 1 },
      b: { p: 8, n: 2, b: 2, r: 2, q: 1 },
    };

    temp.board().forEach((row) => {
      row.forEach((square) => {
        if (square && square.type !== 'k') {
          counts[square.color][square.type] -= 1;
        }
      });
    });

    setCaptured({
      w: {
        p: Math.max(0, counts.b.p),
        n: Math.max(0, counts.b.n),
        b: Math.max(0, counts.b.b),
        r: Math.max(0, counts.b.r),
        q: Math.max(0, counts.b.q),
      },
      b: {
        p: Math.max(0, counts.w.p),
        n: Math.max(0, counts.w.n),
        b: Math.max(0, counts.w.b),
        r: Math.max(0, counts.w.r),
        q: Math.max(0, counts.w.q),
      },
    });
  }, []);

  // Make AI Move
  const makeAiMove = useCallback(() => {
    if (game.isGameOver() || isGameOver) return;

    setTimeout(() => {
      const possibleMoves = game.moves({ verbose: true });
      if (possibleMoves.length === 0) return;

      // Select move based on difficulty or random fallback
      const chosenMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      const moveResult = game.move(chosenMove);

      if (moveResult) {
        const nextGame = new Chess(game.fen());
        setGame(nextGame);
        setHistory(nextGame.history());
        setLastMove({ from: chosenMove.from as Square, to: chosenMove.to as Square });
        updateCapturedPieces(nextGame.fen());

        if (nextGame.isCheckmate()) {
          handleGameOver('b', 'Black checkmated White');
        } else if (nextGame.isDraw()) {
          handleGameOver('draw', 'Game ended in a draw');
        }
      }
    }, 600);
  }, [game, isGameOver, updateCapturedPieces]);

  const handleMove = (from: Square, to: Square, promotion?: string) => {
    if (isGameOver) return false;

    try {
      const moveResult = game.move({ from, to, promotion: promotion || 'q' });
      if (!moveResult) return false;

      const nextGame = new Chess(game.fen());
      setGame(nextGame);
      setHistory(nextGame.history());
      setLastMove({ from, to });
      updateCapturedPieces(nextGame.fen());

      if (nextGame.isCheckmate()) {
        handleGameOver(nextGame.turn() === 'b' ? 'w' : 'b', 'Checkmate');
        return true;
      } else if (nextGame.isDraw()) {
        handleGameOver('draw', 'Game ended in a draw');
        return true;
      }

      if (mode === 'ai' && nextGame.turn() === 'b') {
        makeAiMove();
      }

      return true;
    } catch {
      return false;
    }
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side - Chess Board & Clocks */}
        <div className="lg:col-span-8 space-y-3">
          {/* Top Opponent Clock */}
          <GameClock
            playerName={blackPlayer.name}
            playerRating={blackPlayer.rating}
            timeInSeconds={blackTime}
            isActive={game.turn() === 'b' && !isGameOver}
          />

          {/* Captured Pieces by Opponent */}
          <CapturedPieces captured={captured} color="b" pieceSkinId={settings.pieceSkin} />

          {/* Interactive Chess Board */}
          <ChessBoard
            game={game}
            orientation={boardOrientation}
            onMove={handleMove}
            lastMove={lastMove}
            boardSkinId={settings.boardSkin}
            pieceSkinId={settings.pieceSkin}
            showLegalMoves={settings.showLegalMoves}
            showCoordinates={settings.showCoordinates}
            disabled={isGameOver}
          />

          {/* Captured Pieces by White */}
          <CapturedPieces captured={captured} color="w" pieceSkinId={settings.pieceSkin} />

          {/* Bottom Player Clock */}
          <GameClock
            playerName={whitePlayer.name}
            playerRating={whitePlayer.rating}
            timeInSeconds={whiteTime}
            isActive={game.turn() === 'w' && !isGameOver}
          />
        </div>

        {/* Right Side - History & Controls */}
        <div className="lg:col-span-4 space-y-4 h-full flex flex-col justify-between min-h-[500px]">
          <MoveHistory history={history} currentMoveIndex={history.length - 1} />

          <GameControls
            onResign={() => handleGameOver('b', 'Resignation')}
            onOfferDraw={() => handleGameOver('draw', 'Draw by agreement')}
            onFlipBoard={() => setBoardOrientation((prev) => (prev === 'w' ? 'b' : 'w'))}
            soundEnabled={settings.soundEnabled}
            onToggleSound={() => {
              const updated = { ...settings, soundEnabled: !settings.soundEnabled };
              Repository.saveSettings(updated);
            }}
            isGameOver={isGameOver}
            onNewGame={() => router.push('/play')}
          />
        </div>
      </div>

      {/* Game End Modal */}
      <GameEndModal
        isOpen={isGameOver}
        resultTitle={gameResultTitle}
        resultSubtitle={gameResultSubtitle}
        isWinner={gameResultTitle.includes('WON')}
        isDraw={gameResultTitle.includes('DRAW')}
        ratingChange={ratingChange}
        newRating={newRating}
        onPlayAgain={() => router.push('/play')}
        onAnalyzeGame={() => router.push('/coach')}
        onHome={() => router.push('/')}
      />
    </MainLayout>
  );
}

export default function PlayGamePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-white">Loading ChessForge Game...</div>}>
      <PlayGameContent />
    </Suspense>
  );
}
