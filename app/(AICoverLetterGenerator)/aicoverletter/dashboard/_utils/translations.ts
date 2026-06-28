export const translations = {
  en: {
    header: {
      title: "HireReady",
      github: "GitHub",
      getStarted: "Get Started",
      howTo: "How to get API Key?"
    },
    hero: {
      title1: "Craft the Perfect",
      title2: "Cover Letter with AI",
      subtitle: "Transform your CV into a professional, tailored cover letter in seconds. Powered by advanced AI to help you land your dream job.",
      cta: "Create Now",
      features: ["ATS Friendly", "Professional Tone", "Instant Download"]
    },
    form: {
      steps: ["Company Details", "Candidate Uploads", "Generated Letter"],
      step1: {
        title: "Application Details",
        subtitle: "Generate your personalized Cover Letter",
        companyPlaceholder: "Target Company (e.g. Google)",
        next: "Next Step",
        companyJobRole : "Enter Job Role (e.g SDE , ML Engineer .. )",
        companyJobDescription : "Paste job description "
      },
      step2: {
        title: "Upload Documents",
        subtitle: "Your CV is required. Supporting docs are optional.",
        cvLabel: "Resume (PDF)*",
        cvPlaceholder: "Upload CV",
        cvSub: "PDF only (Max 5MB)",
        supportLabel: "Supporting Documents (Optional)",
        supportPlaceholder: "Add Certificates / Portfolio",
        supportSub: "PDF or Images (Max 5MB each)",
        back: "Back",
        next: "Next Step"
      },
      step3: {
        title: "Gemini API Key",
        subtitle: "To power the AI generation",
        warning: "Your API key is never stored. It's used only for this session request.",
        placeholder: "Paste your Gemini API Key here",
        customPromptLabel: "Experimental: Custom Instructions (Optional)",
        customPromptPlaceholder: "e.g. 'Focus on my leadership skills' or 'Make it more casual'",
        back: "Back",
        generate: "Generate Letter",
        generating: "Generating...",
        noKey: "Don't have a key?",
        getKey: "Get one from Google AI Studio"
      },
      errors: {
        pdfOnly: "Please upload a PDF file",
        readError: "Failed to read PDF. Please try another file."
      }
    },
    footer: {
      rights: "HireReady AI",
      howTo: "How to get API Key?",
      github: "GitHub"
    },
    preview: {
      title: "Generated Cover Letter",
      copy: "Copy to clipboard",
      download: "Download PDF Bundle",
      merging: "Merging & Saving...",
      createNew: "Create New Letter"
    },
    guide: {
      title: "How to Get a Gemini API Key",
      step1Title: "Visit Google AI Studio",
      step1Desc: "Go to the Google AI Studio website. You'll need to sign in with your Google account.",
      step1Link: "Go to Google AI Studio",
      step2Title: "Create a New API Key",
      step2Desc: "Click on the \"Create API key\" button. You may be asked to create a new project or select an existing one.",
      proTip: "Pro Tip",
      proTipDesc: "Select \"Create API key in new project\" if you don't have an existing Google Cloud project. It's the fastest way.",
      step3Title: "Copy & Use",
      step3Desc: "Once created, your key will be displayed. Copy it and paste it into the \"API Key\" step in our generator form.",
      freeTag: "Free of Charge",
      freeDesc: "Google offers a generous free tier for Gemini API usage, which is more than enough for creating cover letters.",
      cta: "I have my key, let's start!"
    }
  }
};

export type Language = 'en';
