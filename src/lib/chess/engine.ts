// Web Worker / Engine Analysis Interface for Stockfish / Chess Evaluation
import { Chess } from 'chess.js';

export interface EngineAnalysisResult {
  evaluation: number; // Centipawns (+150 = +1.5 pawns for White)
  bestMoveSan: string;
  bestMoveFrom: string;
  bestMoveTo: string;
  pv: string[]; // Principal variation
  mateIn?: number;
}

export interface EvaluatedMove {
  san: string;
  from: string;
  to: string;
  fenBefore: string;
  fenAfter: string;
  evalBefore: number;
  evalAfter: number;
  bestMoveSan: string;
  evalDiff: number; // e.g. -250 cp drop = blunder
  classification: 'brilliant' | 'great' | 'best' | 'excellent' | 'good' | 'inaccuracy' | 'mistake' | 'blunder';
}

/**
 * Tactical evaluation heuristic & move classifier
 */
export function classifyMove(evalDiff: number): EvaluatedMove['classification'] {
  // evalDiff is relative to the player who moved
  if (evalDiff >= 50) return 'brilliant';
  if (evalDiff >= 20) return 'great';
  if (evalDiff >= -20) return 'best';
  if (evalDiff >= -50) return 'good';
  if (evalDiff >= -100) return 'inaccuracy';
  if (evalDiff >= -250) return 'mistake';
  return 'blunder';
}

/**
 * Fast client-side move analysis engine calculating material & position heuristics
 */
export function analyzePosition(fen: string): EngineAnalysisResult {
  const game = new Chess(fen);
  if (game.isCheckmate()) {
    return {
      evaluation: game.turn() === 'w' ? -10000 : 10000,
      bestMoveSan: 'None',
      bestMoveFrom: '',
      bestMoveTo: '',
      pv: [],
      mateIn: 0,
    };
  }

  const moves = game.moves({ verbose: true });
  if (moves.length === 0) {
    return { evaluation: 0, bestMoveSan: 'None', bestMoveFrom: '', bestMoveTo: '', pv: [] };
  }

  // Calculate material balance
  let material = 0;
  const values: Record<string, number> = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 20000 };

  game.board().forEach((row) => {
    row.forEach((sq) => {
      if (sq) {
        const val = values[sq.type] || 0;
        material += sq.color === 'w' ? val : -val;
      }
    });
  });

  // Evaluate candidate moves
  let bestMove = moves[0];
  let bestScore = -Infinity;

  moves.forEach((move) => {
    const tempGame = new Chess(fen);
    tempGame.move(move);

    // Basic minimax score
    let score = 0;
    if (tempGame.isCheckmate()) score = 5000;
    else if (move.captured) score += (values[move.captured] || 100) * 1.2;

    // Check bonus
    if (tempGame.inCheck()) score += 50;

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  });

  const currentTurn = game.turn();
  const cpEval = currentTurn === 'w' ? material / 100 : -material / 100;

  return {
    evaluation: Math.round(cpEval * 100),
    bestMoveSan: bestMove.san,
    bestMoveFrom: bestMove.from,
    bestMoveTo: bestMove.to,
    pv: [bestMove.san],
  };
}
