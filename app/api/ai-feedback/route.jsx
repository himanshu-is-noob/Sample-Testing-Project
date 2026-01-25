// import { FEEDBACK_PROMPT } from "@/services/Constants";
// import { OpenAI } from "openai/client.js";

// export async function POST(req){
//     const {conversation} = await req.json();
//     const FINAL_PROMPT = FEEDBACK_PROMPT.replace('{{conversation}}',JSON.stringify(conversation))

//     try{
//             const openai = new OpenAI({
//             baseURL: 'https://openrouter.ai/api/v1',
//             apiKey: process.env.OPEN_ROUTER_API ,
//                 });
    
//                 const completion = await openai.chat.completions.create({
//                 model: 'gpt-4o-mini',
//                 messages: [
//                 {
//                     role: 'user',
//                     content: FINAL_PROMPT,
//                 },
//                 ],
//             });
//             const content = completion.choices[0]?.message?.content || "No response";
//             console.log(content);
//             return NextResponse.json({content});
//         }
//         catch(e){
//             console.log(e);
//             return NextResponse.json({ error: e.message }, { status: 500 });
//         }
// }


import { FEEDBACK_PROMPT } from "@/services/Constants";
import { OpenAI } from "openai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { conversation } = await req.json();
    
    // Validate input
    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation data is required" },
        { status: 400 }
      );
    }

    const FINAL_PROMPT = FEEDBACK_PROMPT.replace('{{conversation}}', JSON.stringify(conversation));

    // Validate API key
    if (!process.env.OPEN_ROUTER_API) {
      console.error("OPEN_ROUTER_API environment variable is not set");
      return NextResponse.json(
        { error: "API configuration error" },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPEN_ROUTER_API,
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: FINAL_PROMPT,
        },
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content || "No response";
    console.log("AI Feedback generated successfully");
    
    return NextResponse.json({ content });

  } catch (error) {
    console.error("Error in AI feedback API:", error);
    
    let errorMessage = "Failed to generate feedback";
    let statusCode = 500;

    if (error.name === 'SyntaxError') {
      errorMessage = "Invalid JSON in request";
      statusCode = 400;
    } else if (error.code === 'invalid_api_key') {
      errorMessage = "Invalid API key";
      statusCode = 401;
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: statusCode }
    );
  }
}