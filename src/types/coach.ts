export type CoachLevel = 'beginner' | 'intermediate' | 'advanced';

export type WeaknessCategory =
  | 'opening_development'
  | 'king_safety'
  | 'tactical_awareness'
  | 'piece_activity'
  | 'pawn_structure'
  | 'endgames'
  | 'calculation'
  | 'blunders'
  | 'hanging_pieces';

export interface CoachFeedback {
  moveSan: string;
  evalDiff: number;
  bestMoveSan: string;
  classification: 'brilliant' | 'great' | 'best' | 'excellent' | 'good' | 'inaccuracy' | 'mistake' | 'blunder';
  summary: string;
  explanation: string;
  whyMistake: string;
  betterAlternative: string;
  keyLesson: string;
  category: WeaknessCategory;
}

export interface PlayerWeaknessStat {
  category: WeaknessCategory;
  name: string;
  count: number;
  severityScore: number; // 0-100 score of how problematic it is
  advice: string;
}

export interface CoachSession {
  id: string;
  gameId?: string;
  date: string;
  coachLevel: CoachLevel;
  feedbackList: CoachFeedback[];
  primaryLesson: string;
}
