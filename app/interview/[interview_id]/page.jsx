"use client"
import React, { useContext, useEffect, useState } from 'react'
import InterviewHeader from './_components/InterviewHeader'
import Image from 'next/image'
import { BatteryWarning, Clock, FileWarning, Loader2Icon, MessageCircleWarning, MessageCircleWarningIcon, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { useRouter } from 'next/navigation';

function page() {

  const { interview_id} = useParams();
  // console.log(interview_id);

  const [interviewData , setInterviewData] = useState() ;
  const [username , setUsername] = useState();
  const [userEmail , setUserEmail] = useState();

  const [loading , setLoading] = useState(false);
  const {interviewInfo , setInterviewInfo} = useContext(InterviewDataContext);

  // For Navigation we will use Router 
  const router = useRouter();

  const getInterviewDetail = async() => {
    // Fetch interview details using interview_id

    setLoading(true);
    try{
    let { data: Interviews, error } = await supabase
    .from('Interviews')
    .select("jobPosition , jobDescription , duration")

    .eq('interview_id', interview_id)

   
    setInterviewData(Interviews[0]);

    setLoading(false);

    if(Interviews?.length == 0){
      toast('Invalid Interview Link');
    }

    }
    catch(e){
        setLoading(false);
        toast('Some error occured !');
    }
  }

  useEffect(() => {
      interview_id&&getInterviewDetail();
  },[interview_id])


  // For Joining Interview
  const onJoinInterview = async() => {    
      setLoading(true);
      let { data: Interviews, error } = await supabase
      .from('Interviews')
      .select('*')
      .eq('interview_id' , interview_id)

      console.log(Interviews[0]);
      setInterviewInfo({
        userName : username ,
        userEmail : userEmail,
        interviewData : Interviews[0],
      });
      router.push('/interview/'+interview_id+'/start');
      setLoading(false);
  }

  return (
    <div className='px-10 md:px-28 lg:px-48 xl:px-64 mt-16'>
      <div className='flex flex-col justify-center items-center rounded-xl bg-white p-4 h-screen shadow-sm lg:px-32 xl:px-52'>      
        <Image src={'/logo.png'} alt='logo image' width={50} height={50} className='rounded-full' />

        <h2 className='mt-3 text-lg font-semibold'>AI-Powered Interview Platform</h2>

        <Image src={'/AI_Mock.jpeg'} alt='interview-image' height={300} width={300} className='rounded-xl mt-3'></Image>

        <h2 className='font-bold text-lg mt-3'>{interviewData?.jobPosition} Interview</h2>
        <h2 className='flex gap-2  items-center text-gray-500 text-sm'><Clock className='h-4 w-4 '/>{interviewData?.duration} min</h2>


        <div className='mt-4 w-full'>
          <h2 className='text-md'>Enter your full name</h2>
          <Input placeholder='Name' className='mt-2' onChange={(event) => setUsername(event.target.value)}/>
        </div>

        <div className='mt-4 w-full'>
          <h2 className='text-md'>Enter your email</h2>
          <Input placeholder='Eg. john@gmail.com' className='mt-2' onChange={(event) => setUserEmail(event.target.value)}/>
        </div>

        <div className='bg-blue-100 mt-5 p-5 rounded-xl'>
          <h2 className='font-semibold flex gap-4 mb-3'><MessageCircleWarning className='text-primary'/>Before you begin</h2>
          <ul className='text-xs font-semibold text-primary'>
            <li>- Test your camera and microphone</li>
            <li>- Ensure you have stable internet connection</li>
            <li>- Find a quiet place for interview</li>
          </ul>
        </div>

        <Button className='mt-4 w-full font-bold' disabled = {loading || !username} onClick={() => onJoinInterview()}><Video/> 
        {loading&&<Loader2Icon className='animate-spin'/>}
        Join Interview
        
        </Button>
      </div>
    </div>
  )
}

export default page
