import { Loader2, Loader2Icon } from 'lucide-react';
import React, { useEffect } from 'react'
import { toast } from 'sonner';
import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import QuestionListContainer from './QuestionListContainer';
import { useUser } from '@/app/provider';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/services/supabaseClient';

function QuestionList({formData , onCreateLink}) {

  const [loading,setLoading] = useState(false);
  const [questions, setQuestions] = useState(null);
  const {user} = useUser();
  const [saveLoading , setSaveLoading] = useState(false);
  const [supabaseStatus, setSupabaseStatus] = useState('checking');

  useEffect(() => {
     let isMounted = true;
  
    if(formData && isMounted){ 
      GenerateQuestionList();
    }

    return () => {
      isMounted = false;
    };
  },[formData]);

  // Test connection on mount - ENHANCED
  useEffect(() => {
    const testConnection = async () => {
      console.log("🔌 Testing Supabase connection...");
      console.log("🔌 Supabase URL:", supabase?.supabaseUrl);
      console.log("🔌 Has key:", !!supabase?.supabaseKey);
      
      try {
        // Try a simple SELECT with short timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const { data, error } = await supabase
          .from('Interviews')
          .select('interview_id')
          .limit(1)
          .abortSignal(controller.signal);
        
        clearTimeout(timeoutId);
        
        if (error) {
          console.error('❌ Supabase SELECT failed:', error);
          console.error('❌ Error details:', JSON.stringify(error, null, 2));
          setSupabaseStatus('failed');
          toast.error('Supabase connection failed: ' + error.message);
        } else {
          console.log('✅ Supabase connected successfully');
          console.log('✅ Sample data:', data);
          setSupabaseStatus('connected');
        }
      } catch (err) {
        console.error('❌ Supabase error:', err);
        console.error('❌ Error name:', err.name);
        console.error('❌ Error message:', err.message);
        setSupabaseStatus('error');
        
        if (err.name === 'AbortError') {
          toast.error('⏱️ Supabase timeout - project might be paused');
        }
      }
    };
    testConnection();
  }, []);

  const GenerateQuestionList = async() => {
    setLoading(true);
    try {
      const result = await axios.post('/api/ai-model', {
        ...formData
      });
      
      toast('Successfully Generated');
      const Content = result.data.content;
      const FINAL_CONTENT = Content.replace(/```json/g, '').replace(/```/g, '');
      const parsed = JSON.parse(FINAL_CONTENT);
      setQuestions(parsed?.interviewQuestions);

    } catch(e) {
      console.error("Generation error:", e);
      toast('Unable to Generate Interview! Server Error');
    } finally {
      setLoading(false);
    }
  }

  const onFinish = async () => {
  console.log("🔵 onFinish called");
  console.log("🔵 Supabase status:", supabaseStatus);
  
  if (supabaseStatus !== 'connected') {
    toast.error('⚠️ Supabase not connected!');
    return;
  }
  
  if (!questions || questions.length === 0) {
    toast('No questions to save!');
    return;
  }

  if (saveLoading) return;

  setSaveLoading(true);
  const interview_id = uuidv4();
  
  try {
    const insertData = {
      jobPosition: formData.jobPosition || '',
      jobDescription: formData.jobDescription || '',
      duration: formData.duration || '',
      type: Array.isArray(formData.type) ? formData.type.join(', ') : formData.type || '',
      questionList: questions,
      userEmail: user?.email || 'anonymous',
      interview_id: interview_id,
    };
    
    console.log("💾 Inserting data:", insertData);
    
    // Remove .select() to see if that's the issue
    const { data, error } = await supabase
      .from('Interviews')
      .insert([insertData]);

    console.log("📤 Response:", { data, error });

    if (error) {
      console.error("❌ Insert error:", error);
      console.error("❌ Error code:", error.code);
      console.error("❌ Error details:", error.details);
      console.error("❌ Error hint:", error.hint);
      toast.error('Failed: ' + error.message);
      return;
    }

    console.log("✅ Success!");
    toast.success('Saved!');

    if (onCreateLink) {
      onCreateLink(interview_id);
    }

  } catch (error) {
    console.error("❌ Error:", error);
    toast.error(`Error: ${error.message}`);
  } finally {
    setSaveLoading(false);
  }
};

  return (
    <div>
      <div className='font-bold text-lg mt-3'>Generated Interview Questions</div>

      {/* Supabase Status Indicator */}
      <div className={`text-xs p-2 rounded mb-2 ${
        supabaseStatus === 'connected' ? 'bg-green-100 text-green-700' :
        supabaseStatus === 'failed' ? 'bg-red-100 text-red-700' :
        supabaseStatus === 'error' ? 'bg-red-100 text-red-700' :
        'bg-yellow-100 text-yellow-700'
      }`}>
        Supabase: {supabaseStatus === 'connected' ? '✅ Connected' : 
                   supabaseStatus === 'checking' ? '⏳ Checking...' :
                   '❌ Not Connected - Check Console'}
      </div>

      <div>
        {loading && (
          <div className='p-5 rounded-xl border border-gray-100 bg-blue-50 flex gap-5 items-center mt-4'>
            <Loader2Icon className='animate-spin'/>
            <div>
              <h2 className='font-medium'>Generating Interview...</h2>
              <p className='text-primary'>Our AI is crafting personalized Questions</p>
            </div>  
          </div>
        )}

        <div>
          <QuestionListContainer questions={questions}/>
        </div>

        {!loading && questions && questions.length > 0 && (
          <div className='flex justify-end mt-3'>
            <Button onClick={onFinish} disabled={saveLoading || supabaseStatus !== 'connected'}>
              {saveLoading && <Loader2 className='animate-spin mr-2'/>}
              {saveLoading ? 'Saving...' : 'Finish'}
            </Button> 
          </div>
        )}   
      </div>
    </div>
  )
}

