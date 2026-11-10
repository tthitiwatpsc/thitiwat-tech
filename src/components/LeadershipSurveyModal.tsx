import React, { useState } from 'react';
import { Participant, LeadershipSurveyResponses } from '../types';
import { X, Award, CheckCircle2, FileText, Send, Sparkles, BarChart2 } from 'lucide-react';
import { updateParticipantProgress } from '../services/storageService';
import confetti from 'canvas-confetti';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface LeadershipSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeParticipant: Participant;
  onSubmitted: () => void;
}

const QUESTIONS_CONFIG = [
  {
    componentName: 'องค์ประกอบที่ 1: ด้านความรู้และทักษะพื้นฐานเกี่ยวกับปัญญาประดิษฐ์',
    items: [
      { id: 'q1', text: '1. ท่านประเมินผลลัพธ์และประเมินผลกระทบที่เกิดจากการใช้ปัญญาประดิษฐ์ในการสอน' },
      { id: 'q2', text: '2. ท่านคัดกรองและเลือกข้อมูลที่มีความน่าเชื่อถือจากปัญญาประดิษฐ์ก่อนนำไปใช้' },
      { id: 'q3', text: '3. ท่านสามารถตัดสินใจแก้ปัญหาการใช้ปัญญาประดิษฐ์ในการสอนได้อย่างรวดเร็ว' },
      { id: 'q4', text: '4. ท่านวิเคราะห์แนวโน้มของปัญญาประดิษฐ์ทางการศึกษาเพื่อเตรียมพร้อมรับการเปลี่ยนแปลง' },
    ]
  },
  {
    componentName: 'องค์ประกอบที่ 2: ด้านการวางแผนและการประเมินผลการใช้ปัญญาประดิษฐ์',
    items: [
      { id: 'q5', text: '5. ท่านมีแผนรับมือความเสี่ยงจากการใช้ปัญญาประดิษฐ์' },
      { id: 'q6', text: '6. ท่านดูแลและตรวจสอบระบบปัญญาประดิษฐ์บ่อยครั้ง' },
      { id: 'q7', text: '7. ท่านประสานงานกับผู้เกี่ยวข้องในการพัฒนาการเรียนการสอนด้วยปัญญาประดิษฐ์' },
      { id: 'q8', text: '8. ท่านนำแนวทางปัญญาประดิษฐ์มาใช้ในการจัดการเรียนรู้' },
    ]
  },
  {
    componentName: 'องค์ประกอบที่ 3: ด้านการประยุกต์ใช้ปัญญาประดิษฐ์ในการเรียนการสอน',
    items: [
      { id: 'q9', text: '9. ท่านพัฒนาเครื่องมือประเมินผลการเรียนรู้ที่ใช้ปัญญาประดิษฐ์อย่างเหมาะสม' },
      { id: 'q10', text: '10. ท่านสร้างเครือข่ายความร่วมมือด้านปัญญาประดิษฐ์กับหน่วยงานภายนอก' },
      { id: 'q11', text: '11. ท่านใช้ปัญญาประดิษฐ์ช่วยสอนตามความแตกต่างของผู้เรียน' },
      { id: 'q12', text: '12. ท่านประเมินและปรับปรุงวิธีการใช้ปัญญาประดิษฐ์ในการสอน' },
    ]
  },
  {
    componentName: 'องค์ประกอบที่ 4: ด้านจริยธรรมและความรับผิดชอบในการใช้ปัญญาประดิษฐ์',
    items: [
      { id: 'q13', text: '13. ท่านใช้ปัญญาประดิษฐ์ในการสอนโดยคำนึงถึงผลกระทบต่อผู้เรียน' },
      { id: 'q14', text: '14. ท่านเปิดโอกาสให้นักเรียนและเพื่อนครูแสดงความคิดเห็นเกี่ยวกับการใช้ปัญญาประดิษฐ์' },
      { id: 'q15', text: '15. ท่านส่งเสริมให้นักเรียนใช้ปัญญาประดิษฐ์ในการเรียนรู้ด้วยตนเอง' },
      { id: 'q16', text: '16. ท่านให้ผู้เรียนสะท้อนผลการเรียนรู้หลังเรียนเนื้อหาจบ' },
    ]
  }
];

