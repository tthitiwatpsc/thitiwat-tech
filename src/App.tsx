/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserRole, Participant } from './types';
import {
  getStoredParticipants,
  getActiveParticipantId,
} from './services/storageService';
import { Navbar } from './components/Navbar';
import { OverviewDashboard } from './components/OverviewDashboard';
import { Module1DeviceInspector } from './components/Module1DeviceInspector';
import { Module2OECDLiteracy } from './components/Module2OECDLiteracy';
import { Module3PromptEngineering } from './components/Module3PromptEngineering';
import { Module4InnovationStudio } from './components/Module4InnovationStudio';
import { AdminDashboard } from './components/AdminDashboard';
import { ParticipantSelectorModal } from './components/ParticipantSelectorModal';
import { LeaderboardDrawer } from './components/LeaderboardDrawer';
import { LeadershipSurveyModal } from './components/LeadershipSurveyModal';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('participant');
  const [activeTab, setActiveTab] = useState<string>('overview');

  const [participants, setParticipants] = useState<Participant[]>(getStoredParticipants());
  const [activeParticipantId, setActiveParticipantIdState] = useState<string>(getActiveParticipantId());

  // Modals
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState<boolean>(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState<boolean>(false);
  const [isSurveyOpen, setIsSurveyOpen] = useState<boolean>(false);

  // Sync state from storage
  const syncData = () => {
    const list = getStoredParticipants();
    setParticipants(list);
    const currentId = getActiveParticipantId();
    setActiveParticipantIdState(currentId);
  };

  useEffect(() => {
    syncData();

    const handleUpdate = () => syncData();
    window.addEventListener('scitech_data_updated', handleUpdate);
    window.addEventListener('scitech_user_changed', handleUpdate);

    return () => {
      window.removeEventListener('scitech_data_updated', handleUpdate);
      window.removeEventListener('scitech_user_changed', handleUpdate);
    };
  }, []);

  const activeParticipant =
    participants.find((p) => p.id === activeParticipantId) || participants[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 flex flex-col">
      
      {/* Top Header Navbar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        activeParticipant={activeParticipant}
        onOpenParticipantModal={() => setIsParticipantModalOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenSurvey={() => setIsSurveyOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentRole === 'participant' ? (
          <>
            {activeTab === 'overview' && (
              <OverviewDashboard
                activeParticipant={activeParticipant}
                setActiveTab={setActiveTab}
                onOpenSurvey={() => setIsSurveyOpen(true)}
              />
            )}

            {activeTab === 'm1' && (
              <Module1DeviceInspector
                activeParticipant={activeParticipant}
                onMissionCompleted={syncData}
              />
            )}

            {activeTab === 'm2' && (
              <Module2OECDLiteracy
                activeParticipant={activeParticipant}
                onMissionCompleted={syncData}
              />
            )}

            {activeTab === 'm3' && (
              <Module3PromptEngineering
                activeParticipant={activeParticipant}
                onMissionCompleted={syncData}
              />
            )}

            {activeTab === 'm4' && (
              <Module4InnovationStudio
                activeParticipant={activeParticipant}
                onMissionCompleted={syncData}
              />
            )}
          </>
        ) : (
          <AdminDashboard
            participants={participants}
            onRefreshData={syncData}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/60 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p>
            SciTech AI Teacher Training Platform — ระบบพัฒนาศักยภาพครูผู้สอนวิทยาศาสตร์และเทคโนโลยีในยุค AI
          </p>
          <p className="text-[11px] text-slate-600">
            พัฒนาสำหรับครูระดับการศึกษาขั้นพื้นฐาน ตามกรอบ OECD AI Literacy & Educational Technology Leadership
          </p>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <ParticipantSelectorModal
        isOpen={isParticipantModalOpen}
        onClose={() => setIsParticipantModalOpen(false)}
        activeParticipantId={activeParticipantId}
        onParticipantChanged={syncData}
      />

      <LeaderboardDrawer
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        participants={participants}
        activeParticipantId={activeParticipantId}
      />

      <LeadershipSurveyModal
        isOpen={isSurveyOpen}
        onClose={() => setIsSurveyOpen(false)}
        activeParticipant={activeParticipant}
        onSubmitted={syncData}
      />

    </div>
  );
}
