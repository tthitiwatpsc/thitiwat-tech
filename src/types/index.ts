export type UserRole = 'admin' | 'participant';

export interface DemographicData {
  gender: 'ชาย' | 'หญิง' | 'อื่นๆ / ไม่ต้องการระบุ';
  age: 'ต่ำกว่า 30 ปี' | '30–40 ปี' | '41–50 ปี' | '51 ปีขึ้นไป';
  education: 'ปริญญาตรี' | 'ปริญญาโท' | 'ปริญญาเอก';
  experience: 'น้อยกว่า 5 ปี' | '5–10 ปี' | '11–20 ปี' | 'มากกว่า 20 ปี';
  schoolSize: 'ขนาดเล็ก' | 'ขนาดกลาง' | 'ขนาดใหญ่' | 'ขนาดใหญ่พิเศษ';
  schoolName: string;
}

export interface LeadershipSurveyResponses {
  // Component 1: ด้านความรู้และทักษะพื้นฐานเกี่ยวกับปัญญาประดิษฐ์
  q1: number; // ท่านประเมินผลลัพธ์และประเมินผลกระทบที่เกิดจากการใช้ปัญญาประดิษฐ์ในการสอน
  q2: number; // ท่านคัดกรองและเลือกข้อมูลที่มีความน่าเชื่อถือจากปัญญาประดิษฐ์ก่อนนำไปใช้
  q3: number; // ท่านสามารถตัดสินใจแก้ปัญหาการใช้ปัญญาประดิษฐ์ในการสอนได้อย่างรวดเร็ว
  q4: number; // ท่านวิเคราะห์แนวโน้มของปัญญาประดิษฐ์ทางการศึกษาเพื่อเตรียมพร้อมรับการเปลี่ยนแปลง

  // Component 2: ด้านการวางแผนและการประเมินผลการใช้ปัญญาประดิษฐ์
  q5: number; // ท่านมีแผนรับมือความเสี่ยงจากการใช้ปัญญาประดิษฐ์
  q6: number; // ท่านดูแลและตรวจสอบระบบปัญญาประดิษฐ์บ่อยครั้ง
  q7: number; // ท่านประสานงานกับผู้เกี่ยวข้องในการพัฒนาการเรียนการสอนด้วยปัญญาประดิษฐ์
  q8: number; // ท่านนำแนวทางปัญญาประดิษฐ์มาใช้ในการจัดการเรียนรู้

  // Component 3: ด้านการประยุกต์ใช้ปัญญาประดิษฐ์ในการเรียนการสอน
  q9: number; // ท่านพัฒนาเครื่องมือประเมินผลการเรียนรู้ที่ใช้ปัญญาประดิษฐ์อย่างเหมาะสม
  q10: number; // ท่านสร้างเครือข่ายความร่วมมือด้านปัญญาประดิษฐ์กับหน่วยงานภายนอก
  q11: number; // ท่านใช้ปัญญาประดิษฐ์ช่วยสอนตามความแตกต่างของผู้เรียน
  q12: number; // ท่านประเมินและปรับปรุงวิธีการใช้ปัญญาประดิษฐ์ในการสอน

  // Component 4: ด้านจริยธรรมและความรับผิดชอบในการใช้ปัญญาประดิษฐ์
  q13: number; // ท่านใช้ปัญญาประดิษฐ์ในการสอนโดยคำนึงถึงผลกระทบต่อผู้เรียน
  q14: number; // ท่านเปิดโอกาสให้นักเรียนและเพื่อนครูแสดงความคิดเห็นเกี่ยวกับการใช้ปัญญาประดิษฐ์
  q15: number; // ท่านส่งเสริมให้นักเรียนใช้ปัญญาประดิษฐ์ในการเรียนรู้ด้วยตนเอง
  q16: number; // ท่านให้ผู้เรียนสะท้อนผลการเรียนรู้หลังเรียนเนื้อหาจบ
}

export interface InnovationProject {
  id: string;
  title: string;
  subject: string; // e.g., ฟิสิกส์, เคมี, ชีววิทยา, วิทยาการคำนวณ
  targetGrade: string; // e.g., ม.1, ม.4
  problemStatement: string;
  aiToolsUsed: string[];
  description: string;
  expectedOutcome: string;
  submittedAt: string;
  score?: number; // Score given by Admin (0-100)
  feedback?: string; // Feedback from Admin
  status: 'draft' | 'submitted' | 'graded';
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  avatar: string;
  demographics: DemographicData;
  xp: number;
  badges: string[];
  completedMissions: {
    m1_device_inspector: boolean;
    m2_oecd_literacy: boolean;
    m3_prompt_engineering: boolean;
    m4_innovation_design: boolean;
    survey_completed: boolean;
  };
  m1_quiz_score?: number;
  m2_oecd_score?: number;
  m3_tested_prompts_count?: number;
  innovationProject?: InnovationProject;
  surveyResponses?: LeadershipSurveyResponses;
  lastActive: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'm1' | 'm2' | 'm3' | 'm4' | 'survey' | 'special';
}

export interface DeviceInspectorItem {
  id: string;
  name: string;
  category: 'ห้องแล็ป' | 'อุปกรณ์ในโรงเรียน' | 'เครื่องมือสำรวจธรรมชาติ' | 'สมาร์ทดีไวซ์';
  icon: string;
  image: string;
  description: string;
  know: string; // รู้ - ข้อมูลและเซนเซอร์
  think: string; // คิด - การประมวลผลของ AI
  act: string; // ปฏิบัติ - การตัดสินใจหรือแสดงผล
  scienceApplication: string; // การประยุกต์ใช้ในชั้นเรียนวิทยาศาสตร์
}

export interface OECDScenarioItem {
  id: string;
  pillar: '1. รู้จักกลไก AI' | '2. การใช้งานปฏิสัมพันธ์' | '3. การประเมินและคัดกรอง' | '4. จริยธรรมและความรับผิดชอบ';
  scenario: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}
