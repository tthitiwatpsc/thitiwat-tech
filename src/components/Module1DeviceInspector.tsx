import React, { useState } from 'react';
import { Participant, DeviceInspectorItem } from '../types';
import { DEVICE_INSPECTOR_ITEMS } from '../data/mockData';
import { Eye, Brain, Zap, Microscope, CheckCircle2, ArrowRight, HelpCircle, AlertCircle } from 'lucide-react';
import { updateParticipantProgress } from '../services/storageService';
import confetti from 'canvas-confetti';

interface Module1Props {
  activeParticipant: Participant;
  onMissionCompleted: () => void;
}

export const Module1DeviceInspector: React.FC<Module1Props> = ({
  activeParticipant,
  onMissionCompleted,
}) => {
  const [selectedDevice, setSelectedDevice] = useState<DeviceInspectorItem>(DEVICE_INSPECTOR_ITEMS[0]);
  const [activeStep, setActiveStep] = useState<'know' | 'think' | 'act' | 'science'>('know');
  const [exploredDevices, setExploredDevices] = useState<string[]>(['dev_1']);

  // Quiz state
  const isAlreadyDone = !!activeParticipant.completedMissions?.m1_device_inspector;
  const [quizAnswer, setQuizAnswer] = useState<number | null>(isAlreadyDone ? 0 : null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(isAlreadyDone);
  const [quizError, setQuizError] = useState<string>('');

  const handleSelectDevice = (dev: DeviceInspectorItem) => {
    setSelectedDevice(dev);
    if (!exploredDevices.includes(dev.id)) {
      setExploredDevices([...exploredDevices, dev.id]);
    }
  };

  const handleCompleteMission = () => {
    if (quizAnswer === 0) { // Correct answer index
      setQuizError('');
      updateParticipantProgress(activeParticipant.id, {
        xpGain: 150,
        badgeId: 'b_m1',
        completedMission: 'm1_device_inspector',
        m1_quiz_score: 100,
      });

      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      setQuizSubmitted(true);
      onMissionCompleted();
    } else {
      setQuizError('คำตอบยังไม่ถูกต้อง ลองพิจารณาหลักการ "รู้ คิด ปฏิบัติ" อีกครั้งนะครับ');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border border-blue-800/50 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Microscope className="w-4 h-4" />
            <span>โมดูลที่ 1: รู้จัก AI ผ่านอุปกรณ์รอบตัว</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            กิจกรรม "รู้ - คิด - ปฏิบัติ" (Recognize, Think, Act)
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            สำรวจอุปกรณ์และเซนเซอร์ทางวิทยาศาสตร์ใกล้ตัว เพื่อทำความเข้าใจ 3 ขั้นตอนหลักของการทำงานของระบบ AI ก่อนนำมโนทัศน์นี้ไปจัดกิจกรรมให้นักเรียน
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Device Cards List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            เลือกอุปกรณ์เพื่อสแกนหลักการ AI (4/4)
          </h3>

          <div className="space-y-2.5">
            {DEVICE_INSPECTOR_ITEMS.map((dev) => {
              const isSelected = selectedDevice.id === dev.id;
              const isExplored = exploredDevices.includes(dev.id);

              return (
                <div
                  key={dev.id}
                  onClick={() => handleSelectDevice(dev)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center space-x-3 ${
                    isSelected
                      ? 'bg-blue-950/60 border-cyan-400 ring-2 ring-cyan-500/20 shadow-xl'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <img
                    src={dev.image}
                    alt={dev.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-xl object-cover border border-slate-700 flex-shrink-0 bg-slate-800"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                        {dev.category}
                      </span>
                      {isExplored && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <h4 className="font-bold text-xs text-slate-100 mt-1 line-clamp-1">
                      {dev.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {dev.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Deep-Dive Inspector (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl flex flex-col justify-between">
          
          <div className="space-y-6">
            
            {/* Selected Device Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">
                  กำลังวิเคราะห์: {selectedDevice.category}
                </span>
                <h3 className="text-lg font-bold text-slate-100">
                  {selectedDevice.name}
                </h3>
              </div>
              <img
                src={selectedDevice.image}
                alt={selectedDevice.name}
                referrerPolicy="no-referrer"
                className="w-full sm:w-32 h-24 rounded-2xl object-cover border border-slate-700 shadow-md bg-slate-800"
              />
            </div>

            {/* 3 Steps Navigation Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
              <button
                onClick={() => setActiveStep('know')}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                  activeStep === 'know'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-4 h-4 text-cyan-300" />
                <span>1. รู้ (Sensors)</span>
              </button>

              <button
                onClick={() => setActiveStep('think')}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                  activeStep === 'think'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Brain className="w-4 h-4 text-purple-300" />
                <span>2. คิด (AI Process)</span>
              </button>

              <button
                onClick={() => setActiveStep('act')}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                  activeStep === 'act'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Zap className="w-4 h-4 text-yellow-300" />
                <span>3. ปฏิบัติ (Action)</span>
              </button>

              <button
                onClick={() => setActiveStep('science')}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                  activeStep === 'science'
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Microscope className="w-4 h-4 text-amber-200" />
                <span>ประยุกต์สอนแล็ป</span>
              </button>
            </div>

            {/* Active Step Content Showcase */}
            <div className="p-6 bg-slate-950/60 rounded-2xl border border-slate-800 min-h-[160px] flex items-center">
              {activeStep === 'know' && (
                <div className="space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
                    <Eye className="w-5 h-5" />
                    <span>ขั้นที่ 1: รู้ (Sensors & Data Collection)</span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {selectedDevice.know}
                  </p>
                </div>
              )}

              {activeStep === 'think' && (
                <div className="space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm">
                    <Brain className="w-5 h-5" />
                    <span>ขั้นที่ 2: คิด (AI Algorithms & Pattern Recognition)</span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {selectedDevice.think}
                  </p>
                </div>
              )}

              {activeStep === 'act' && (
                <div className="space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center space-x-2 text-yellow-400 font-bold text-sm">
                    <Zap className="w-5 h-5" />
                    <span>ขั้นที่ 3: ปฏิบัติ (Act & Real-time Output)</span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {selectedDevice.act}
                  </p>
                </div>
              )}

              {activeStep === 'science' && (
                <div className="space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                    <Microscope className="w-5 h-5" />
                    <span>แนวทางการนำไปจัดกิจกรรมในชั้นเรียนวิทยาศาสตร์</span>
                  </div>
                  <p className="text-sm text-amber-100/90 leading-relaxed">
                    {selectedDevice.scienceApplication}
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Quick Step Switch Indicator */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>อุปกรณ์ที่สแกนแล้ว: {exploredDevices.length} / 4 ชิ้น</span>
            <span className="text-cyan-400 font-medium">คลิกแท็บเพื่อสลับอ่านรายละเอียด</span>
          </div>

        </div>

      </div>

      {/* Module 1 Quiz Challenge */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl text-yellow-400">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-100">
              ภารกิจวัดความเข้าใจ: ทดสอบมโนทัศน์ "รู้ - คิด - ปฏิบัติ"
            </h3>
            <p className="text-xs text-slate-400">
              รับคะแนนสะสม 150 XP พร้อมปลดล็อกเหรียญเกียรติยศประจำโมดูลที่ 1
            </p>
          </div>
        </div>

        <div className="p-5 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-4">
          <p className="text-sm font-semibold text-slate-200">
            โจทย์: เมื่อครูนำ "ชุดเซนเซอร์สมาร์ทฟาร์ม" มาใช้ในโรงเรียน ข้อใดต่อไปนี้จัดเป็นขั้นตอน "คิด (Think)" ของระบบ AI ได้ถูกต้องที่สุด?
          </p>

          <div className="space-y-2.5">
            {[
              { id: 0, text: 'ก. AI คำนวณความสัมพันธ์ระหว่างอุณหภูมิและความชื้นเทียบกับแบบจำลองการระเหยน้ำของพืช' },
              { id: 1, text: 'ข. หัววัดเซนเซอร์อ่านค่าอุณหภูมิได้ 32 องศาเซลเซียส' },
              { id: 2, text: 'ค. สปรินเกอร์พ่นน้ำรดแปลงผักทำงานเป็นเวลา 5 นาที' },
            ].map((opt) => (
              <label
                key={opt.id}
                className={`flex items-center space-x-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  quizAnswer === opt.id
                    ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200 font-medium'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="m1_quiz"
                  checked={quizAnswer === opt.id}
                  onChange={() => {
                    setQuizAnswer(opt.id);
                    setQuizError('');
                  }}
                  className="accent-cyan-400 w-4 h-4"
                />
                <span className="text-xs sm:text-sm">{opt.text}</span>
              </label>
            ))}
          </div>

          {quizError && (
            <div className="p-3 bg-rose-950/50 border border-rose-500/40 rounded-xl text-rose-300 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{quizError}</span>
            </div>
          )}

          {!quizSubmitted ? (
            <button
              onClick={handleCompleteMission}
              disabled={quizAnswer === null}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 flex items-center space-x-2 transition-all"
            >
              <span>ส่งคำตอบภารกิจที่ 1</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>คุณทำภารกิจโมดูลที่ 1 สำเร็จแล้ว! (+150 XP)</span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
