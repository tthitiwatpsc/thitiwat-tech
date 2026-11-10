import { DeviceInspectorItem, OECDScenarioItem, Participant, Badge } from '../types';

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'b_m1',
    name: 'นักสำรวจ AI รอบตัว',
    description: 'จำแนกหลักการ รู้ คิด ปฏิบัติ จากอุปกรณ์รอบตัวได้ครบถ้วน',
    icon: 'Search',
    category: 'm1'
  },
  {
    id: 'b_m2',
    name: 'ผู้เชี่ยวชาญ OECD AI Literacy',
    description: 'ผ่านการทดสอบสถานการณ์การใช้ AI อย่างมีวิจารณญาณตามกรอบ OECD',
    icon: 'ShieldCheck',
    category: 'm2'
  },
  {
    id: 'b_m3',
    name: 'Prompt Engineering Master',
    description: 'สร้างสรรค์และทดสอบ Prompt ระดับสูงสำหรับการจัดการเรียนรู้วิทยาศาสตร์',
    icon: 'Sparkles',
    category: 'm3'
  },
  {
    id: 'b_m4',
    name: 'นวัตกรห้องเรียนวิทยาศาสตร์',
    description: 'ออกแบบนวัตกรรม AI สำหรับประยุกต์ใช้ในห้องเรียนจริงพร้อมแผนการสอน',
    icon: 'Lightbulb',
    category: 'm4'
  },
  {
    id: 'b_survey',
    name: 'ผู้นำเทคโนโลยีปัญญาประดิษฐ์',
    description: 'ประเมินตนเองตามแบบวัดภาวะผู้นำทางเทคโนโลยีการศึกษาในยุค AI',
    icon: 'Award',
    category: 'survey'
  }
];

