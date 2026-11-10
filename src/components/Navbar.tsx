import React from 'react';
import { UserRole, Participant } from '../types';
import { Sparkles, Trophy, UserCheck, ShieldAlert, Award } from 'lucide-react';
import { Avatar } from './Avatar';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeParticipant: Participant;
  onOpenParticipantModal: () => void;
  onOpenLeaderboard: () => void;
  onOpenSurvey: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  activeParticipant,
  onOpenParticipantModal,
  onOpenLeaderboard,
  onOpenSurvey,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          
          {/* Brand Logo & Title */}
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className="flex items-center space-x-2.5 text-left shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-xl"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="whitespace-nowrap">
              <span className="font-bold text-base sm:text-lg bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-200 bg-clip-text text-transparent block leading-tight">
                SciTech AI Academy
              </span>
              <span className="text-[11px] text-slate-400 hidden xl:block leading-tight">
                พัฒนาศักยภาพครูวิทยาศาสตร์และเทคโนโลยี
              </span>
            </div>
          </button>

          {/* Navigation Tabs (Participant View) */}
          {currentRole === 'participant' && (
            <nav className="hidden lg:flex items-center space-x-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 shrink-0">
              {[
                { id: 'overview', label: 'ภาพรวม' },
                { id: 'm1', label: '1. รู้ คิด ปฏิบัติ' },
                { id: 'm2', label: '2. OECD Literacy' },
                { id: 'm3', label: '3. Prompt Lab' },
                { id: 'm4', label: '4. นวัตกรรม AI' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          )}

          {/* User Controls & Role Switcher */}
          <div className="flex items-center space-x-2 shrink-0">
            
            {/* Survey Button */}
            <button
              onClick={onOpenSurvey}
              className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                activeParticipant.completedMissions?.survey_completed
                  ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20'
                  : 'bg-amber-500/15 text-amber-300 border border-amber-500/40 hover:bg-amber-500/25'
              }`}
              title="ทำแบบวัดภาวะผู้นำทางเทคโนโลยีการศึกษาในยุค AI"
            >
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="hidden xl:inline">แบบวัดภาวะผู้นำ</span>
            </button>

            {/* Leaderboard Button */}
            <button
              onClick={onOpenLeaderboard}
              className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors whitespace-nowrap shrink-0"
            >
              <Trophy className="w-4 h-4 text-yellow-400 shrink-0" />
              <span className="hidden xl:inline">กระดานผู้นำ</span>
              <span className="text-yellow-300 font-bold tabular-nums">
                {activeParticipant.xp} XP
              </span>
            </button>

            {/* Active User Avatar & Switcher */}
            {currentRole === 'participant' && (
              <button
                onClick={onOpenParticipantModal}
                className="flex items-center space-x-2 pl-1.5 pr-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-full border border-slate-700 text-left transition-colors shrink-0"
                title="สลับผู้เข้าอบรม"
              >
                <Avatar
                  src={activeParticipant.avatar}
                  name={activeParticipant.name}
                  className="w-7 h-7 border border-cyan-400/70"
                />
                <span className="hidden sm:inline text-xs font-medium text-slate-200 truncate max-w-[90px]">
                  {activeParticipant.name.split(' ')[0]}
                </span>
                <UserCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>
            )}

            {/* Role Switcher Toggle */}
            <div className="flex items-center bg-slate-950 p-0.5 rounded-xl border border-slate-800 shrink-0">
              <button
                onClick={() => onRoleChange('participant')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  currentRole === 'participant'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ผู้เข้าอบรม
              </button>
              <button
                onClick={() => onRoleChange('admin')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center space-x-1 transition-colors whitespace-nowrap shrink-0 ${
                  currentRole === 'admin'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldAlert className="w-3 h-3 shrink-0" />
                <span>Admin</span>
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Subnav */}
        {currentRole === 'participant' && (
          <div className="lg:hidden flex items-center space-x-1.5 py-2 overflow-x-auto border-t border-slate-800 text-xs no-scrollbar">
            {[
              { id: 'overview', label: 'ภาพรวมภารกิจ' },
              { id: 'm1', label: '1. รู้ คิด ปฏิบัติ' },
              { id: 'm2', label: '2. OECD LLM' },
              { id: 'm3', label: '3. Prompt Lab' },
              { id: 'm4', label: '4. นวัตกรรม AI' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-800/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

      </div>
    </header>
  );
};
