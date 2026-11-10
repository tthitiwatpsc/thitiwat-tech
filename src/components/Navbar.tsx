import React from 'react';
import { UserRole, Participant } from '../types';
import { Sparkles, Trophy, UserCheck, ShieldAlert, BookOpen, Layers, Award, RefreshCw } from 'lucide-react';

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
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/20">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-200 bg-clip-text text-transparent">
                  SciTech AI Academy
                </span>
                <span className="bg-cyan-500/10 text-cyan-400 text-xs px-2 py-0.5 rounded-full border border-cyan-500/20 font-medium hidden sm:inline-block">
                  มัธยมศึกษา
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden md:block">
                ระบบพัฒนาศักยภาพครูวิทยาศาสตร์และเทคโนโลยีในยุค AI
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Participant View) */}
          {currentRole === 'participant' && (
            <nav className="hidden lg:flex items-center space-x-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'overview'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                ภาพรวมภารกิจ
              </button>
              <button
                onClick={() => setActiveTab('m1')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'm1'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                1. รู้ คิด ปฏิบัติ
              </button>
              <button
                onClick={() => setActiveTab('m2')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'm2'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                2. LLM & OECD Literacy
              </button>
              <button
                onClick={() => setActiveTab('m3')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'm3'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                3. Prompt Engineering
              </button>
              <button
                onClick={() => setActiveTab('m4')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'm4'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                4. ออกแบบนวัตกรรม AI
              </button>
            </nav>
          )}

          {/* User Controls & Role Switcher */}
          <div className="flex items-center space-x-3">
            
            {/* Survey Button */}
            <button
              onClick={onOpenSurvey}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeParticipant.completedMissions?.survey_completed
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 animate-pulse'
              }`}
              title="ทำแบบวัดภาวะผู้นำทางเทคโนโลยีการศึกษาในยุค AI"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">แบบวัดภาวะผู้นำ AI</span>
              {activeParticipant.completedMissions?.survey_completed && (
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              )}
            </button>

            {/* Leaderboard Button */}
            <button
              onClick={onOpenLeaderboard}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="hidden sm:inline">กระดานผู้นำ</span>
              <span className="bg-yellow-500/20 text-yellow-300 text-[10px] px-1.5 py-0.5 rounded font-bold">
                {activeParticipant.xp} XP
              </span>
            </button>

            {/* Active User Avatar & Switcher */}
            {currentRole === 'participant' && (
              <button
                onClick={onOpenParticipantModal}
                className="flex items-center space-x-2 pl-2 pr-3 py-1 bg-slate-800 hover:bg-slate-700 rounded-full border border-slate-700 text-left transition-all"
              >
                <img
                  src={activeParticipant.avatar}
                  alt={activeParticipant.name}
                  className="w-7 h-7 rounded-full object-cover border border-cyan-400"
                />
                <div className="hidden sm:block text-xs">
                  <div className="font-medium text-slate-200 line-clamp-1 max-w-[100px]">
                    {activeParticipant.name.split(' ')[0]}
                  </div>
                </div>
                <UserCheck className="w-3.5 h-3.5 text-slate-400" />
              </button>
            )}

            {/* Role Switcher Toggle */}
            <div className="flex items-center bg-slate-950 p-0.5 rounded-xl border border-slate-800">
              <button
                onClick={() => onRoleChange('participant')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  currentRole === 'participant'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ผู้เข้าอบรม
              </button>
              <button
                onClick={() => onRoleChange('admin')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center space-x-1 transition-all ${
                  currentRole === 'admin'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldAlert className="w-3 h-3" />
                <span>วิทยากร/Admin</span>
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Subnav */}
        {currentRole === 'participant' && (
          <div className="lg:hidden flex items-center justify-between space-x-1 py-2 overflow-x-auto border-t border-slate-800 text-xs no-scrollbar">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-2.5 py-1 rounded-lg whitespace-nowrap ${
                activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-slate-400'
              }`}
            >
              ภารกิจ
            </button>
            <button
              onClick={() => setActiveTab('m1')}
              className={`px-2.5 py-1 rounded-lg whitespace-nowrap ${
                activeTab === 'm1' ? 'bg-blue-600 text-white' : 'text-slate-400'
              }`}
            >
              1.รู้คิดปฏิบัติ
            </button>
            <button
              onClick={() => setActiveTab('m2')}
              className={`px-2.5 py-1 rounded-lg whitespace-nowrap ${
                activeTab === 'm2' ? 'bg-blue-600 text-white' : 'text-slate-400'
              }`}
            >
              2.OECD LLM
            </button>
            <button
              onClick={() => setActiveTab('m3')}
              className={`px-2.5 py-1 rounded-lg whitespace-nowrap ${
                activeTab === 'm3' ? 'bg-blue-600 text-white' : 'text-slate-400'
              }`}
            >
              3.Prompt Lab
            </button>
            <button
              onClick={() => setActiveTab('m4')}
              className={`px-2.5 py-1 rounded-lg whitespace-nowrap ${
                activeTab === 'm4' ? 'bg-blue-600 text-white' : 'text-slate-400'
              }`}
            >
              4.นวัตกรรม
            </button>
          </div>
        )}

      </div>
    </header>
  );
};
