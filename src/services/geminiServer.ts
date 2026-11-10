import { GoogleGenAI, Type } from '@google/genai';

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY || '';
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is missing in process.env');
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

export async function generateGeminiContent(prompt: string, systemInstruction?: string) {
  try {
    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || 'คุณคือผู้ช่วย AI ผู้เชี่ยวชาญด้านการจัดการเรียนรู้วิทยาศาสตร์และเทคโนโลยีระดับมัธยมศึกษา ตอบเป็นภาษาไทยอย่างชัดเจน สร้างสรรค์ และถูกต้องตามหลักวิชาการ',
        temperature: 0.7,
      },
    });

    return { success: true, text: response.text || 'ไม่มีข้อความตอบกลับจากระบบ' };
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return {
      success: false,
      error: error.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ Gemini API',
    };
  }
}

export async function evaluatePromptQuality(promptText: string) {
  try {
    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `กรุณาวิเคราะห์และประเมินคุณภาพของ Prompt ต่อไปนี้สำหรับการนำไปใช้ในการจัดการเรียนรู้วิทยาศาสตร์และเทคโนโลยี:\n\n"${promptText}"`,
      config: {
        systemInstruction: `คุณคือผู้เชี่ยวชาญด้าน Prompt Engineering ทางการศึกษา 
โปรดประเมิน Prompt ใน 5 มิติ:
1. Role (การกำหนดบทบาท)
2. Context (บริบทและระดับชั้น)
3. Task (ภารกิจหรืองานที่ชัดเจน)
4. Format (รูปแบบผลลัพธ์ที่ต้องการ)
5. Constraints (ข้อจำกัดและเกณฑ์)

ตอบกลับเป็น JSON ตามโครงสร้าง:
{
  "score": 0-100 (ตัวเลขคะแนนรวม),
  "strengths": ["จุดเด่นข้อ 1", "จุดเด่นข้อ 2"],
  "improvements": ["ข้อควรปรับปรุง 1", "ข้อควรปรับปรุง 2"],
  "suggestedPrompt": "เวอร์ชัน Prompt ที่ปรับปรุงให้สมบูรณ์แบบและทรงพลังยิ่งขึ้น"
}`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER, description: 'คะแนนคุณภาพ 0 ถึง 100' },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'รายการจุดเด่นของ Prompt',
            },
            improvements: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'รายการข้อควรปรับปรุง',
            },
            suggestedPrompt: {
              type: Type.STRING,
              description: 'Prompt เวอร์ชันปรับปรุงที่สมบูรณ์',
            },
          },
          required: ['score', 'strengths', 'improvements', 'suggestedPrompt'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return { success: true, evaluation: parsed };
  } catch (error: any) {
    console.error('Prompt Evaluation Error:', error);
    return {
      success: false,
      error: error.message || 'เกิดข้อผิดพลาดในการประเมิน Prompt',
    };
  }
}

export async function generateInnovationPlan(params: {
  title: string;
  subject: string;
  targetGrade: string;
  problemStatement: string;
  aiToolsUsed: string[];
}) {
  try {
    const ai = getGeminiClient();
    const prompt = `ช่วยออกแบบแผนนวัตกรรมการจัดการเรียนรู้ AI สำหรับวิชาวิทยาศาสตร์:
ชื่อนวัตกรรม: ${params.title}
วิชา: ${params.subject} ระดับชั้น: ${params.targetGrade}
ปัญหาผู้เรียนที่ต้องการแก้ไข: ${params.problemStatement}
เครื่องมือ AI ที่ใช้: ${params.aiToolsUsed.join(', ')}

กรุณาสร้างแผนนวัตกรรมแบบละเอียดที่นำไปปฏิบัติได้จริงในห้องเรียน`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: `คุณคือศึกษานิเทศก์และนักนวัตกรรมการศึกษาวิทยาศาสตร์ 
โปรดจัดทำโปสเตอร์โครงร่างนวัตกรรมและขั้นตอนกิจกรรมการเรียนรู้แบบละเอียด ได้แก่:
1. วัตถุประสงค์เชิงพฤติกรรม
2. ขั้นตอนการจัดกิจกรรมการเรียนรู้ (นำ-สอน-สรุป)
3. บทบาทของครู บทบาทของนักเรียน และบทบาทของ AI
4. แนวทางการวัดและประเมินผลตามสภาพจริง`,
        temperature: 0.7,
      },
    });

    return { success: true, planText: response.text || '' };
  } catch (error: any) {
    console.error('Innovation Generation Error:', error);
    return { success: false, error: error.message || 'ไม่สามารถเจนเนอเรตแผนนวัตกรรมได้' };
  }
}
