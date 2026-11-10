import React, { useState } from 'react';
import { Participant, InnovationProject } from '../types';
import { Users, Award, ShieldAlert, Trash2, Edit, Search, Download, Sparkles } from 'lucide-react';
import { saveParticipants } from '../services/storageService';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Avatar } from './Avatar';

interface AdminDashboardProps {
  participants: Participant[];
  onRefreshData: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  participants,
  onRefreshData,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<{ participantId: string; project: InnovationProject } | null>(null);
  const [gradeScore, setGradeScore] = useState<number>(85);
  const [feedbackText, setFeedbackText] = useState<string>('');

  // XP Edit Modal & Delete Confirm
  const [editingXpUser, setEditingXpUser] = useState<Participant | null>(null);
  const [newXpValue, setNewXpValue] = useState<number>(0);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Filter participants
  const filteredParticipants = participants.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.demographics?.schoolName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Analytics stats
  const totalXP = participants.reduce((acc, p) => acc + p.xp, 0);
  const totalSubmissions = participants.filter(p => p.innovationProject).length;
  const totalSurveys = participants.filter(p => p.completedMissions?.survey_completed).length;

  // Aggregate Leadership Radar Data
  const calculateAggregateLeadership = () => {
    let c1 = 0, c2 = 0, c3 = 0, c4 = 0, count = 0;

    participants.forEach(p => {
      if (p.surveyResponses) {
        const sr = p.surveyResponses;
        c1 += (sr.q1 + sr.q2 + sr.q3 + sr.q4) / 4;
        c2 += (sr.q5 + sr.q6 + sr.q7 + sr.q8) / 4;
        c3 += (sr.q9 + sr.q10 + sr.q11 + sr.q12) / 4;
        c4 += (sr.q13 + sr.q14 + sr.q15 + sr.q16) / 4;
        count++;
      }
    });

    if (count === 0) return [
      { subject: 'ความรู้พื้นฐาน AI', score: 4.2 },
      { subject: 'วางแผนและประเมิน', score: 4.0 },
      { subject: 'การประยุกต์การสอน', score: 4.4 },
      { subject: 'จริยธรรม & ความรับผิดชอบ', score: 4.6 },
    ];

    return [
      { subject: 'ความรู้พื้นฐาน AI', score: Number((c1 / count).toFixed(2)) },
      { subject: 'วางแผนและประเมิน', score: Number((c2 / count).toFixed(2)) },
      { subject: 'การประยุกต์การสอน', score: Number((c3 / count).toFixed(2)) },
      { subject: 'จริยธรรม & ความรับผิดชอบ', score: Number((c4 / count).toFixed(2)) },
    ];
  };

  const aggregateRadarData = calculateAggregateLeadership();

  // Handlers
  const handleDeleteParticipant = (id: string) => {
    const updated = participants.filter(p => p.id !== id);
    saveParticipants(updated);
    setConfirmDeleteId(null);
    onRefreshData();
  };

