import { Question_Prompt } from '@/services/Constants';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Open AI Integration

export async function POST(req) {

    const {jobPosition , jobDescription , duration , type} = await req.json();

    const FINAL_PROMPT = Question_Prompt
    .replace('{{jobTitle}}' , jobPosition)
    .replace('{{jobDescription}}' , jobDescription) 
    .replace('{{duration}}',duration)
    .replace('{{type}}',type)

    console.log(FINAL_PROMPT);


    try{
        const openai = new OpenAI({
        baseURL: 'https://openrouter.ai/api/v1',
        apiKey: process.env.OPEN_ROUTER_API ,
            });

            const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
            {
                role: 'user',
                content: FINAL_PROMPT,
            },
            ],
        });
        const content = completion.choices[0]?.message?.content || "No response";
        console.log(content);
        return NextResponse.json({content});
    }
    catch(e){
        console.log(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}