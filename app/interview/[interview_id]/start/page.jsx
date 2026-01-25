'use client'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { Loader2Icon, Mic, Phone, Timer } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useEffect , useState, useRef } from 'react'
import Vapi from '@vapi-ai/web';
import { AlertConfirmation } from './_components/AlertConfirmation';
import { toast } from 'sonner';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/services/supabaseClient';


function StartInterview() {

  const {interviewInfo , setInterviewInfo} = useContext(InterviewDataContext);

  const vapiRef = useRef(null);
  if (!vapiRef.current) {
    vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  }
  const vapi = vapiRef.current;

  const [activeUser , setActiveUser] = useState(false);
  const [time, setTime] = useState(0);
  const [conversation , setConversation] = useState([]);
  const router = useRouter();
  const [loading,setLoading] = useState();
  const [callStarted, setCallStarted] = useState(false);
  const {interview_id} = useParams();

  useEffect(() => {
    startCall() ;
  },[interviewInfo])

  useEffect(() => {
  console.log("CONVERSATION UPDATED:", conversation);
}, [conversation]);


  // Timer
  useEffect(() => {
      let timer;
      if (interviewInfo) {
        timer = setInterval(() => {
          setTime(prev => prev + 1);
        }, 1000);
      }
      return () => clearInterval(timer);
  }, [interviewInfo]);

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const startCall = () => {
      let questionList ;
      interviewInfo?.interviewData?.questionList.forEach((item, index) => (
        questionList =item?.question+','+questionList
      )) ;

      const assistantOptions = {
        name : "AI Recruiter" , 
        firstMessage : "Hi"+interviewInfo?.userName +", how are you? Ready for your interview on" + interviewInfo?.interviewData?.jobPosition,
        transcriber : {
          provider:"deepgram",
          model:"nova-2",
          language:"en-US",
        },
        voice:{
          provider:"playht",
          voiceId:"jennifer",
        },
        model:{
          provider:"openai",
          model:"gpt-4",
          messages : [
            {
              role:"system",
              content: `
              You are an AI voice assistant conducting interviews.
              Your job is to ask candidates provided interview questions, asses their response.
              Begin the conversation with a friendly introduction , setting a relaxed yet professional tone. Example:
              "Hey there ! Welcome  to your `+interviewInfo?.interviewData?.jobPosition+` interview. Let's get started with a few questions!"
              Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below are 
              the questions ask one by one:
              Questions : `+questionList+`
              If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
              "Need a hint? Think about how React tracks component updates!"
              Provide brief encouraging feedback after each answer. Example :
              "Nice! That's a solid answer."
              "Hmm, not quiet! Want to try again?"
              Keep the conversation natural and engaging-use casual phrases like "Alright, next up..." or "Lets's tackle a tricky one!"
              After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
              "That was great! You handled some tough questions well. Keep sharpening your skills!"
              End on a positive note :
              "Thanks for chatting! Hope to see you crushing projects soon!"
              Key Guidelines:
              Be friendly , engaging , and witty 
              Keep responses short and natural, like a real conversation
              Adapt based on the candidate's confidence level
              Ensure the intreview remain focused on given job Description
              `.trim(),
            },
          ],
        },
      };

      vapi.start(assistantOptions)
  }



  const stopInterview = async () => {
    try {
      setLoading(true);
      toast("Ending interview...");
      
      if (vapi) {
        await vapi.stop();
        console.log("VAPI call stopped successfully");
      }
      
      toast.success("Interview ended successfully!");
      
      // Generate feedback and redirect
      await GenerateFeedback();
      
    } catch (error) {
      console.error("Error ending interview:", error);
      toast.error("Failed to end the interview. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    const handleCallStart = () => {
      setCallStarted(true);
      toast("Call Connected Successfully ...");
    };

    const handleCallEnd = () => {
      console.log("Call Ended successfully!");
      setCallStarted(false);
      toast("Call Ended Successfully ...");
      // GenerateFeedback();
      // router.replace(`/interview/${interview_id}/completed`);
    };

    const handleSpeechStart = () => {
      console.log("Assistant speech started!");
      setActiveUser(false);
    };

    const handleSpeechEnd = () => {
      console.log("Assistant speech ended!");
      setActiveUser(true);
    };

    // const handleMessage = (message) => {
    //   console.log(message);
    //   setConversation(message?.messages);

    // };

    const handleMessage = (msg) => {
      console.log("VAPI MESSAGE RECEIVED:", msg);

      // 1) If conversation-update → store cleaned conversation array
      if (msg?.type === "conversation-update" && Array.isArray(msg?.conversation)) {
        setConversation(msg.conversation);
        return;
      }

      // 2) Handle transcript events (assistant or user)
      if (msg?.type === "transcript") {
        setConversation((prev) => [
          ...prev,
          {
            role: msg.role || "assistant",
            content: msg.transcript,
          },
        ]);
        return;
      }

      // 3) If general message record exists
      const text =
        msg?.message ||
        msg?.output_text ||
        msg?.text ||
        msg?.delta ||
        null;

      if (text) {
        const role =
          msg?.sender ||
          msg?.role ||
          "assistant";

        setConversation((prev) => [
          ...prev,
          { role, content: text },
        ]);
      }

      console.log("FINAL CONVO:", conversation);

    };

    const handleError = (error) => {
      console.error("VAPI Error:", error);
      toast.error("An error occurred with the call");
    };

    // ✅ add listeners
    vapi.on("call-start", handleCallStart);
    vapi.on("call-end", handleCallEnd);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("message", handleMessage);
    vapi.on("error", handleError);

    // ✅ cleanup on unmount
    return () => {
      if(vapi){
        vapi.off("call-start", handleCallStart);
        vapi.off("call-end", handleCallEnd);
        vapi.off("speech-start", handleSpeechStart);
        vapi.off("speech-end", handleSpeechEnd);
        vapi.off("message", handleMessage);
        vapi.off("error", handleError);

        if(callStarted){
          vapi.stop().catch(console.error);
        }
      }
    };
  }, [vapi , callStarted]);

  // const GenerateFeedback = async() => {
  //     const result = await axios.post('/api/ai-feedback',{
  //       conversation:conversation 
  //     })

  //     console.log(result?.data);
  //     const Content = result.data.content;
  //     const FINAL_CONTENT = Content.replace('```json' , '').replace('```','')
  //     console.log(FINAL_CONTENT);

  //     router.replace(`/interview/${interview_id}/completed`);

  // }

  const GenerateFeedback = async () => {
    try {
      if (!conversation) {
        console.log("Steps didn't reach further ! No conversation data available");
        router.replace(`/interview/${interview_id}/completed`);
        return;
      }

      const result = await axios.post('/api/ai-feedback', {
        conversation: conversation 
      });

      console.log(result?.data);
      if (result.data?.content) {
        const Content = result.data.content;
        const FINAL_CONTENT = Content.replace('```json', '').replace('```', '');
        console.log('Generated Feedback : ',FINAL_CONTENT);

      // Storing Feedback in Database        
        const { data, error } = await supabase
        .from('Interview-Feedback')
        .insert([
          { userName: interviewInfo?.userName , 
            userEmail: interviewInfo?.userEmail ,
            interview_id: interview_id,
            feedback: JSON.parse(FINAL_CONTENT),
            recommended: false ,
          },
        ])
        .select()

        console.log(data);
          
      }


    } catch (error) {
      console.error("Error generating feedback:", error);
    } finally {
      router.replace(`/interview/${interview_id}/completed`);
    }
  }

  return (
    <div className='p-20 lg:px-48 xl:px-56'>
      <div className='flex justify-between'>
          <h2 className='font-bold'>AI Interview Session</h2>
          <span className='flex gap-2 items-center'>
            <Timer/>
            {formatTime(time)}  
          </span>
      </div>  

      <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
        <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
          {!activeUser&&<span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping'/>}
              <Image
                  src={'/AIAvatar.jpeg'} alt='AI Avatar'
                  width={100}
                  height={100}
                  className='w-[60px] h-[60px] rounded-full object-cover'
              />
            <h2 className=''>AI Recruiter</h2>
        </div>

        <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
            <div className='relative'>
              {!activeUser&&<span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping'/>}
              <h2 className='text-2xl bg-primary text-white p-3 rounded-full px-5'>{interviewInfo?.userName[0]}</h2>
            </div>
            <h2 className=''>{interviewInfo?.userName}</h2>
        </div>
      </div>


      <div className='flex items-center justify-center gap-5 mt-7'>
        <Mic className='h-12 w-12 bg-gray-500 p-3 text-white rounded-full cursor-pointer hover:bg-gray-600'/>
        {!loading?(
          <Phone className='h-12 w-12 bg-red-500 text-white p-3 rounded-full cursor-pointer hover:bg-red-600' onClick={stopInterview}/>):(
          <Loader2Icon className='animate-spin'/>
        )}
      </div>

      <h2 className='text-sm text-gray-300 text-center mt-2'>
        {callStarted ? "Interview in Progress..." : "Starting interview..."}
      </h2>
    </div>

  )
}

export default StartInterview
