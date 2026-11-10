import React, { useState } from 'react';
import { Participant, InnovationProject } from '../types';
import { Lightbulb, Send, Sparkles, CheckCircle2, RefreshCw, AlertCircle } from 'lucide-react';
import { updateParticipantProgress } from '../services/storageService';
import confetti from 'canvas-confetti';

interface Module4Props {
  activeParticipant: Participant;
  onMissionCompleted: () => void;
}

export const Module4InnovationStudio: React.FC<Module4Props> = ({
  activeParticipant,
  onMissionCompleted,
}) => {
  const existingProject = activeParticipant.innovationProject;

  const [title, setTitle] = useState(existingProject?.title || '');
  const [subject, setSubject] = useState(existingProject?.subject || 'เคมี');
  const [targetGrade, setTargetGrade] = useState(existingProject?.targetGrade || 'ม.4');
  const [problemStatement, setProblemStatement] = useState(existingProject?.problemStatement || '');
  const [selectedTools, setSelectedTools] = useState<string[]>(existingProject?.aiToolsUsed || ['Gemini AI Chatbot']);
  const [description, setDescription] = useState(existingProject?.description || '');
  const [expectedOutcome, setExpectedOutcome] = useState(existingProject?.expectedOutcome || '');

  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [generatedPlanText, setGeneratedPlanText] = useState(existingProject?.description || '');
  const [formError, setFormError] = useState('');

  const AI_TOOL_OPTIONS = [
    'Gemini Visual Prompting',
    'Gemini AI Chatbot (Socratic Tutor)',
    'AI Image Generation (Molecular/Physics models)',
    'AI Voice Assistant',
    'IoT & AI Smart Sensors',
    'AI Data Analysis & Graph Plotter',
  ];

  const handleToolToggle = (tool: string) => {
    if (selectedTools.includes(tool)) {
      setSelectedTools(selectedTools.filter(t => t !== tool));
    } else {
      setSelectedTools([...selectedTools, tool]);
    }
  };

  // Auto Generate Plan using Gemini AI
  const handleAutoGeneratePlan = async () => {
    if (!title.trim() || !problemStatement.trim()) {
      setFormError('กรุณากรอกชื่อนวัตกรรมและปัญหาสภาพจริงก่อนกดสร้างแผนด้วย AI นะครับ');
      return;
    }
    setFormError('');

    setIsGeneratingPlan(true);
    try {
      const res = await fetch('/api/gemini/innovation-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          subject,
          targetGrade,
          problemStatement,
          aiToolsUsed: selectedTools,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setGeneratedPlanText(data.planText);
        setDescription(data.planText.slice(0, 300) + '...');
        setExpectedOutcome('นักเรียนมีเจตคติต่อวิทยาศาสตร์และผลสัมฤทธิ์ทางการเรียนเพิ่มขึ้นอย่างมีนัยสำคัญ');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const handleSubmitInnovation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !problemStatement.trim()) return;

    const project: InnovationProject = {
      id: existingProject?.id || 'inv_' + Date.now(),
      title,
      subject,
      targetGrade,
      problemStatement,
      aiToolsUsed: selectedTools,
      description: description || generatedPlanText,
      expectedOutcome,
      submittedAt: new Date().toISOString(),
      score: existingProject?.score,
      feedback: existingProject?.feedback,
      status: existingProject?.score ? 'graded' : 'submitted',
    };

    updateParticipantProgress(activeParticipant.id, {
      xpGain: 200,
      badgeId: 'b_m4',
      completedMission: 'm4_innovation_design',
      innovationProject: project,
    });

    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    onMissionCompleted();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950 via-orange-900 to-slate-900 border border-amber-800/50 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Lightbulb className="w-4 h-4" />
            <span>โมดูลที่ 4 (ช่วงบ่าย): ออกแบบนวัตกรรม AI สำหรับประยุกต์ใช้ในห้องเรียนจริง</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            การออกแบบและเสนอโปสเตอร์นวัตกรรมการจัดการเรียนรู้วิทยาศาสตร์
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            ประยุกต์ใช้ความรู้จากโมดูล 1-3 เพื่อสร้างแผนนวัตกรรมการเรียนรู้ AI แก้ปัญหาการเรียนจริงของนักเรียน พร้อมส่งผลงานเข้าสู่ระบบประเมินของวิทยากร
          </p>
        </div>
      </div>

      {/* Main Design Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Form Column (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <h3 className="font-bold text-base text-slate-100 flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <span>ฟอร์มออกแบบโปสเตอร์นวัตกรรม AI</span>
          </h3>

          <form onSubmit={handleSubmitInnovation} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                ชื่อโครงงานนวัตกรรม AI สำหรับห้องเรียนวิทยาศาสตร์ *
              </label>
              <input
                type="text"
                required
                placeholder="เช่น ผู้ช่วย AI จำลองแล็ปเคมีเสมือนจริงและการวิเคราะห์ปฏิกิริยา"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">วิชาที่ประยุกต์ใช้</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="ฟิสิกส์">ฟิสิกส์</option>
                  <option value="เคมี">เคมี</option>
                  <option value="ชีววิทยา">ชีววิทยา</option>
                  <option value="วิทยาศาสตร์กายภาพ">วิทยาศาสตร์กายภาพ</option>
                  <option value="วิทยาการคำนวณ/เทคโนโลยี">วิทยาการคำนวณ/เทคโนโลยี</option>
                  <option value="วิทยาศาสตร์สิ่งแวดล้อม">วิทยาศาสตร์สิ่งแวดล้อม</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">ระดับชั้นมัธยมศึกษา</label>
                <select
                  value={targetGrade}
                  onChange={(e) => setTargetGrade(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="ม.1">มัธยมศึกษาปีที่ 1</option>
                  <option value="ม.2">มัธยมศึกษาปีที่ 2</option>
                  <option value="ม.3">มัธยมศึกษาปีที่ 3</option>
                  <option value="ม.4">มัธยมศึกษาปีที่ 4</option>
                  <option value="ม.5">มัธยมศึกษาปีที่ 5</option>
                  <option value="ม.6">มัธยมศึกษาปีที่ 6</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                ปัญหาสภาพจริงของนักเรียนที่ต้องการแก้ไข (Problem Statement) *
              </label>
              <textarea
                rows={3}
                required
                placeholder="เช่น นักเรียนสับสนมโนทัศน์เรื่องการเคลื่อนที่แบบโพรเจกไทล์ และมองไม่เห็นภาพเวกเตอร์ความเร็วตามแกน X และ Y"
                value={problemStatement}
                onChange={(e) => setProblemStatement(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                เครื่องมือและเทคนิค AI ที่เลือกใช้
              </label>
              <div className="flex flex-wrap gap-2">
                {AI_TOOL_OPTIONS.map((tool) => {
                  const isChecked = selectedTools.includes(tool);
                  return (
                    <button
                      key={tool}
                      type="button"
                      onClick={() => handleToolToggle(tool)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        isChecked
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {tool}
                    </button>
                  );
                })}
              </div>
            </div>

            {formError && (
              <div className="p-3 bg-amber-950/50 border border-amber-500/40 rounded-xl text-amber-300 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleAutoGeneratePlan}
                disabled={isGeneratingPlan}
                className="py-3 px-4 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-amber-300 font-bold text-xs rounded-xl border border-amber-500/30 flex items-center justify-center space-x-2 transition-all"
              >
                {isGeneratingPlan ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                <span>ร่างแผนนวัตกรรมด้วย Gemini AI</span>
              </button>

              <button
                type="submit"
                className="flex-1 py-3 px-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>เสนอนวัตกรรมเข้าสู่ระบบติดตามผล (+200 XP)</span>
              </button>
            </div>

          </form>
        </div>

        {/* Showcase Poster Preview Column (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                ตัวอย่างโปสเตอร์นวัตกรรม
              </span>
              {existingProject?.score && (
                <span className="text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-md">
                  คะแนนประเมิน: {existingProject.score} / 100
                </span>
              )}
            </div>

            {title ? (
              <div className="p-5 bg-slate-950 border border-amber-500/30 rounded-2xl space-y-3 shadow-inner">
                <div className="flex items-center space-x-2">
                  <span className="bg-amber-500/10 text-amber-300 text-[10px] px-2 py-0.5 rounded font-bold border border-amber-500/20">
                    {subject} ({targetGrade})
                  </span>
                </div>

                <h4 className="font-extrabold text-sm text-slate-100 leading-snug">
                  {title}
                </h4>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium">ปัญหาการเรียนรู้:</span>
                    <p className="text-slate-300 mt-0.5">{problemStatement}</p>
                  </div>

                  <div>
                    <span className="text-slate-400 font-medium">เครื่องมือ AI ที่ใช้:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedTools.map((t) => (
                        <span key={t} className="text-[10px] bg-slate-800 text-cyan-300 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {generatedPlanText && (
                    <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 whitespace-pre-wrap max-h-48 overflow-y-auto">
                      <strong className="text-amber-400">โครงร่างแผนนวัตกรรม:</strong>
                      <p className="mt-1">{generatedPlanText}</p>
                    </div>
                  )}
                </div>

                {existingProject?.feedback && (
                  <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl text-xs text-cyan-200 mt-2">
                    <strong>ข้อเสนอแนะจากวิทยากร:</strong> {existingProject.feedback}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-12 text-center text-slate-500 space-y-2">
                <Lightbulb className="w-10 h-10 mx-auto opacity-30" />
                <p className="text-xs">กรอกข้อมูลทางซ้ายมือเพื่อพรีวิวโปสเตอร์นวัตกรรม</p>
              </div>
            )}
          </div>

          {activeParticipant.completedMissions?.m4_innovation_design && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>ส่งนวัตกรรมเข้าสู่ระบบเรียบร้อยแล้ว (+200 XP)</span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