export const INITIAL_PARTICIPANTS: Participant[] = [
  {
    id: 'p1',
    name: 'ดร.วิภา สุวรรณรัตน์',
    email: 'wipha@school.ac.th',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    demographics: {
      gender: 'หญิง',
      age: '30–40 ปี',
      education: 'ปริญญาเอก',
      experience: '11–20 ปี',
      schoolSize: 'ขนาดใหญ่พิเศษ',
      schoolName: 'โรงเรียนสาธิตวิทยาศาสตร์มัธยม'
    },
    xp: 850,
    badges: ['b_m1', 'b_m2', 'b_m3', 'b_m4', 'b_survey'],
    completedMissions: {
      m1_device_inspector: true,
      m2_oecd_literacy: true,
      m3_prompt_engineering: true,
      m4_innovation_design: true,
      survey_completed: true
    },
    m1_quiz_score: 100,
    m2_oecd_score: 90,
    m3_tested_prompts_count: 8,
    innovationProject: {
      id: 'inv_p1',
      title: 'ผู้ช่วย AI จำลองแล็ปเคมีเสมือนจริงและการวิเคราะห์ปฏิกิริยา',
      subject: 'เคมี',
      targetGrade: 'ม.5',
      problemStatement: 'นักเรียนมองไม่เห็นภาพการเคลื่อนที่ของโมเลกุลในปฏิกิริยารีดอกซ์ และการทดลองสารเคมีอันตรายทำได้จำกัด',
      aiToolsUsed: ['Gemini Visual Prompting', 'AI Molecular Simulation', 'Socratic Chatbot'],
      description: 'ใช้ Gemini ช่วยสร้างภาพจำลองระดับโมเลกุล พร้อมตั้งโจทย์คำถามสocratic นำทางให้นักเรียนทำความเข้าใจกระบวนการถ่ายโอนอิเล็กตรอนด้วยตนเอง',
      expectedOutcome: 'นักเรียนมีความเข้าใจมโนทัศน์เรื่องรีดอกซ์เพิ่มขึ้น 35% และลดความเสี่ยงอุบัติเหตุในห้องแล็ป',
      submittedAt: '2026-07-30T08:30:00Z',
      score: 95,
      feedback: 'ดีเยี่ยม! แนวคิดชัดเจน นำไปใช้ในห้องเรียนวิทยาศาสตร์มัธยมปลายได้จริงและปลอดภัย',
      status: 'graded'
    },
    surveyResponses: {
      q1: 5, q2: 5, q3: 4, q4: 5,
      q5: 4, q6: 5, q7: 4, q8: 5,
      q9: 5, q10: 4, q11: 5, q12: 5,
      q13: 5, q14: 5, q15: 4, q16: 5
    },
    lastActive: '10 นาทีที่แล้ว'
  },
  {
    id: 'p2',
    name: 'ครูธนกฤต ใจดี',
    email: 'thanakrit@school.ac.th',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    demographics: {
      gender: 'ชาย',
      age: '30–40 ปี',
      education: 'ปริญญาโท',
      experience: '5–10 ปี',
      schoolSize: 'ขนาดใหญ่',
      schoolName: 'โรงเรียนเตรียมวิทยาพัฒน์'
    },
    xp: 680,
    badges: ['b_m1', 'b_m2', 'b_m3', 'b_survey'],
    completedMissions: {
      m1_device_inspector: true,
      m2_oecd_literacy: true,
      m3_prompt_engineering: true,
      m4_innovation_design: false,
      survey_completed: true
    },
    m1_quiz_score: 90,
    m2_oecd_score: 85,
    m3_tested_prompts_count: 5,
    surveyResponses: {
      q1: 4, q2: 4, q3: 4, q4: 4,
      q5: 3, q6: 4, q7: 4, q8: 4,
      q9: 4, q10: 3, q11: 4, q12: 4,
      q13: 4, q14: 4, q15: 4, q16: 4
    },
    lastActive: '25 นาทีที่แล้ว'
  },
  {
    id: 'p3',
    name: 'ครูสมชาย ศรีสุข (คุณ)',
    email: 'somchai@school.ac.th',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    demographics: {
      gender: 'ชาย',
      age: '41–50 ปี',
      education: 'ปริญญาตรี',
      experience: '11–20 ปี',
      schoolSize: 'ขนาดกลาง',
      schoolName: 'โรงเรียนสิรินธรวิทยานุสรณ์'
    },
    xp: 450,
    badges: ['b_m1', 'b_m2'],
    completedMissions: {
      m1_device_inspector: true,
      m2_oecd_literacy: true,
      m3_prompt_engineering: false,
      m4_innovation_design: false,
      survey_completed: false
    },
    m1_quiz_score: 80,
    m2_oecd_score: 80,
    m3_tested_prompts_count: 2,
    lastActive: 'กำลังใช้งาน'
  },
  {
    id: 'p4',
    name: 'ครูภัทรา วงศ์สว่าง',
    email: 'phattra@school.ac.th',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    demographics: {
      gender: 'หญิง',
      age: 'ต่ำกว่า 30 ปี',
      education: 'ปริญญาโท',
      experience: 'น้อยกว่า 5 ปี',
      schoolSize: 'ขนาดเล็ก',
      schoolName: 'โรงเรียนบ้านหนองประดู่'
    },
    xp: 520,
    badges: ['b_m1', 'b_m2', 'b_m3'],
    completedMissions: {
      m1_device_inspector: true,
      m2_oecd_literacy: true,
      m3_prompt_engineering: true,
      m4_innovation_design: false,
      survey_completed: false
    },
    m1_quiz_score: 100,
    m2_oecd_score: 75,
    m3_tested_prompts_count: 6,
    lastActive: '1 ชั่วโมงที่แล้ว'
  }
];

