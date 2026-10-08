import { NextResponse } from 'next/server';
import { z } from 'zod';
import { generateTutorResponse } from '@/lib/ai/provider';

const RequestSchema = z.object({
  studentName: z.string().optional(),
  grade: z.number().optional(),
  skillTitle: z.string(),
  skillMastery: z.number(),
  currentQuestionText: z.string().optional(),
  history: z.array(
    z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string(),
    })
  ),
  userPrompt: z.string(),
  quickAction: z.enum(['hint', 'simplify', 'example', 'why']).optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = RequestSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request payload', details: parsed.error.issues },
        { status: 400 }
      );
    }

    const tutorResult = await generateTutorResponse(parsed.data);

    return NextResponse.json(tutorResult);
  } catch (error) {
    console.error('API /api/tutor error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing tutor turn' },
      { status: 500 }
    );
  }
}
