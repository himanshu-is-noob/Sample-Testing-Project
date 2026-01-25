"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

function InterviewCompleted() {
  const router = useRouter();

  const handleRedirect = () => {
    router.replace('/dashboard');
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4'>
      <div className='bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full'>
        <div className='flex justify-center mb-4'>
          <CheckCircle className='text-green-500 w-16 h-16' />
        </div>
        <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
          Interview Completed Successfully! 🎉
        </h2>
        <p className='text-gray-600 mb-6'>
          Thank you for completing your interview.  
          The results will be available soon in your <span className='font-medium text-blue-600'>Scheduled Interview</span> section.
        </p>
        <Button
          onClick={handleRedirect}
          className='w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg transition-all duration-200'
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
}

export default InterviewCompleted
