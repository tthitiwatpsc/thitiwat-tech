import { Participant, LeadershipSurveyResponses, InnovationProject } from '../types';
import { INITIAL_PARTICIPANTS } from '../data/mockData';

const STORAGE_KEY = 'scitech_ai_workshop_participants';
const ACTIVE_USER_KEY = 'scitech_ai_active_participant_id';

export function getStoredParticipants(): Participant[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PARTICIPANTS));
      return INITIAL_PARTICIPANTS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load participants from localStorage', e);
    return INITIAL_PARTICIPANTS;
  }
}

export function saveParticipants(participants: Participant[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(participants));
    // Dispatch custom event for multi-component reactive sync
    window.dispatchEvent(new Event('scitech_data_updated'));
  } catch (e) {
    console.error('Failed to save participants to localStorage', e);
  }
}

export function getActiveParticipantId(): string {
  return localStorage.getItem(ACTIVE_USER_KEY) || 'p3'; // Default to ครูสมชาย
}

export function setActiveParticipantId(id: string) {
  localStorage.setItem(ACTIVE_USER_KEY, id);
  window.dispatchEvent(new Event('scitech_user_changed'));
}

export function updateParticipantProgress(
  participantId: string,
  update: {
    xpGain?: number;
    badgeId?: string;
    completedMission?: keyof Participant['completedMissions'];
    m1_quiz_score?: number;
    m2_oecd_score?: number;
    m3_tested_prompts_count?: number;
    innovationProject?: InnovationProject;
    surveyResponses?: LeadershipSurveyResponses;
  }
) {
  const participants = getStoredParticipants();
  const index = participants.findIndex(p => p.id === participantId);
  if (index === -1) return;

  const p = participants[index];

  if (update.xpGain) {
    p.xp += update.xpGain;
  }

  if (update.badgeId && !p.badges.includes(update.badgeId)) {
    p.badges.push(update.badgeId);
  }

  if (update.completedMission) {
    p.completedMissions[update.completedMission] = true;
  }

  if (update.m1_quiz_score !== undefined) {
    p.m1_quiz_score = update.m1_quiz_score;
  }

  if (update.m2_oecd_score !== undefined) {
    p.m2_oecd_score = update.m2_oecd_score;
  }

  if (update.m3_tested_prompts_count !== undefined) {
    p.m3_tested_prompts_count = (p.m3_tested_prompts_count || 0) + update.m3_tested_prompts_count;
  }

  if (update.innovationProject) {
    p.innovationProject = update.innovationProject;
  }

  if (update.surveyResponses) {
    p.surveyResponses = update.surveyResponses;
    p.completedMissions.survey_completed = true;
    if (!p.badges.includes('b_survey')) {
      p.badges.push('b_survey');
      p.xp += 100;
    }
  }

  p.lastActive = 'เมื่อสักครู่';
  participants[index] = p;
  saveParticipants(participants);
}

export function resetWorkshopData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PARTICIPANTS));
  window.dispatchEvent(new Event('scitech_data_updated'));
}
