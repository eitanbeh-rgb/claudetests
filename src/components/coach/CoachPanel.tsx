'use client';

import React from 'react';
import {
  Bot,
  Brain,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Lightbulb,
} from 'lucide-react';
import { CoachFeedback, CoachLevel } from '@/types/coach';

interface CoachPanelProps {
  feedbackList: CoachFeedback[];
  coachLevel: CoachLevel;
  onSelectLevel: (level: CoachLevel) => void;
  selectedFeedbackIndex?: number;
  onSelectFeedback?: (index: number) => void;
}

export function CoachPanel({
  feedbackList,
  coachLevel,
  onSelectLevel,
  selectedFeedbackIndex = 0,
  onSelectFeedback,
}: CoachPanelProps) {
  const currentFeedback = feedbackList[selectedFeedbackIndex] || feedbackList[0];

  return (
    <div className="bg-[var(--bg-card)] rounded-3xl p-6 border border-[var(--border-color)] space-y-6 shadow-xl">
      {/* Header & Coach Persona Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-lg font-black text-[var(--text-primary)]">
              AI Chess Coach Diagnostics
            </h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Realtime Stockfish evaluation & natural language explanations
            </p>
          </div>
        </div>

        {/* Coach Skill Level Switcher */}
        <div className="flex items-center bg-[var(--bg-main)] p-1 rounded-2xl border border-[var(--border-color)] text-xs font-bold">
          {(['beginner', 'intermediate', 'advanced'] as CoachLevel[]).map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => onSelectLevel(lvl)}
              className={`px-3 py-1.5 rounded-xl capitalize transition-all ${
                coachLevel === lvl
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Move Feedback List Tabs */}
      {feedbackList.length > 0 && (
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-[var(--text-secondary)]">
            Analyzed Key Moves ({feedbackList.length})
          </label>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {feedbackList.map((item, idx) => {
              const isSelected = selectedFeedbackIndex === idx;
              const isBlunder = item.classification === 'blunder';
              const isMistake = item.classification === 'mistake';

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectFeedback?.(idx)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold shrink-0 flex items-center gap-2 border transition-all ${
                    isSelected
                      ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-md'
                      : 'bg-[var(--bg-main)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {isBlunder ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  ) : isMistake ? (
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                  <span>
                    Move {idx + 1}: {item.moveSan}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Detailed Selected Feedback Detail Card */}
      {currentFeedback ? (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-5 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] space-y-4">
            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-extrabold uppercase px-3 py-1 rounded-full ${
                  currentFeedback.classification === 'blunder'
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                    : currentFeedback.classification === 'mistake'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}
              >
                {currentFeedback.classification}
              </span>
              <span className="text-xs font-mono font-bold text-[var(--text-secondary)]">
                Engine Diff: {currentFeedback.evalDiff} CP
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                {currentFeedback.summary}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {currentFeedback.whyMistake}
              </p>
            </div>

            {/* Recommendation Box */}
            <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs space-y-1.5">
              <div className="font-extrabold text-indigo-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-400" /> Best Engine Recommendation
              </div>
              <div className="text-slate-200">
                You played <strong className="text-amber-400">{currentFeedback.moveSan}</strong>. Stronger alternative:{' '}
                <strong className="text-emerald-400">{currentFeedback.bestMoveSan}</strong>.
              </div>
            </div>

            {/* Key Lesson Box */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1 text-amber-300 font-semibold">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase text-[10px]">
                <Lightbulb className="w-3.5 h-3.5" /> Core Takeaway
              </div>
              <div>{currentFeedback.keyLesson}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-xs text-[var(--text-secondary)] italic bg-[var(--bg-main)] rounded-2xl border border-[var(--border-color)]">
          No key move mistakes detected in this session yet. Play a game or analyze a match!
        </div>
      )}
    </div>
  );
}
