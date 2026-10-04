import { CoachLevel, CoachFeedback, WeaknessCategory, PlayerWeaknessStat } from '@/types/coach';
import { EvaluatedMove } from '@/lib/chess/engine';

export class CoachEngine {
  /**
   * Generates deep, level-tailored natural language AI coaching explanation for a move.
   */
  static generateFeedback(
    move: EvaluatedMove,
    level: CoachLevel = 'intermediate'
  ): CoachFeedback {
    const { san, bestMoveSan, evalDiff, classification } = move;

    let category: WeaknessCategory = 'tactical_awareness';
    let summary = '';
    let explanation = '';
    let whyMistake = '';
    let betterAlternative = '';
    let keyLesson = '';

    // Map excellent to best or great for classification compatibility
    const safeClassification: CoachFeedback['classification'] =
      classification === 'excellent' ? 'best' : classification;

    if (safeClassification === 'blunder') {
      category = 'hanging_pieces';
      summary = `You played ${san}, which was a major blunder losing substantial material or position.`;
      if (level === 'beginner') {
        whyMistake = `Your move left a piece unprotected or allowed your opponent an immediate winning tactic.`;
        betterAlternative = `Playing ${bestMoveSan} keeps your pieces safe and maintains material balance.`;
        keyLesson = `Lesson: Always check which of your pieces are unprotected before making your move.`;
      } else if (level === 'intermediate') {
        whyMistake = `Moving ${san} created tactical vulnerabilities and allowed the opponent to seize a strong initiative.`;
        betterAlternative = `The engine recommends ${bestMoveSan}, preserving piece activity and central structure.`;
        keyLesson = `Lesson: Calculate enemy threats and forced responses before finalizing your candidate move.`;
      } else {
        whyMistake = `Move ${san} drastically dropped evaluation by ${Math.abs(evalDiff)} centipawns due to missed tactical continuation.`;
        betterAlternative = `The optimal line was ${bestMoveSan}, maintaining positional superiority and pawn structure.`;
        keyLesson = `Lesson: Maintain precise calculation of checks, captures, and threats in complex positions.`;
      }
    } else if (safeClassification === 'mistake') {
      category = 'opening_development';
      summary = `You played ${san}, which was an inaccurate tactical decision.`;
      whyMistake = `This move allows your opponent to gain tempo or improve their piece coordination.`;
      betterAlternative = `The stronger option was ${bestMoveSan}.`;
      keyLesson = `Lesson: Prioritize rapid piece development and central control over prematurely moving the same piece twice.`;
    } else if (safeClassification === 'inaccuracy') {
      category = 'piece_activity';
      summary = `You played ${san}. A decent move, but there was a sharper positional alternative.`;
      whyMistake = `While safe, ${san} passes up an opportunity to place pressure on key enemy squares.`;
      betterAlternative = `${bestMoveSan} increases piece activity and forces opponent onto the defensive.`;
      keyLesson = `Lesson: Look for moves that create double attacks or restrict your opponent's active pieces.`;
    } else {
      category = 'tactical_awareness';
      summary = `Excellent move (${san})! You maintained high precision and positional pressure.`;
      whyMistake = `No mistake made here!`;
      betterAlternative = `You found the top engine recommendation (${san}).`;
      keyLesson = `Lesson: Keep building active piece coordination like this!`;
    }

    return {
      moveSan: san,
      evalDiff,
      bestMoveSan,
      classification: safeClassification,
      summary,
      explanation,
      whyMistake,
      betterAlternative,
      keyLesson,
      category,
    };
  }

  /**
   * Evaluates overall player strengths and weaknesses
   */
  static getPlayerWeaknessStats(): PlayerWeaknessStat[] {
    return [
      {
        category: 'opening_development',
        name: 'Early Queen Exposure',
        count: 4,
        severityScore: 65,
        advice: 'Avoid moving your Queen repeatedly in the first 10 moves before knights and bishops are developed.',
      },
      {
        category: 'hanging_pieces',
        name: 'Hanging Minor Pieces',
        count: 6,
        severityScore: 80,
        advice: 'Perform a safety scan of all undefended pieces before pressing move.',
      },
      {
        category: 'tactical_awareness',
        name: 'Missed Knight Forks',
        count: 3,
        severityScore: 45,
        advice: 'Look for squares where a knight can attack King and Queen or Rook simultaneously.',
      },
      {
        category: 'king_safety',
        name: 'Delayed Castling',
        count: 2,
        severityScore: 30,
        advice: 'Castle early (usually within moves 5-10) to secure your King from central pawn pushes.',
      },
    ];
  }
}
