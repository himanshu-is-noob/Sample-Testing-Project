import { supabase } from '@/services/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { formData, questions, userEmail, interview_id } = body;

    const { error } = await supabase
      .from('Interviews')
      .insert([{
        jobPosition: formData.jobPosition || '',
        jobDescription: formData.jobDescription || '',
        duration: formData.duration || '',
        type: Array.isArray(formData.type) ? formData.type.join(', ') : formData.type || '',
        questionList: questions,
        userEmail: userEmail || 'anonymous',
        interview_id: interview_id,
      }]);

    if (error) throw error;
    return NextResponse.json({ success: true, interview_id });

  } catch (error) {
    console.error('Save interview error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}