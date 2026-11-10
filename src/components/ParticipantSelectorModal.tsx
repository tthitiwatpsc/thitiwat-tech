import React, { useState } from 'react';
import { Participant } from '../types';
import { X, UserPlus, CheckCircle2, Building, Briefcase } from 'lucide-react';
import { getStoredParticipants, saveParticipants, setActiveParticipantId } from '../services/storageService';

interface ParticipantSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeParticipantId: string;
  onParticipantChanged: () => void;
}

export const ParticipantSelectorModal: React.FC<ParticipantSelectorModalProps> = ({
  isOpen,
  onClose,
  activeParticipantId,
  onParticipantChanged,
}) => {
  const [participants, setParticipants] = useState<Participant[]>(getStoredParticipants());
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New Participant Form
  const [newName, setNewName] = useState('');
  const [newSchool, setNewSchool] = useState('');
  const [newSchoolSize, setNewSchoolSize] = useState<'ขนาดเล็ก' | 'ขนาดกลาง' | 'ขนาดใหญ่' | 'ขนาดใหญ่พิเศษ'>('ขนาดกลาง');
  const [newGender, setNewGender] = useState<'ชาย' | 'หญิง' | 'อื่นๆ / ไม่ต้องการระบุ'>('ชาย');
  const [newAge, setNewAge] = useState<'ต่ำกว่า 30 ปี' | '30–40 ปี' | '41–50 ปี' | '51 ปีขึ้นไป'>('30–40 ปี');
  const [newEdu, setNewEdu] = useState<'ปริญญาตรี' | 'ปริญญาโท' | 'ปริญญาเอก'>('ปริญญาโท');
  const [newExp, setNewExp] = useState<'น้อยกว่า 5 ปี' | '5–10 ปี' | '11–20 ปี' | 'มากกว่า 20 ปี'>('5–10 ปี');

  if (!isOpen) return null;

  const handleSelect = (id: string) => {
    setActiveParticipantId(id);
    onParticipantChanged();
    onClose();
  };

  const handleCreateParticipant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newSchool.trim()) return;

    const newId = 'p_' + Date.now();
    const newParticipant: Participant = {
      id: newId,
      name: newName.trim(),
      email: `${newId}@school.ac.th`,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      demographics: {
        gender: newGender,
        age: newAge,
        education: newEdu,
        experience: newExp,
        schoolSize: newSchoolSize,
        schoolName: newSchool.trim(),
      },
      xp: 0,
      badges: [],
      completedMissions: {
        m1_device_inspector: false,
        m2_oecd_literacy: false,
        m3_prompt_engineering: false,
        m4_innovation_design: false,
        survey_completed: false,
      },
      lastActive: 'เพิ่งลงทะเบียน',
    };

    const updated = [...participants, newParticipant];
    saveParticipants(updated);
    setParticipants(updated);
    setActiveParticipantId(newId);
    onParticipantChanged();
    setIsAddingNew(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl text-slate-100 animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center space-x-2">
            <UserPlus className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-lg text-slate-100">
              {isAddingNew ? 'เพิ่มข้อมูลผู้เข้าอบรมท่านใหม่' : 'สลับผู้เข้าอบรม (Participant Switcher)'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {!isAddingNew ? (
            <div className="space-y-4">
              <p className="text-sm text-slate-400">
                เลือกรหัส/ชื่อครูผู้เข้าอบรมเพื่อจำลองการเข้าร่วมกิจกรรมและสะสมคะแนนผลงาน:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {participants.map((p) => {
                  const isActive = p.id === activeParticipantId;
                  return (
                    <div
                      key={p.id}
                      onClick={() => handleSelect(p.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start space-x-3 ${
                        isActive
                          ? 'bg-cyan-950/40 border-cyan-500/80 ring-2 ring-cyan-500/20'
                          : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className="w-12 h-12 rounded-full object-cover border border-slate-600 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-sm text-slate-100 truncate">{p.name}</h4>
                          {isActive && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                        </div>
                        <p className="text-xs text-slate-400 truncate">{p.demographics?.schoolName}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-[10px] bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded font-bold border border-cyan-500/20">
                            {p.xp} XP
                          </span>
                          <span className="text-[10px] text-slate-400">
                            เหรียญ: {p.badges?.length || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setIsAddingNew(true)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm rounded-xl flex items-center space-x-2 shadow-lg shadow-blue-500/20 transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>ลงทะเบียนผู้เข้าอบรมใหม่</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCreateParticipant} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">ชื่อ-นามสกุล ครูผู้เข้าอบรม</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น ครูสมศักดิ์ ปัญญาดี"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">โรงเรียนที่สังกัด</label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น โรงเรียนวิทยาศาสตร์มัธยม"
                    value={newSchool}
                    onChange={(e) => setNewSchool(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">ขนาดของสถานศึกษา</label>
                  <select
                    value={newSchoolSize}
                    onChange={(e) => setNewSchoolSize(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="ขนาดเล็ก">ขนาดเล็ก</option>
                    <option value="ขนาดกลาง">ขนาดกลาง</option>
                    <option value="ขนาดใหญ่">ขนาดใหญ่</option>
                    <option value="ขนาดใหญ่พิเศษ">ขนาดใหญ่พิเศษ</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">เพศ</label>
                  <select
                    value={newGender}
                    onChange={(e) => setNewGender(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="ชาย">ชาย</option>
                    <option value="หญิง">หญิง</option>
                    <option value="อื่นๆ / ไม่ต้องการระบุ">อื่นๆ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">อายุ</label>
                  <select
                    value={newAge}
                    onChange={(e) => setNewAge(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="ต่ำกว่า 30 ปี">ต่ำกว่า 30 ปี</option>
                    <option value="30–40 ปี">30–40 ปี</option>
                    <option value="41–50 ปี">41–50 ปี</option>
                    <option value="51 ปีขึ้นไป">51 ปีขึ้นไป</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">วุฒิการศึกษา</label>
                  <select
                    value={newEdu}
                    onChange={(e) => setNewEdu(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="ปริญญาตรี">ปริญญาตรี</option>
                    <option value="ปริญญาโท">ปริญญาโท</option>
                    <option value="ปริญญาเอก">ปริญญาเอก</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">ประสบการณ์การทำงาน</label>
                  <select
                    value={newExp}
                    onChange={(e) => setNewExp(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="น้อยกว่า 5 ปี">น้อยกว่า 5 ปี</option>
                    <option value="5–10 ปี">5–10 ปี</option>
                    <option value="11–20 ปี">11–20 ปี</option>
                    <option value="มากกว่า 20 ปี">มากกว่า 20 ปี</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm rounded-xl"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-sm rounded-xl shadow-lg shadow-cyan-600/20"
                >
                  บันทึกและเริ่มต้นการอบรม
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
