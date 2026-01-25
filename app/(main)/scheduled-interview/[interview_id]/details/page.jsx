"use client"
import { useUser } from '@/app/provider';
import { supabase } from '@/services/supabaseClient';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import InterviewDetailContainer from './_components/InterviewDetailContainer';
import CandidateList from './_components/CandidateList';

function InterviewDetails() {
    const {interview_id} = useParams();
    const {user} = useUser();
    const [interviewDetail , setInterviewDetail] = useState();

    const GetInterviewDetail = async() => {
        const result = await supabase.from('Interviews')
                .select('created_at,jobPosition ,jobDescription,questionList, type, duration , interview_id , Interview-Feedback(userEmail,userName,feedback,created_at) ')
                .eq('userEmail' , user?.email)
                .eq('interview_id' , interview_id)
        
        console.log(result);
        setInterviewDetail(result?.data[0]);
    }

    useEffect(() => {
        user&&GetInterviewDetail();
    },[user])

  return (
    <div>
      <h2 className='font-bold'>Interview Detail</h2>
      <InterviewDetailContainer interviewDetail={interviewDetail}/>
      <CandidateList candidateList={interviewDetail?.['Interview-Feedback']}/>
    </div>
  )
}

export default InterviewDetails
