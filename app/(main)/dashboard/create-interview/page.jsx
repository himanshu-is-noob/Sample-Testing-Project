"use client"
import { ArrowLeft } from 'lucide-react'
import React, { useState,useEffect } from 'react'
import Link from 'next/link'
import { Progress } from "@/components/ui/progress"
import FormContainer from './_components/FormContainer'
import QuestionList from './_components/QuestionList'
import { toast } from "sonner"
import InterviewLink from './_components/InterviewLink'

function Createinterview() {
  const [step , setStep] = useState(1);   //For Testing you could also change step
  const [formData , setFormData] = useState({});   // All Data from form is being stored in this formData state
  const [interviewId , setInterviewId ] = useState();

  const onHandleInputChange = (field , value) => {
      setFormData(prev => ({
        ...prev , 
        [field]:value
      }))
  }

  useEffect(() => {
  console.log("FormData updated: ", formData);
}, [formData]);

  const onGoToNext = () => {
      if(!formData.jobPosition || !formData.jobDescription || !formData.duration || !formData.type){
        toast("Please fill all data !") ;
        return ;
      }
      setStep(step+1);
      
  }

  const onCreateLink = (interview_id) => {
    setInterviewId(interview_id);
    setStep(step+1); 
  }

  //onCreateLink={(interview_id) => onCreateLink(interview_id)}
  // In Case of step1 show form 
  // In case of step 2 show Question List
  // In case of step 3 show Interview Link // for Interview Link we need interview id 
  return (
    <div className='mt-3'>
      <div className='flex gap-4 items-center'>
        <Link href="/dashboard">
          <ArrowLeft /> 
        </Link>
        <h2 className='font-bold'>Create New Interview</h2>
      </div>
      <Progress value={step * 33.33} className='mt-5' />

      
      {step==1?<FormContainer onHandleInputChange={onHandleInputChange} 
      GoToNext={() => onGoToNext()}/> : 
      step==2?<QuestionList formData={formData} onCreateLink={(interview_id) => onCreateLink(interview_id)}/>:
      step==3?<InterviewLink interview_id={interviewId} formData={formData} />:
      null}

    </div>
  )
}

export default Createinterview