  const handleUpdateXp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingXpUser) return;

    const updated = participants.map(p => {
      if (p.id === editingXpUser.id) {
        return { ...p, xp: newXpValue };
      }
      return p;
    });

    saveParticipants(updated);
    setEditingXpUser(null);
    onRefreshData();
  };

  const handleGradeProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    const updated = participants.map(p => {
      if (p.id === selectedProject.participantId && p.innovationProject) {
        return {
          ...p,
          innovationProject: {
            ...p.innovationProject,
            score: gradeScore,
            feedback: feedbackText,
            status: 'graded' as const,
          }
        };
      }
      return p;
    });

    saveParticipants(updated);
    setSelectedProject(null);
    onRefreshData();
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'School', 'XP', 'M1_Score', 'M2_Score', 'M3_Prompts', 'Innovation_Title', 'Innovation_Score', 'Survey_Avg'];
    const rows = participants.map(p => {
      const surveyAvg = p.surveyResponses
        ? ((Object.values(p.surveyResponses) as number[]).reduce((a: number, b: number) => a + b, 0) / 16).toFixed(2)
        : 'N/A';

      return [
        p.id,
        `"${p.name}"`,
        `"${p.demographics?.schoolName || ''}"`,
        p.xp,
        p.m1_quiz_score || 0,
        p.m2_oecd_score || 0,
        p.m3_tested_prompts_count || 0,
        `"${p.innovationProject?.title || 'ยังไม่ส่ง'}"`,
        p.innovationProject?.score || 0,
        surveyAvg,
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `scitech_ai_workshop_results_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-800/50 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
              <ShieldAlert className="w-4 h-4" />
              <span>แดชบอร์ดบริหารจัดการสำหรับวิทยากรและผู้ดูแลระบบ (Admin Console)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              ศูนย์ควบคุมและประเมินผลการอบรมเรียลไทม์
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 flex items-center space-x-2 transition-all shadow-md"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>ส่งออกไฟล์รายงาน (CSV)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-lg space-y-1">
          <span className="text-xs text-slate-400 font-medium">ผู้เข้าอบรมทั้งหมด</span>
          <div className="text-2xl font-extrabold text-slate-100">{participants.length} ท่าน</div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-lg space-y-1">
          <span className="text-xs text-slate-400 font-medium">คะแนน XP สะสมรวม</span>
          <div className="text-2xl font-extrabold text-amber-400">{totalXP} XP</div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-lg space-y-1">
          <span className="text-xs text-slate-400 font-medium">นวัตกรรมที่เสนอส่ง</span>
          <div className="text-2xl font-extrabold text-cyan-400">{totalSubmissions} ผลงาน</div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-lg space-y-1">
          <span className="text-xs text-slate-400 font-medium">ผู้ทำแบบวัดภาวะผู้นำ AI</span>
          <div className="text-2xl font-extrabold text-emerald-400">{totalSurveys} ท่าน</div>
        </div>
      </div>

      {/* Aggregate Leadership Radar Chart Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <h3 className="font-bold text-base text-slate-100 flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>ผลประเมินภาวะผู้นำ AI รวมผู้เข้าอบรม (4 มิติ)</span>
          </h3>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={aggregateRadarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 5]} stroke="#475569" />
                <Radar name="คะแนนเฉลี่ยรวม" dataKey="score" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.4} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Innovation Showcase List */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="font-bold text-base text-slate-100 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>รายการเสนอผลงานนวัตกรรม (ตรวจและให้คะแนน)</span>
            </h3>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {participants.filter(p => p.innovationProject).map((p) => {
                const proj = p.innovationProject!;
                return (
                  <div
                    key={p.id}
                    className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between hover:border-slate-700 transition-all"
                  >
                    <div>
                      <h5 className="font-bold text-xs text-slate-200">{proj.title}</h5>
                      <p className="text-[11px] text-slate-400">
                        ผู้เสนอ: {p.name} ({proj.subject} {proj.targetGrade})
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedProject({ participantId: p.id, project: proj });
                        setGradeScore(proj.score || 85);
                        setFeedbackText(proj.feedback || '');
                      }}
                      className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl shadow"
                    >
                      {proj.score ? `ตรวจแล้ว (${proj.score})` : 'ตรวจผลงาน'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Participant Management Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="font-bold text-base text-slate-100 flex items-center space-x-2">
            <Users className="w-5 h-5 text-indigo-400" />
            <span>รายชื่อผู้เข้าอบรมและการจัดระดับคะแนน</span>
          </h3>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="ค้นหาชื่อ หรือโรงเรียน..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 w-full sm:w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3">ผู้เข้าอบรม</th>
                <th className="p-3">สังกัดโรงเรียน</th>
                <th className="p-3">คะแนน XP</th>
                <th className="p-3">สถานะภารกิจ</th>
                <th className="p-3 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredParticipants.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-all">
                  <td className="p-3 flex items-center space-x-3">
                    <Avatar src={p.avatar} name={p.name} className="w-8 h-8" />
                    <div>
                      <div className="font-bold text-slate-100">{p.name}</div>
                      <div className="text-[10px] text-slate-400">{p.email}</div>
                    </div>
                  </td>
                  <td className="p-3">{p.demographics?.schoolName || '-'}</td>
                  <td className="p-3 font-extrabold text-amber-400 tabular-nums">{p.xp} XP</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-1">
                      {Object.entries(p.completedMissions || {}).map(([mKey, isDone]) => (
                        <span
                          key={mKey}
                          className={`w-2.5 h-2.5 rounded-full ${
                            isDone ? 'bg-emerald-400' : 'bg-slate-700'
                          }`}
                          title={mKey}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <div className="inline-flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setEditingXpUser(p);
                          setNewXpValue(p.xp);
                        }}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg"
                        title="ปรับคะแนน XP"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      {confirmDeleteId === p.id ? (
                        <div className="inline-flex items-center space-x-1">
                          <button
                            onClick={() => handleDeleteParticipant(p.id)}
                            className="px-2 py-1 bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold rounded-lg"
                          >
                            ยืนยัน
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 text-[11px] rounded-lg"
                          >
                            ยกเลิก
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteId(p.id)}
                          className="p-1.5 bg-slate-800 hover:bg-rose-900/60 text-rose-400 rounded-lg"
                          title="ลบผู้เรียน"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grade Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 text-slate-100 space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-slate-100">
              ให้คะแนนและข้อเสนอแนะนวัตกรรม: {selectedProject.project.title}
            </h3>

            <form onSubmit={handleGradeProject} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  คะแนนผลงาน (0-100 คะแนน)
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={gradeScore}
                  onChange={(e) => setGradeScore(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  ข้อเสนอแนะวิทยากรเพื่อการปรับปรุง
                </label>
                <textarea
                  rows={3}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="เขียนข้อเสนอแนะสั้นๆ..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg"
                >
                  บันทึกผลการประเมิน
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit XP Modal */}
      {editingXpUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-6 text-slate-100 space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-slate-100">
              ปรับคะแนน XP สำหรับ {editingXpUser.name}
            </h3>

            <form onSubmit={handleUpdateXp} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  คะแนน XP ใหม่
                </label>
                <input
                  type="number"
                  value={newXpValue}
                  onChange={(e) => setNewXpValue(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingXpUser(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg"
                >
                  บันทึก XP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
