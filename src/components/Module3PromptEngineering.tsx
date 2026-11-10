import React, { useState } from 'react';
import { Participant } from '../types';
import { PROMPT_SCIENCE_TEMPLATES } from '../data/mockData';
import { Sparkles, Terminal, Play, CheckCircle2, Award, ArrowRight, Copy, RefreshCw, AlertCircle, FileCode } from 'lucide-react';
import { updateParticipantProgress } from '../services/storageService';
import confetti from 'canvas-confetti';

interface Module3Props {
  activeParticipant: Participant;
  onMissionCompleted: () => void;
}

export const Module3PromptEngineering: React.FC<Module3Props> = ({
  activeParticipant,
  onMissionCompleted,
}) => {
  const [promptText, setPromptText] = useState<string>(PROMPT_SCIENCE_TEMPLATES[0].promptText);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [aiOutput, setAiOutput] = useState<string>('');
  const [evaluation, setEvaluation] = useState<any>(null);
  const [testedCount, setTestedCount] = useState<number>(activeParticipant.m3_tested_prompts_count || 0);

  const handleSelectTemplate = (tmplText: string) => {
    setPromptText(tmplText);
    setAiOutput('');
    setEvaluation(null);
  };

  // Run Prompt with Gemini API
  const handleRunPrompt = async () => {
    if (!promptText.trim()) return;
    setIsRunning(true);
    setAiOutput('');

    try {
      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText }),
      });
      const data = await res.json();

      if (data.success) {
        setAiOutput(data.text);
        const newCount = testedCount + 1;
        setTestedCount(newCount);

        updateParticipantProgress(activeParticipant.id, {
          xpGain: 50,
          m3_tested_prompts_count: 1,
        });
      } else {
        setAiOutput(`[เกิดข้อผิดพลาด]: ${data.error}`);
      }
    } catch (e: any) {
      setAiOutput(`[ข้อผิดพลาดการเชื่อมต่อ]: ${e.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  // Evaluate Prompt Quality using Gemini AI
  const handleEvaluatePrompt = async () => {
    if (!promptText.trim()) return;
    setIsEvaluating(true);
    setEvaluation(null);

    try {
      const res = await fetch('/api/gemini/evaluate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promptText }),
      });
      const data = await res.json();

      if (data.success) {
        setEvaluation(data.evaluation);
        if (data.evaluation?.score >= 80 && !activeParticipant.completedMissions?.m3_prompt_engineering) {
          updateParticipantProgress(activeParticipant.id, {
            xpGain: 150,
            badgeId: 'b_m3',
            completedMission: 'm3_prompt_engineering',
          });
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
          onMissionCompleted();
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 border border-emerald-800/50 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>โมดูลที่ 3: Prompt Engineering Sandbox</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            ห้องปฏิบัติการวิศวกรรมการป้อนคำสั่ง (Prompt Lab)
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            ทดลองสร้างสรรค์ Prompt สำหรับออกแบบแผนการสอน 5E, ใบงานทดลองวิทยาศาสตร์ และข้อสอบวัดสมรรถนะ PISA พร้อมประเมินคุณภาพด้วย Gemini AI
          </p>
        </div>
      </div>

      {/* Science Templates Picker */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          ชุดแม่แบบ Prompt สำหรับการจัดการเรียนรู้วิทยาศาสตร์
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PROMPT_SCIENCE_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={() => handleSelectTemplate(tmpl.promptText)}
              className="p-4 bg-slate-900 border border-slate-800 hover:border-emerald-500/60 rounded-2xl cursor-pointer transition-all space-y-2 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  {tmpl.category}
                </span>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <h4 className="font-bold text-xs text-slate-100">{tmpl.title}</h4>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {tmpl.promptText}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Prompt Editor & AI Runner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Prompt Input & Evaluator */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base text-slate-100">
                  กล่องพิมพ์ Prompt ทางวิทยาศาสตร์
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                ทดสอบแล้ว: <strong className="text-emerald-400">{testedCount}</strong> ครั้ง
              </span>
            </div>

            <textarea
              rows={10}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="พิมพ์คำสั่ง Prompt สำหรับสร้างสื่อ แผน หรือข้อสอบวิทยาศาสตร์..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-200 leading-relaxed focus:outline-none focus:border-emerald-500 shadow-inner"
            />

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleEvaluatePrompt}
                disabled={isEvaluating || !promptText.trim()}
                className="py-3 px-4 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 flex items-center justify-center space-x-2 transition-all"
              >
                {isEvaluating ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                ) : (
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                )}
                <span>ประเมินคุณภาพ Prompt</span>
              </button>

              <button
                onClick={handleRunPrompt}
                disabled={isRunning || !promptText.trim()}
                className="py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 flex items-center justify-center space-x-2 transition-all"
              >
                {isRunning ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4 fill-current" />
                )}
                <span>ทดสอบรันด้วย Gemini AI</span>
              </button>
            </div>
          </div>

          {/* AI Evaluation Card */}
          {evaluation && (
            <div className="p-4 bg-slate-950 border border-emerald-500/40 rounded-2xl space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-emerald-400">ผลการประเมินวิศวกรรม Prompt</span>
                <span className="text-sm font-extrabold text-amber-400">
                  {evaluation.score} / 100 คะแนน
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="text-slate-300"><strong className="text-emerald-400">จุดเด่น:</strong> {evaluation.strengths?.join(', ')}</div>
                <div className="text-slate-300"><strong className="text-amber-400">ข้อควรปรับปรุง:</strong> {evaluation.improvements?.join(', ')}</div>
              </div>

              {evaluation.suggestedPrompt && (
                <div className="p-2.5 bg-slate-900 rounded-xl text-[11px] font-mono text-cyan-300 border border-slate-800">
                  <span className="block font-bold text-slate-400 mb-1">เวอร์ชันปรับปรุงแนะนำ:</span>
                  {evaluation.suggestedPrompt}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Right Column: AI Output Viewer */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-100 flex items-center space-x-2">
                <FileCode className="w-5 h-5 text-cyan-400" />
                <span>ผลลัพธ์ที่ตอบกลับจาก Gemini AI</span>
              </h3>
              {isRunning && (
                <span className="text-xs text-cyan-400 animate-pulse">กำลังเจนเนอเรตคำตอบ...</span>
              )}
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl min-h-[320px] max-h-[480px] overflow-y-auto text-xs text-slate-200 whitespace-pre-wrap leading-relaxed font-sans shadow-inner">
              {aiOutput ? (
                aiOutput
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-2 py-12">
                  <Play className="w-8 h-8 opacity-40" />
                  <span>คลิก "ทดสอบรันด้วย Gemini AI" เพื่อดูผลลัพธ์การเจนเนอเรต</span>
                </div>
              )}
            </div>
          </div>

          {activeParticipant.completedMissions?.m3_prompt_engineering && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>ปลดล็อกเหรียญ Prompt Engineering Master แล้ว! (+150 XP)</span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
