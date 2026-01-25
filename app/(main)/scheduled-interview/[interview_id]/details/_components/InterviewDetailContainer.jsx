"use client"
import { Calendar, Clock } from 'lucide-react'
import React from 'react'
import moment from 'moment'

function InterviewDetailContainer({interviewDetail}) {
  return (
    <div className='p-5 bg-gray-50 rounded-lg mt-2'>
        <h2 className='font-bold text'>{interviewDetail?.jobPosition}</h2>

        <div className='mt-4 flex items-center justify-between lg:pr-52 '>
            <div>
                <h2 className='text-sm text-gray-500'>Duration</h2>
                <h2 className='flex text-sm gap-2 items-center'><Clock className='h-4 w-4'/>{interviewDetail?.duration} minutes</h2>
            </div>

            <div>
                <h2 className='text-sm text-gray-500'>Created On</h2>
                <h2 className='flex text-sm gap-2 items-center '><Calendar className='h-4 w-4'/>{moment(interviewDetail?.created_at).format('MMM DD, yyy')}</h2>
            </div>

            {interviewDetail?.type&&<div>
                <h2 className='text-sm text-gray-500'>Duration</h2>
                <h2 className='flex text-sm gap-2 items-center '><Clock/>{interviewDetail?.type}</h2>
            </div>
            }
        </div>

        <div className='mt-4'>
            <h2 className='font-semibold text-sm text-gray-500'>Job Description </h2>
            <p className='mt-2 text-sm leading-6'>{interviewDetail?.jobDescription}</p>
        </div>

        <div className='mt-4'>
            <h2 className='font-semibold text-sm text-gray-500'>Interview Questions</h2>

            <div className='grid grid-cols-2 gap-5 mt-5'>
                {
            interviewDetail?.questionList.map((item,index) => (
                <h2 className='text-sm' key={index}><span className='font-bold'>{index+1}.</span> {item?.question}</h2>
            ))
            }</div>
        </div>
    </div>
  )
}

export default InterviewDetailContainer
