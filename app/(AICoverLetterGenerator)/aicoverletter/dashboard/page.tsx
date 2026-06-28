"use client";

import { useState } from 'react';
import { Header } from './_components/Header';
import { Hero } from './_components/Hero';
import { GeneratorForm } from './_components/GeneratorForm';
import { CoverLetterPreview } from './_components/CoverLetterPreview';
import { Guide } from './_components/Guide';
import { Footer } from './_components/Footer';
import { GoogleGenAI } from '@google/genai';
import { translations ,Language } from './_utils/translations';

function App() {
  const [view, setView] = useState<'hero' | 'form' | 'result' | 'guide'>('hero');
  const currentLang: Language = 'en';
  const [generatedContent, setGeneratedContent] = useState('');
  const [supportingDocs, setSupportingDocs] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = translations[currentLang];

  const generateCoverLetter = async ({ companyName,companyJobRole,companyJobDescription,cvText, language, supportingDocs, customPrompt,skills }: { companyName: string; companyJobRole:string; companyJobDescription:string; cvText: string; language: string; supportingDocs: File[]; customPrompt: string; skills: string }) => {
    setIsLoading(true);
    setError(null);
    setSupportingDocs(supportingDocs);
    const MODELS_TO_TRY = [
      "gemini-2.5-flash",
      "gemini-2.5-flash-001",
      "gemini-2.5-pro",
      "gemini-pro"
    ];
    
    try {
      const ai = new GoogleGenAI({ 
          apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY
       });
      let lastError = null;

      for (const modelName of MODELS_TO_TRY) {
        try {
          console.log(`Attempting generation with model: ${modelName}`);
          
const today = new Date();

const todayStr = today.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

          const prompt = `
            Act as a professional resume writer. I need a ATS Friendly cover letter for a job application to ${companyName}.
            
            Here is my CV content:
            ${cvText}

            Here are my additional skills and description:
            ${skills}
            
            ${customPrompt ? `
            Additional Custom Instructions from User:
            "${customPrompt}"
            (Please prioritize these instructions while maintaining a professional structure.)
            ` : ''}
            
            Requirements:
            1. Professional and engaging tone.
            2. Language: Write the cover letter in ${language}.
            3. Highlight relevant skills from the CV that match a typical role at ${companyName} for ${companyJobRole} role and the job description is : ${companyJobDescription}
            4. Structure: 
               - Header: Include Name, Email, Phone, LinkedIn/Portfolio only if present in CV. **DO NOT include placeholders like [Your Address] or [City, State]. If address is missing, skip it.**
               - Date: ${todayStr}.
               - Salutation: Dear Hiring Manager (or specific name if found).
               - Opening: Strong hook about interest in ${companyName}.
               - Body: aligned with CV skills. Keep paragraphs concise.
               - Closing: Call to action.
               - Sign-off: Sincerely, [Name from CV].
            5. **CRITICAL**: If specific contact details (Address, Phone, Email, etc.) are NOT in the CV, DO NOT invent them and DO NOT use brackets/placeholders like "[Your Address]". Just omit that line entirely.
            6. Do not include markdown formatting like **bold** or *italic* in the output, just plain text suitable for a PDF.
            7. **Strict Length Limit**: Keep it concise (under 300 words) to ensure it fits perfectly on a single page. Avoid lengthy paragraphs.
          `;

          const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
          });

          const text = response.text;
          
          if (!text) {
             throw new Error("Empty response from AI");
          }

          setGeneratedContent(text);
          setView('result');
          return; // Success! Exit the function
        } catch (err: unknown) {
          console.warn(`Failed with model ${modelName}:`, err);
          lastError = err instanceof Error ? err : new Error(String(err));
          // Continue to next model
        }
      }
      
      // If loop finishes without returning, throw the last error
      if (lastError) throw lastError;

    } catch (err: unknown) {
      console.error("AI Generation Error:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to generate cover letter. Please check your API key and try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 px-4">
        {view === 'hero' && (
          <Hero 
            onStart={() => setView('form')} 
            t={t.hero} 
          />
        )}

        {view === 'form' && (
          <div className="max-w-4xl mx-auto pt-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">{t.hero.title1} {t.hero.title2}</h2>
              <p className="text-gray-500 mt-2">{t.form.step1.subtitle}</p>
            </div>
            <GeneratorForm 
              onGenerate={generateCoverLetter} 
              isLoading={isLoading} 
              error={error}
              t={t.form}
            />
          </div>
        )}

        {view === 'result' && (
          <div className="max-w-4xl mx-auto pt-10">
            <CoverLetterPreview 
              content={generatedContent} 
              supportingDocs={supportingDocs}
              onReset={() => {
                setGeneratedContent('');
                setSupportingDocs([]);
                setView('form');
              }}
              t={t.preview}
            />
          </div>
        )}

        {view === 'guide' && (
          <div className="max-w-4xl mx-auto pt-10">
            <Guide onBack={() => setView('hero')} t={t.guide} />
          </div>
        )}
      </main>
      
      <Footer onGuideClick={() => setView('guide')} />
    </div>
  );
}

export default App;
