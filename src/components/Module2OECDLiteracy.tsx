import React, { useState } from 'react';
import { Participant } from '../types';
import { OECD_SCENARIOS } from '../data/mockData';
import { ShieldCheck, BookOpen, Brain, CheckCircle2, Award, ArrowRight, Lightbulb, AlertTriangle } from 'lucide-react';
import { updateParticipantProgress } from '../services/storageService';
import confetti from 'canvas-confetti';

interface Module2Props {
  activeParticipant: Participant;
  onMissionCompleted: () => void;
}

export const Module2OECDLiteracy: React.FC<Module2Props> = ({
  activeParticipant,
  onMissionCompleted,
}) => {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: number }>({});
  const [submittedScenarios, setSubmittedScenarios] = useState<boolean>(!!activeParticipant.completedMissions?.m2_oecd_literacy);

  // LLM Token Visualizer State
  const [inputText, setInputText] = useState('พืชสังเคราะห์ด้วยแสงเปลี่ยนพลังงานแสงเป็นพลังงานเคมีในรูปน้ำตาลกูโลโคส');

  const scenario = OECD_SCENARIOS[activeScenarioIdx];

  const handleSelectOption = (scenarioId: string, optIdx: number) => {
    setSelectedOptions(prev => ({ ...prev, [scenarioId]: optIdx }));
  };

  const handleCompleteMission = () => {
    const isAllAnswered = OECD_SCENARIOS.every(s => selectedOptions[s.id] !== undefined);
    if (!isAllAnswered) {
      alert('กรุณาตอบคำถามให้ครบทั้ง 3 สถานการณ์ก่อนส่งนะครับ');
      return;
    }

    // Check correct answers
    let correctCount = 0;
    OECD_SCENARIOS.forEach(s => {
      const chosen = selectedOptions[s.id];
      if (s.options[chosen]?.isCorrect) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / OECD_SCENARIOS.length) * 100);

    updateParticipantProgress(activeParticipant.id, {
      xpGain: 150,
      badgeId: 'b_m2',
      completedMission: 'm2_oecd_literacy',
      m2_oecd_score: score,
    });

    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    setSubmittedScenarios(true);
    onMissionCompleted();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 border border-purple-800/50 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>โมดูลที่ 2: LLM Principles & OECD AI Literacy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            กรอบความรู้เท่าทัน AI ตามมาตรฐาน OECD
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            พัฒนาสมรรถนะการเป็นผู้นำการจัดการเรียนรู้วิทยาศาสตร์ด้วยปัญญาประดิษฐ์ ผ่าน 4 เสาหลักของ OECD และทำความเข้าใจกลไกโมเดลภาษาขนาดใหญ่ (LLM)
          </p>
        </div>
      </div>

      {/* 4 OECD Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: '1. รู้จักกลไก AI',
            desc: 'เข้าใจหลักการ Probabilistic & Data Training ของ LLM เพื่อลดความเข้าใจผิดว่า AI รู้จักโลกแบบมนุษย์',
            color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-cyan-300',
          },
          {
            title: '2. การปฏิสัมพันธ์กับ AI',
            desc: 'สื่อสารด้วย Prompt ที่ชัดเจนและนำ AI มาช่วยในการออกแบบกิจกรรมการทดลองวิทยาศาสตร์',
            color: 'from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-300',
          },
          {
            title: '3. ประเมินและคัดกรอง',
            desc: 'ตรวจสอบความน่าเชื่อถือของข้อมูล วิเคราะห์ AI Hallucination และตรวจสอบกับพยานหลักฐานทางวิทยาศาสตร์',
            color: 'from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-300',
          },
          {
            title: '4. จริยธรรมและความรับผิดชอบ',
            desc: 'ส่งเสริมการใช้ AI อย่างซื่อสัตย์ เปิดเผยการใช้อ้างอิง (AI Attribution) และคำนึงถึงความถูกต้องทางวิชาการ',
            color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-300',
          },
        ].map((pillar, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl bg-gradient-to-b ${pillar.color} border space-y-2 shadow-lg`}
          >
            <h4 className="font-bold text-sm text-slate-100">{pillar.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{pillar.desc}</p>
          </div>
        ))}
      </div>

      {/* LLM Token Visualizer Sandbox */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-purple-400" />
          <h3 className="font-bold text-base text-slate-100">
            เครื่องมือจำลองกลไก LLM: Tokenization & Word Prediction
          </h3>
        </div>
        <p className="text-xs text-slate-400">
          ทดลองป้อนข้อความวิทยาศาสตร์เพื่อดูว่าโมเดลภาษาขนาดใหญ่ตัดทอนประโยคเป็นคำหรือ Sub-word อย่างไร:
        </p>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
        />

        {/* Token Chips */}
        <div className="flex flex-wrap gap-2 pt-2">
          {inputText.split(/(\s+|และ|ด้วย|เป็น|ในรูป|เปลี่ยน|การ)/).filter(Boolean).map((token, tIdx) => (
            <span
              key={tIdx}
              className="px-3 py-1 bg-purple-950/60 border border-purple-500/40 text-purple-200 text-xs rounded-lg font-mono font-bold shadow"
            >
              Token #{tIdx + 1}: "{token}"
            </span>
          ))}
        </div>
      </div>

      {/* OECD Scenarios Quiz */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <h3 className="font-bold text-lg text-slate-100">
              สถานการณ์การตัดสินใจทางจริยธรรม AI ในห้องเรียนวิทยาศาสตร์ (3 ข้อ)
            </h3>
            <p className="text-xs text-slate-400">
              วิเคราะห์สถานการณ์เพื่อเลือกแนวปฏิบัติที่สอดคล้องกับกรอบ OECD
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="flex space-x-2">
            {OECD_SCENARIOS.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveScenarioIdx(idx)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                  activeScenarioIdx === idx
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Current Scenario Card */}
        <div className="p-6 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-4">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-wider bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20">
            {scenario.pillar}
          </span>

          <p className="text-sm font-medium text-slate-200 leading-relaxed">
            {scenario.scenario}
          </p>

          <div className="space-y-3 pt-2">
            {scenario.options.map((opt, oIdx) => {
              const isSelected = selectedOptions[scenario.id] === oIdx;

              return (
                <div
                  key={oIdx}
                  onClick={() => handleSelectOption(scenario.id, oIdx)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${
                    isSelected
                      ? 'bg-purple-950/50 border-purple-400 text-purple-100'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <input
                      type="radio"
                      name={scenario.id}
                      checked={isSelected}
                      onChange={() => {}}
                      className="accent-purple-400 mt-1"
                    />
                    <span className="text-xs sm:text-sm leading-relaxed">{opt.text}</span>
                  </div>

                  {submittedScenarios && isSelected && (
                    <div className={`text-xs p-2.5 rounded-lg border mt-2 ${
                      opt.isCorrect
                        ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300'
                        : 'bg-rose-950/50 border-rose-500/50 text-rose-300'
                    }`}>
                      {opt.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex justify-between items-center">
            <span className="text-xs text-slate-400">
              ความคืบหน้าการตอบ: {Object.keys(selectedOptions).length} / {OECD_SCENARIOS.length} ข้อ
            </span>

            {!submittedScenarios ? (
              <button
                onClick={handleCompleteMission}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-500/20 flex items-center space-x-2 transition-all"
              >
                <span>ส่งคำตอบภารกิจที่ 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>ผ่านการทดสอบ OECD AI Literacy (+150 XP)</span>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