export default QuestionList




// import { Loader2, Loader2Icon } from 'lucide-react';
// import React, { useEffect } from 'react'
// import { toast } from 'sonner';
// import { useState } from 'react';
// import axios from 'axios';
// import { Button } from '@/components/ui/button';
// import QuestionListContainer from './QuestionListContainer';
// import { useUser } from '@/app/provider';
// import { v4 as uuidv4 } from 'uuid';
// import { supabase } from '@/services/supabaseClient';

// function QuestionList({formData , onCreateLink}) {

//   const [loading,setLoading] = useState(false);
//   const [questions, setQuestions] = useState(null);

//   const {user} = useUser();
//   // const [interview_id] = useState(uuidv4());
//   const [saveLoading , setSaveLoading] = useState(false);


//   useEffect(() => {
//      let isMounted = true;
  
//     if(formData && isMounted){ 
//       GenerateQuestionList();
//     }

//     return () => {
//       isMounted = false;
//     };
//   },[formData]);

//   useEffect(() => {
//   const testConnection = async () => {
//     const { data, error } = await supabase.from('Interviews').select('*').limit(1);
//     if (error) console.error('Supabase connection failed:', error);
//     else console.log('✅ Supabase connected:', data);
//   };
//   testConnection();
// }, []);

//   // AI Model Integration 
//   const GenerateQuestionList = async() => {
//       setLoading(true);
//       try{
//       const result = await axios.post('/api/ai-model' , {
//         ...formData
//       })
//       toast('Successfully Generated');
//       console.log("🔍 API Response:", result.data.content);
//       const Content = result.data.content ;
//       const FINAL_CONTENT = Content.replace('```json' , '').replace('```' , '') ;
//       const parsed = JSON.parse(FINAL_CONTENT);
//       setQuestions(parsed?.interviewQuestions);

//       setLoading(false);
//     }
//     catch(e){
//       toast('Unable to Generate Interview ! , Server Error');
//       setLoading(false);
//     }

//   }

//   // const onFinish = async() => {
//   //   if(!questions || questions.length === 0) {
//   //     toast('No questions to save!');
//   //     return;
//   //   }
//   //     const { data, error } = await supabase
//   //     .from('Interviews')
//   //     .insert([
//   //       {
//   //         ...formData,
//   //         questionList: questions,
//   //         userEmail: user?.email,
//   //         interview_id: interview_id,
//   //       },
//   //     ])
//   //     .select();

//   //   if(error) {
//   //     console.error("Supabase Insert Error:", error);
//   //     toast('Failed to save interview!');
//   //   } else {
//   //     console.log("Insert successful:", data);
//   //     toast('Interview saved successfully!');
//   //   }
//   // }

//   const onFinish = async () => {
//     if (!questions || questions.length === 0) {
//       toast('No questions to save!');
//       return;
//     }

    
//     const interview_id = uuidv4();
    
//     try {
//       // Debug logging
//       console.log("Form Data:", formData);
//       console.log("Questions:", questions);
//       console.log("User Email:", user?.email);
//       setSaveLoading(true);
//       const insertData = {
//         ...formData,
//         questionList: questions,
//         userEmail: user?.email || 'anonymous',
//         interview_id: interview_id,
//       };
      
//       console.log("Saving data:", insertData);
      
//       // Running till here 
//       const { data, error } = await supabase
//         .from('Interviews')
//         .insert([insertData])
//         .select();

//       console.log("✅ Insert Success:", data);
//       toast('Interview saved successfully!');

//       setTimeout(() => {
//         onCreateLink(interview_id);
//       }, 200);
//       setSaveLoading(false);

//     } catch (error) {
//       console.error("Supabase Insert Error:", error);
//       toast(`Failed to save interview: ${error.message}`);
//     } finally {
//       setSaveLoading(false);
//     }
//   };

  



//   return (
//     <div>
//         {/*Loading Screen while generating content*/}
//         <div className='font-bold text-lg mt-3'>Generated Interview Questions</div>

//         <div>
//         {loading&&
//         <div className='p-5 rounded-xl border border-gray-100 bg-blue-50 flex gap-5 items-center mt-4'>
//             <Loader2Icon className='animate-spin'/>
//             <div>
//               <h2 className='font-medium'>Generating Interview ... </h2>
//               <p className='text-primary'>Our AI is crafting personalized Questions </p>
//             </div>  
//         </div>}

        
//         {/* Display Questions on Frontend */}

//         <div>
//           <QuestionListContainer questions={questions}/>
//         </div>

//         {!loading&&<div className='flex justify-end mt-3'>
//           <Button onClick={() => onFinish()} disabled ={saveLoading}>
//             {saveLoading&&<Loader2 className='animate-spin'/>}Finish
//           </Button> 
//         </div>
//         }   
//         </div>
//     </div>
//   )
// }

// export default QuestionList



