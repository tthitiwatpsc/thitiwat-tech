import React from 'react';
import { Participant } from '../types';
import { X, Trophy, Medal, Award } from 'lucide-react';
import { INITIAL_BADGES } from '../data/mockData';
import { Avatar } from './Avatar';

interface LeaderboardDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  participants: Participant[];
  activeParticipantId: string;
}

export const LeaderboardDrawer: React.FC<LeaderboardDrawerProps> = ({
  isOpen,
  onClose,
  participants,
  activeParticipantId,
}) => {
  if (!isOpen) return null;

  // Sort participants by XP descending
  const sorted = [...participants].sort((a, b) => b.xp - a.xp);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full flex flex-col text-slate-100 shadow-2xl animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <h3 className="font-bold text-base text-slate-100">
              กระดานผู้นำเรียลไทม์ (Live Leaderboard)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-xl hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Top 3 Podium */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              อันดับผู้เข้าอบรมสูงสุด
            </h4>

            <div className="space-y-2">
              {sorted.map((p, idx) => {
                const isActive = p.id === activeParticipantId;
                const isTop1 = idx === 0;
                const isTop2 = idx === 1;
                const isTop3 = idx === 2;

                return (
                  <div
                    key={p.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center space-x-3 ${
                      isActive
                        ? 'bg-cyan-950/50 border-cyan-500/80 ring-2 ring-cyan-500/20 shadow-lg'
                        : 'bg-slate-800/50 border-slate-700/60'
                    }`}
                  >
                    {/* Rank Number / Badge */}
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs flex-shrink-0">
                      {isTop1 ? (
                        <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-400/30">
                          <Medal className="w-5 h-5" />
                        </div>
                      ) : isTop2 ? (
                        <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-950 flex items-center justify-center">
                          2
                        </div>
                      ) : isTop3 ? (
                        <div className="w-8 h-8 rounded-full bg-amber-700 text-amber-100 flex items-center justify-center">
                          3
                        </div>
                      ) : (
                        <span className="text-slate-400">{idx + 1}</span>
                      )}
                    </div>

                    <Avatar
                      src={p.avatar}
                      name={p.name}
                      className="w-10 h-10 border border-slate-600"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h5 className="font-semibold text-xs text-slate-100 truncate">
                          {p.name}
                        </h5>
                        <span className="text-xs font-extrabold text-amber-400 tabular-nums">
                          {p.xp} XP
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">
                        {p.demographics?.schoolName || 'โรงเรียนมัธยม'}
                      </p>

                      {/* Missions Completed Indicator */}
                      <div className="flex items-center space-x-1.5 mt-1.5">
                        <span className="text-[10px] text-slate-500">ภารกิจ:</span>
                        {Object.entries(p.completedMissions || {}).map(([mKey, isDone]) => (
                          <span
                            key={mKey}
                            className={`w-2 h-2 rounded-full ${
                              isDone ? 'bg-emerald-400' : 'bg-slate-700'
                            }`}
                            title={mKey}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Badges Directory */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1">
              <Award className="w-4 h-4 text-cyan-400" />
              <span>เหรียญเกียรติยศในการอบรม (Workshop Badges)</span>
            </h4>

            <div className="grid grid-cols-1 gap-2">
              {INITIAL_BADGES.map((badge) => (
                <div
                  key={badge.id}
                  className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/50 flex items-center space-x-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-200">{badge.name}</h5>
                    <p className="text-[11px] text-slate-400 leading-tight">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
