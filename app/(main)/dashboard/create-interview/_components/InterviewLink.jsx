import React from 'react'
import { ArrowLeft, Calendar, Clock, Copy, List, Mail, Plus, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';


function InterviewLink({interview_id, formData}) {


  // From Props we are getting interview Id and Form Data for creation of Interview Link
  const url = process.env.NEXT_PUBLIC_HOST_URL+'/'+ interview_id;

  const getInterviewURL = () => {
      return url ;
  }
  
  const onCopyLink = async() => {
    await navigator.clipboard.writeText(url);  // Copy text 
    toast("Link Copied !")
  }

  return (
    <div className='flex flex-col items-center justify-center mt-10 '>
        <h2 className='flex gap-4 font-bold mt-4'><Sparkles/>Your Interview Link is ready ! </h2>
        <p className='mt-3 text-sm'>Share this with your candidates to start your interview</p>

        <div className='w-full p-7 mt-6 rounded-xl bg-gray-50'>
          <div className='flex justify-between items-center font-bold'>
            <h2 className='text-sm'>Interview Link </h2>
            <h2 className='p-1 px-2 text-primary bg-blue-50 rounded-xl text-sm'>valid for 30 days</h2>
          </div>

           <div className='mt-5 flex justify-around gap-3'>
              <Input defaultValue={getInterviewURL()} disabled={true}/>
              <Button onClick={() => onCopyLink()}><Copy/> Copy Link</Button>
            </div>

            <hr className='my-7'/>

            <div className='flex gap-10'>
                <h2 className='text-xs text-gray-500 flex gap-2 items-center'><Clock className='h-4 w-4'/>{formData?.duration}</h2>
                <h2 className='text-xs text-gray-500 flex gap-2 items-center'><List className='h-4 w-4'/>{formData?.duration}</h2>
                {/* <h2 className='text-xs text-gray-500 flex gap-2 items-center'><Calendar className='h-4 w-4'/>{formData?.duration}</h2> */}
            </div> 
        </div>

        <div className='mt-7 bg-gray-50 rounded-xl w-full p-6'>
                <h2 className='text-sm font-bold'>Share via</h2>
                <div className='gap-6 mt-5 flex'>
                  <Button variant={'outline'} ><Mail/>Gmail</Button>
                  <Button variant={'outline'} ><Mail/>Slack</Button>
                  <Button variant={'outline'} ><Mail/>Whatsapp</Button>
                </div>
                
        </div>

        
        <div className='mt-4 flex w-full justify-end gap-5'>
            <Link href={'/dashboard'}>
            <Button className='bg-white text-black' variant={'outline'}><ArrowLeft/>Go back to Dashboard</Button>
          </Link> 

           <Link href={'/create-interview'}>
             <Button ><Plus/> Create New Interview </Button>
          </Link>
        </div>
        

        
    </div>
  )
}

export default InterviewLink