export const LeadershipSurveyModal: React.FC<LeadershipSurveyModalProps> = ({
  isOpen,
  onClose,
  activeParticipant,
  onSubmitted,
}) => {
  const existing = activeParticipant.surveyResponses || {
    q1: 5, q2: 5, q3: 4, q4: 4,
    q5: 4, q6: 4, q7: 4, q8: 5,
    q9: 4, q10: 3, q11: 4, q12: 4,
    q13: 5, q14: 5, q15: 4, q16: 4
  };

  const [answers, setAnswers] = useState<LeadershipSurveyResponses>(existing);
  const [showResult, setShowResult] = useState<boolean>(!!activeParticipant.completedMissions?.survey_completed);

  if (!isOpen) return null;

  const handleScoreChange = (qKey: keyof LeadershipSurveyResponses, val: number) => {
    setAnswers(prev => ({ ...prev, [qKey]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParticipantProgress(activeParticipant.id, {
      surveyResponses: answers,
    });

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setShowResult(true);
    onSubmitted();
  };

  // Radar chart data preparation
  const calcAvg = (keys: (keyof LeadershipSurveyResponses)[]) => {
    const sum = keys.reduce((acc, k) => acc + (answers[k] || 0), 0);
    return Number((sum / keys.length).toFixed(2));
  };

  const c1 = calcAvg(['q1', 'q2', 'q3', 'q4']);
  const c2 = calcAvg(['q5', 'q6', 'q7', 'q8']);
  const c3 = calcAvg(['q9', 'q10', 'q11', 'q12']);
  const c4 = calcAvg(['q13', 'q14', 'q15', 'q16']);

  const overallAvg = Number(((c1 + c2 + c3 + c4) / 4).toFixed(2));

  const radarData = [
    { subject: 'ความรู้พื้นฐาน AI', score: c1, fullMark: 5 },
    { subject: 'วางแผนและประเมิน', score: c2, fullMark: 5 },
    { subject: 'การประยุกต์การสอน', score: c3, fullMark: 5 },
    { subject: 'จริยธรรม & ความรับผิดชอบ', score: c4, fullMark: 5 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl text-slate-100 overflow-hidden my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-100">
                แบบวัดภาวะผู้นำทางเทคโนโลยีการศึกษาในยุคปัญญาประดิษฐ์
              </h3>
              <p className="text-xs text-slate-400">
                สำหรับครูระดับการศึกษาขั้นพื้นฐาน (วิทยาศาสตร์และเทคโนโลยี)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-2 rounded-xl hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {!showResult ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="p-4 bg-slate-800/60 border border-slate-700/60 rounded-2xl text-xs text-slate-300 space-y-2">
                <p className="font-medium text-amber-300">
                  คำชี้แจง: แบบวัดฉบับนี้มีวัตถุประสงค์เพื่อประเมินระดับภาวะผู้นำทางเทคโนโลยีการศึกษาในยุค AI
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] text-slate-400 pt-1 border-t border-slate-700/40">
                  <span>5 = มากที่สุด</span>
                  <span>4 = มาก</span>
                  <span>3 = ปานกลาง</span>
                  <span>2 = น้อย</span>
                  <span>1 = น้อยที่สุด</span>
                </div>
              </div>

              {/* Part 1: General Info Preview */}
              <div className="p-4 bg-cyan-950/20 border border-cyan-800/40 rounded-2xl">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                  ส่วนที่ 1: ข้อมูลทั่วไปของผู้ตอบแบบสอบถาม
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300">
                  <div><span className="text-slate-400">ชื่อ-สกุล:</span> {activeParticipant.name}</div>
                  <div><span className="text-slate-400">สังกัด:</span> {activeParticipant.demographics?.schoolName}</div>
                  <div><span className="text-slate-400">ขนาดโรงเรียน:</span> {activeParticipant.demographics?.schoolSize}</div>
                  <div><span className="text-slate-400">ประสบการณ์:</span> {activeParticipant.demographics?.experience}</div>
                </div>
              </div>

              {/* Part 2: 16 Survey Items */}
              <div className="space-y-6">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  ส่วนที่ 2: แบบวัดภาวะผู้นำทางเทคโนโลยีการศึกษาในยุคปัญญาประดิษฐ์ (16 ข้อ)
                </h4>

                {QUESTIONS_CONFIG.map((comp, cIdx) => (
                  <div key={cIdx} className="space-y-3 bg-slate-950/40 p-4 rounded-2xl border border-slate-800">
                    <h5 className="font-bold text-sm text-cyan-300 border-b border-slate-800 pb-2">
                      {comp.componentName}
                    </h5>

                    <div className="space-y-4 pt-1">
                      {comp.items.map((item) => {
                        const qKey = item.id as keyof LeadershipSurveyResponses;
                        const currentVal = answers[qKey] || 3;

                        return (
                          <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-900/80 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
                            <span className="text-xs text-slate-200 leading-relaxed font-medium sm:w-2/3">
                              {item.text}
                            </span>

                            <div className="flex items-center justify-between sm:justify-end space-x-1 sm:space-x-2">
                              {[5, 4, 3, 2, 1].map((val) => (
                                <button
                                  key={val}
                                  type="button"
                                  onClick={() => handleScoreChange(qKey, val)}
                                  className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                                    currentVal === val
                                      ? 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 shadow-lg shadow-amber-500/20 scale-105'
                                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                                  }`}
                                >
                                  {val}
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm rounded-2xl shadow-xl shadow-amber-500/20 flex items-center space-x-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>บันทึกผลการประเมินและดูผลวิเคราะห์</span>
                </button>
              </div>

            </form>
          ) : (
            <div className="space-y-6">
              
              {/* Success Banner */}
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl flex items-center space-x-3 text-emerald-300">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-emerald-200">ประเมินภาวะผู้นำทาง AI สำเร็จแล้ว!</h4>
                  <p className="text-xs text-emerald-400/80">
                    คุณได้รับเหรียญ "ผู้นำเทคโนโลยีปัญญาประดิษฐ์" พร้อมรับคะแนน +100 XP
                  </p>
                </div>
              </div>

              {/* Score Breakdown & Radar Chart */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Radar Chart */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center min-h-[300px]">
                  <h4 className="text-xs font-bold text-amber-400 mb-2 uppercase tracking-wider text-center">
                    แผนภูมิภาวะผู้นำ AI 4 มิติ
                  </h4>
                  <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                        <PolarGrid stroke="#334155" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 5]} stroke="#475569" />
                        <Radar name="ระดับปฏิบัติการ" dataKey="score" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.4} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Score Details Cards */}
                <div className="space-y-3">
                  <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80">
                    <span className="text-xs text-slate-400 font-medium">คะแนนเฉลี่ยภาวะผู้นำ AI รวม</span>
                    <div className="flex items-baseline space-x-2 mt-1">
                      <span className="text-3xl font-extrabold text-amber-400">{overallAvg}</span>
                      <span className="text-xs text-slate-400">/ 5.00 คะแนนเต็ม</span>
                    </div>
                    <p className="text-xs text-emerald-400 mt-1 font-semibold">
                      {overallAvg >= 4.5 ? 'อยู่ในระดับ: มากที่สุด (ระดับผู้นำขั้นสูง)' : overallAvg >= 3.5 ? 'อยู่ในระดับ: มาก (ผู้นำระดับดีเยี่ยม)' : 'อยู่ในระดับ: ปานกลาง'}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-slate-300">1. ความรู้พื้นฐานเกี่ยวกับ AI:</span>
                      <span className="font-bold text-cyan-400">{c1} / 5.0</span>
                    </div>
                    <div className="flex justify-between items-center p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-slate-300">2. การวางแผนและการประเมินผล:</span>
                      <span className="font-bold text-cyan-400">{c2} / 5.0</span>
                    </div>
                    <div className="flex justify-between items-center p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-slate-300">3. การประยุกต์ใช้ในการเรียนการสอน:</span>
                      <span className="font-bold text-cyan-400">{c3} / 5.0</span>
                    </div>
                    <div className="flex justify-between items-center p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-slate-300">4. จริยธรรมและความรับผิดชอบ:</span>
                      <span className="font-bold text-cyan-400">{c4} / 5.0</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setShowResult(false)}
                  className="text-xs text-slate-400 hover:text-slate-200 underline"
                >
                  แก้ไขคำตอบแบบวัด
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700"
                >
                  ปิดหน้าต่าง
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