export const DEVICE_INSPECTOR_ITEMS: DeviceInspectorItem[] = [
  {
    id: 'dev_1',
    name: 'กล้องกล้องจุลทรรศน์ตรวจจับเซลล์อัตโนมัติ (AI Smart Microscope)',
    category: 'ห้องแล็ป',
    icon: 'Microscope',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&auto=format&fit=crop&q=80',
    description: 'กล้องจุลทรรศน์ในห้องปฏิบัตการชีววิทยาที่ติดตั้งกล้องดิจิทัลและ AI ช่วยนับจำนวนและแยกชนิดเซลล์',
    know: 'กล้อง CCD จับภาพกำลังขยายสูง แปลงภาพสไลด์พืช/สัตว์เป็นข้อมูลพิกเซลสี RGB',
    think: 'AI ใช้โครงข่ายประสาทเทียม (CNN) ตรวจหาขอบเขตของนิวเคลียสและผนังเซลล์ เพื่อจำแนกประเภทระยะการแบ่งเซลล์ (Mitosis)',
    act: 'แสดงผลจำนวนเซลล์บนจอภาพ ไฮไลต์เซลล์ที่อยู่ในระยะ Prophase/Metaphase พร้อมค่าความเชื่อมั่นเป็น %',
    scienceApplication: 'ครูใช้นำเข้าสู่บทเรียนเรื่องการแบ่งเซลล์ ให้นักเรียนเปรียบเทียบผลการนับด้วยสายตากับ AI เพื่อฝึกทักษะการสังเกตและประเมินความแม่นยำ'
  },
  {
    id: 'dev_2',
    name: 'ชุดเซนเซอร์สมาร์ทฟาร์มและพาดหัวอากาศ (IoT Climate Sensor)',
    category: 'เครื่องมือสำรวจธรรมชาติ',
    icon: 'Sun',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=500&auto=format&fit=crop&q=80',
    description: 'อุปกรณ์วัดอุณหภูมิ ความชื้น แสง และแก๊ส CO2 ในแปลงทดลองพืชโรงเรียน',
    know: 'เซนเซอร์รับค่าฟิสิกส์และเคมี (ความดัน, ความชื้นสัมพัทธ์, ความเข้มแสง lux)',
    think: 'AI แบบ Time-Series Regression วิเคราะห์แนวโน้มสภาพอากาศเทียบกับอัตราการสังเคราะห์ด้วยแสงของพืช',
    act: 'สั่งเปิด-ปิดระบบรดน้ำพ่นหมอกอัตโนมัติ และแจ้งเตือนล่วงหน้าเมื่อความชื้นต่ำเกินเกณฑ์',
    scienceApplication: 'ใช้ในวิชาวิทยาศาสตร์สิ่งแวดล้อม ให้นักเรียนวิเคราะห์ความสัมพันธ์ระหว่างปัจจัยทางกายภาพและการเจริญเติบโตของพืช'
  },
  {
    id: 'dev_3',
    name: 'เครื่องวัดสัญญาณคลื่นไฟฟ้าหัวใจและชีพจร wearable',
    category: 'สมาร์ทดีไวซ์',
    icon: 'Activity',
    image: 'https://images.unsplash.com/photo-1510519138161-584409383638?w=500&auto=format&fit=crop&q=80',
    description: 'สายรัดข้อมือหรือเครื่องตรวจวัดการทำงานของระบบหมุนเวียนเลือดขณะออกกำลังกาย',
    know: 'เซนเซอร์ PPG แสงอินฟราเรดตรวจจับการเปลี่ยนแปลงปริมาตรเลือดในหลอดเลือดฝอย',
    think: 'AI ค้นหารูปแบบกราฟ ECG (P-QRS-T wave) เพื่อตรวจจับภาวะหัวใจเต้นผิดจังหวะหรือความเค้น (Stress level)',
    act: 'สั่นเตือนผู้สวมใส่ แจ้งอัตราการเต้นหัวใจเข้าเป้าหมาย (Heart Rate Zone) และบันทึกสถิติ',
    scienceApplication: 'ใช้อธิบายเรื่องระบบร่างกายมนุษย์และการตอบสนองต่อสิ่งกระตุ้นในวิชาชีววิทยา ม.ปลาย'
  },
  {
    id: 'dev_4',
    name: 'สมาร์ทโฟนระบบสแกนใบหน้าและความจำเสียง (Voice & Face ID)',
    category: 'อุปกรณ์ในโรงเรียน',
    icon: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80',
    description: 'โทรศัพท์มือถือหรือแท็บเล็ตที่ใช้ในการลงชื่อเข้าเรียนและปลดล็อกเครื่องด้วย AI',
    know: 'กล้อง TrueDepth ยิงจุดแสงอินฟราเรด 30,000 จุดสร้างแบบจำลอง 3 มิติของใบหน้า และไมโครโฟนรับคลื่นเสียง',
    think: 'AI เวกเตอร์เปรียบเทียบโครงสร้างมิติใบหน้าและความถี่เสียงกับฐานข้อมูลเดิมเพื่อยืนยันตัวตน',
    act: 'อนุมัติการเข้าถึงเครื่องทันทีภายใน 0.1 วินาที แม้ผู้ใช้จะใส่แว่นหรืออยู่ในที่มืด',
    scienceApplication: 'นำไปใช้อธิบายเรื่องคลื่นเสียง คลื่นแม่เหล็กไฟฟ้า (อินฟราเรด) และอัลกอริทึมการระบุตัวตนทางชีวภาพ (Biometrics)'
  }
];

