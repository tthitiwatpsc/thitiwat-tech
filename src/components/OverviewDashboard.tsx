import React from 'react';
import { Participant } from '../types';
import { Award, CheckCircle2, ArrowRight, Microscope, ShieldCheck, Sparkles, Lightbulb } from 'lucide-react';
import { Avatar } from './Avatar';

interface OverviewDashboardProps {
  activeParticipant: Participant;
  setActiveTab: (tab: string) => void;
  onOpenSurvey: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  activeParticipant,
  setActiveTab,
  onOpenSurvey,
}) => {
  const missions = [
    {
      id: 'm1',
      title: 'ภารกิจที่ 1: รู้ คิด ปฏิบัติ จากอุปกรณ์รอบตัว',
      desc: 'สำรวจเซนเซอร์ และกลไก AI ในอุปกรณ์แล็ปและสมาร์ทดีไวซ์ใกล้ตัว',
      xp: 150,
      isDone: !!activeParticipant.completedMissions?.m1_device_inspector,
      icon: Microscope,
      color: 'from-blue-600/20 to-cyan-500/10 border-blue-500/30 text-cyan-300',
    },
    {
      id: 'm2',
      title: 'ภารกิจที่ 2: LLM & หลักการ AI Literacy OECD',
      desc: 'ทดสอบการตัดสินใจเชิงจริยธรรม และวิเคราะห์กลไก Token ในโมเดลภาษา',
      xp: 150,
      isDone: !!activeParticipant.completedMissions?.m2_oecd_literacy,
      icon: ShieldCheck,
      color: 'from-purple-600/20 to-indigo-500/10 border-purple-500/30 text-purple-300',
    },
    {
      id: 'm3',
      title: 'ภารกิจที่ 3: Prompt Engineering Sandbox',
      desc: 'สร้างสรรค์ Prompt วิทยาศาสตร์ 5E, PISA และประเมินด้วย Gemini AI',
      xp: 150,
      isDone: !!activeParticipant.completedMissions?.m3_prompt_engineering,
      icon: Sparkles,
      color: 'from-emerald-600/20 to-teal-500/10 border-emerald-500/30 text-emerald-300',
    },
    {
      id: 'm4',
      title: 'ภารกิจที่ 4: ออกแบบนวัตกรรม AI สำหรับชั้นเรียนจริง',
      desc: 'สร้างโปสเตอร์นวัตกรรมการเรียนรู้และร่างแผนการสอนส่งวิทยากร',
      xp: 200,
      isDone: !!activeParticipant.completedMissions?.m4_innovation_design,
      icon: Lightbulb,
      color: 'from-amber-600/20 to-orange-500/10 border-amber-500/30 text-amber-300',
    },
  ];

  const completedCount = Object.values(activeParticipant.completedMissions || {}).filter(Boolean).length;
  const totalMissionsCount = 5; // 4 modules + 1 survey

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Welcome Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex items-center space-x-4">
            <Avatar
              src={activeParticipant.avatar}
              name={activeParticipant.name}
              className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-cyan-400 shadow-xl text-xl"
            />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  สวัสดีครับ, {activeParticipant.name}
                </h2>
                <span className="text-xs text-cyan-300 font-medium">
                  · {activeParticipant.demographics?.schoolName || 'ครูผู้เข้าอบรม'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                ยินดีต้อนรับสู่แพลตฟอร์มพัฒนาศักยภาพการจัดการเรียนรู้วิทยาศาสตร์และเทคโนโลยีในยุค AI
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex-shrink-0">
            <div className="text-center px-2">
              <span className="text-[11px] text-slate-400 font-semibold block">คะแนน XP รวม</span>
              <span className="text-xl font-extrabold text-amber-400 tabular-nums">{activeParticipant.xp}</span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div className="text-center px-2">
              <span className="text-[11px] text-slate-400 font-semibold block">ความคืบหน้า</span>
              <span className="text-xl font-extrabold text-cyan-400 tabular-nums">{completedCount} / {totalMissionsCount}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Progress Tracker Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-lg">
        <div className="flex justify-between items-center text-xs font-bold">
          <span className="text-slate-300">ความคืบหน้าภารกิจการอบรมทั้งหมด</span>
          <span className="text-cyan-400">{Math.round((completedCount / totalMissionsCount) * 100)}%</span>
        </div>
        <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 h-full transition-all duration-500 rounded-full"
            style={{ width: `${(completedCount / totalMissionsCount) * 100}%` }}
          />
        </div>
      </div>

      {/* 4 Mission Cards */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          ภารกิจการอบรม 4 โมดูลหลัก
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {missions.map((m) => {
            const IconComp = m.icon;

            return (
              <div
                key={m.id}
                className={`p-6 rounded-3xl bg-gradient-to-b ${m.color} border space-y-4 shadow-xl flex flex-col justify-between transition-all hover:scale-[1.01]`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
                      <IconComp className="w-5 h-5" />
                    </div>
                    {m.isDone ? (
                      <span className="flex items-center space-x-1 text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>สำเร็จแล้ว</span>
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                        +{m.xp} XP
                      </span>
                    )}
                  </div>

                  <h4 className="font-extrabold text-base text-slate-100">{m.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{m.desc}</p>
                </div>

                <button
                  onClick={() => setActiveTab(m.id)}
                  className="w-full py-2.5 px-4 bg-slate-950/80 hover:bg-slate-900 text-slate-100 font-bold text-xs rounded-xl border border-slate-800 flex items-center justify-center space-x-2 transition-all group"
                >
                  <span>{m.isDone ? 'เข้าสู่เนื้อหา / ทบทวน' : 'ทำภารกิจนี้'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-cyan-400" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leadership Survey Highlight Callout */}
      <div className="p-6 bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/60 border border-amber-500/40 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            แบบวัดภาวะผู้นำทางเทคโนโลยีการศึกษาในยุค AI (16 ข้อ)
          </span>
          <h4 className="font-extrabold text-base text-slate-100">
            แบบประเมินตนเองสำหรับครูวิทยาศาสตร์ระดับการศึกษาขั้นพื้นฐาน
          </h4>
          <p className="text-xs text-slate-300">
            ประเมินสมรรถนะ 4 ด้าน พร้อมรับวิเคราะห์ความเชี่ยวชาญแบบ Radar Chart เรียลไทม์
          </p>
        </div>

        <button
          onClick={onOpenSurvey}
          className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold text-xs rounded-2xl shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 flex-shrink-0 transition-all"
        >
          <Award className="w-4 h-4" />
          <span>{activeParticipant.completedMissions?.survey_completed ? 'ดูผลการประเมินภาวะผู้นำ' : 'ทำแบบวัดภาวะผู้นำ (+100 XP)'}</span>
        </button>
      </div>

    </div>
  );
};