export const OECD_SCENARIOS: OECDScenarioItem[] = [
  {
    id: 'oecd_1',
    pillar: '1. รู้จักกลไก AI',
    scenario: 'ครูให้นักเรียนใช้ AI ในการหาคำตอบเกี่ยวกับ "กลไกการเกิดปฏิกิริยานิวเคลียร์ฟิวชัน" แต่นักเรียนเข้าใจว่า AI มีความรู้ความเข้าใจเหมือนมนุษย์จริงๆ ครูควรแนะแนวอย่างไรตามกรอบ OECD?',
    options: [
      {
        text: 'อธิบายว่า AI คำนวณความน่าจะเป็นของคำถัดไป (Probabilistic Token Prediction) จากชุดข้อมูลมหาศาล ไม่ได้มีความคิดหรือความเข้าใจจริง',
        isCorrect: true,
        explanation: 'ถูกต้อง! การเข้าใจกลไกพื้นฐานของ LLM ช่วยให้ผู้เรียนตระหนักว่า AI เป็นโมเดลทางสถิติและการประมวลผลภาษา ไม่ใช่สิ่งมีชีวิตที่มีจิตสำนึก'
      },
      {
        text: 'บอกนักเรียนว่า AI มีสมองกลขนาดใหญ่ที่บันทึกความรู้ทั้งหมดในจักรวาลไว้แบบ 100%',
        isCorrect: false,
        explanation: 'ไม่ถูกต้อง AI ไม่ได้มีความเข้าใจหรือเก็บข้อมูลความรู้แบบมนุษย์ แต่ใช้การคำนวณแพตเทิร์นภาษา'
      },
      {
        text: 'ห้ามไม่ให้นักเรียนใช้ AI ในวิชาวิทยาศาสตร์เลยเพราะ AI เชื่องมงายไม่ได้',
        isCorrect: false,
        explanation: 'ไม่ถูกต้อง กรอบ OECD ส่งเสริมให้สร้างความรู้เท่าทัน (Literacy) ไม่ใช่การต่อต้านการใช้เทคโนโลยี'
      }
    ]
  },
  {
    id: 'oecd_2',
    pillar: '3. การประเมินและคัดกรอง',
    scenario: 'นักเรียนใช้ AI เจนเนอเรตรายงานวิจัยเรื่อง "ผลของพลาสติกชีวภาพต่อการเจริญเติบโตของพืช" แล้วพบว่า AI อ้างอิงชื่อบทความวิชาการพร้อมชื่อผู้แต่งที่ไม่เคยมีอยู่จริง (AI Hallucination) ครูควรสอนทักษะใด?',
    options: [
      {
        text: 'ฝึกทักษะการตรวจสอบย้อนกลับ (Fact-checking & Cross-referencing) กับฐานข้อมูลวิชาการจริง เช่น Google Scholar หรือ Scopus',
        isCorrect: true,
        explanation: 'ถูกต้อง! ทักษะการประเมินและคัดกรองความน่าเชื่อถือเป็นหัวใจสำคัญของ AI Literacy ในการเรียนการสอนวิทยาศาสตร์'
      },
      {
        text: 'ให้สืบค้นเฉพาะข้อมูลภาษาไทยเท่านั้นเพราะ AI จะไม่หลอนในภาษาไทย',
        isCorrect: false,
        explanation: 'ไม่ถูกต้อง AI สามารถเกิดอาการ hallucination ได้ในทุกภาษา'
      },
      {
        text: 'เชื่อข้อมูลของ AI ทันทีถ้า AI ตอบมาด้วยภาษาที่สละสลวยและมีตัวเลขสถิติประกอบ',
        isCorrect: false,
        explanation: 'ไม่ถูกต้อง ความสละสลวยของภาษาไม่ได้การันตีความถูกต้องทางวิทยาศาสตร์'
      }
    ]
  },
  {
    id: 'oecd_3',
    pillar: '4. จริยธรรมและความรับผิดชอบ',
    scenario: 'ในการทำโครงงานวิทยาศาสตร์ ครูพบว่ามีนักเรียนคัดลอกบทความที่ AI เจนเนอเรตทั้งหมดมาส่งเป็นรายงานโครงงานโดยไม่ลงชื่ออ้างอิง AI หรือปรับปรุงด้วยตนเอง',
    options: [
      {
        text: 'สอนเรื่องความซื่อสัตย์ทางวิชาการ (Academic Integrity) และกำหนดแนวทางการระบุการใช้ AI (AI Attribution) พร้อมให้สะท้อนความคิดตนเอง',
        isCorrect: true,
        explanation: 'ถูกต้อง! OECD เน้นการใช้ AI อย่างรับผิดชอบ โปร่งใส และเปิดเผยบทบาทของ AI ในงานสร้างสรรค์'
      },
      {
        text: 'ให้คะแนนเต็มทันทีเพราะเนื้อหาที่ AI เจนเนอเรตถูกต้องสมบูรณ์แบบ',
        isCorrect: false,
        explanation: 'ไม่ถูกต้อง ขัดต่อหลักจริยธรรมและการประเมินสมรรถนะที่แท้จริงของผู้เรียน'
      },
      {
        text: 'ปรับตกและไล่ออกจากวิชาโดยไม่ให้โอกาสอธิบายหรือเรียนรู้แนวทางที่ถูกต้อง',
        isCorrect: false,
        explanation: 'การลงโทษรุนแรงโดยไม่อบรมการใช้ AI อย่างถูกต้องไม่ได้ช่วยสร้างทักษะ AI Literacy ในระยะยาว'
      }
    ]
  }
];

export const PROMPT_SCIENCE_TEMPLATES = [
  {
    id: 'tmpl_1',
    title: 'แผนการจัดการเรียนรู้ 5E วิชาฟิสิกส์/เคมี/ชีววิทยา',
    category: 'แผนการสอน',
    promptText: `คุณคือครูผู้เชี่ยวชาญด้านการจัดการเรียนรู้วิทยาศาสตร์ระดับมัธยมศึกษา
โปรดออกแบบแผนการจัดการเรียนรู้ตามรูปแบบ 5E (Engage, Explore, Explain, Elaborate, Evaluate) 
เรื่อง: [ระบุหัวข้อ เช่น การสังเคราะห์ด้วยแสง / กฎของโอห์ม / แรงมวลและกฎการเคลื่อนที่]
ระดับชั้น: [ระบุชั้น เช่น ม.4]
เวลา: 2 คาบ (100 นาที)

เงื่อนไข:
1. แทรกกิจกรรมการทดลองที่ใช้อุปกรณ์หาง่ายในท้องถิ่น
2. มีคำถามกระตุ้นความคิดขั้นสูง (HOTS) ในช่วง Engage และ Explain
3. มีเกณฑ์การประเมินชิ้นงาน/ทักษะกระบวนการวิทยาศาสตร์แบบ Rubric Score`
  },
  {
    id: 'tmpl_2',
    title: 'โจทย์ปัญหาคิดวิเคราะห์พร้อมสถานการณ์ STEM',
    category: 'แบบฝึกหัด/ข้อสอบ',
    promptText: `คุณคือผู้ออกข้อสอบวัดสมรรถนะวิทยาศาสตร์ตามแนวทาง PISA
โปรดสร้างสถานการณ์ปัญหา (Scenario) ทางวิทยาศาสตร์เทคโนโลยีในชีวิตประจำวัน 1 เรื่อง เกี่ยวกับ: [ระบุหัวข้อ เช่น ขยะพลาสติกในชุมชน / สานพลังงานโซลาร์เซลล์]
สำหรับนักเรียนชั้น: [ม.3]

พร้อมคำถาม 3 ข้อ:
ข้อ 1: วัดความรู้ความเข้าใจมโนทัศน์วิทยาศาสตร์ (Multiple Choice)
ข้อ 2: วัดทักษะการตีความข้อมูลและพยานหลักฐานทางวิทยาศาสตร์ (Short Answer)
ข้อ 3: วัดการออกแบบการทดลองเพื่อแก้ปัญหา (Open-ended)

โปรดเฉลยรายละเอียดพร้อมเหตุผลทางวิทยาศาสตร์อย่างครบถ้วน`
  },
  {
    id: 'tmpl_3',
    title: 'ตัวช่วยสร้างคำถามสocratic นำทางแล็ปวิทยาศาสตร์',
    category: 'การตั้งคำถามในห้องเรียน',
    promptText: `คุณคือผู้ช่วยครูสอนปฏิบัติการวิทยาศาสตร์
ช่วยคิดชุดคำถามปลายเปิดแบบสocratic (Socratic Questioning) จำนวน 5 ข้อ สำหรับใช้ถามนักเรียนในระหว่างทำแล็ปเรื่อง: [การแยกสารด้วยโครมาโทกราฟี]

เป้าหมายคำถาม:
- ไม่บอกคำตอบตรงๆ แต่นำทางให้นักเรียนสังเกตการเปลี่ยนแปลง
- เชื่อมโยงผลการทดลองกับทฤษฎีทางวิทยาศาสตร์
- ให้นักเรียนเสนอแนวทางการปรับปรุงชุดทดลองเอง`
  }
];
