"use client"
import React, { useEffect, useState } from 'react'
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/provider';
import InterviewCard from './InterviewCard';
import { toast } from 'sonner';

function LatestInterview() {
    const [interviewList , setInterviewList] = useState([]);
    const {user} = useUser();

    useEffect(()=>{
        user&&GetInterviewList() ;
    },[user])

    const GetInterviewList = async() => { 
      if(!user){
        console.log("There is No User Details")
      }
      let { data: Interviews, error } = await supabase
        .from('Interviews')
        .select('*')
        .eq('userEmail' , user?.email)
        .limit(6)
          
     
      setInterviewList(Interviews);
    }

  return (
    <div className='my-5'>
      <h2 className='font-bold text-xl'>Previously Created Interviews</h2>

      <div>
        {interviewList?.length == 0 && 
        <div className='p-8 flex flex-col items-center gap-3 rounded-xl mt-5 bg-gray-50'> 
            <Camera className='text-primary bg-blue-100 rounded-lg h-8 w-8 p-2'/>
            <h2>You don't have any interview created !</h2>
            <Button className='bg-primary'><Plus/> Create New Interview</Button>
        </div>
        }

        {
           interviewList && 
          <div className='grid grid-cols-2 xl:grid-cols-3 gap-5 mt-4'>
            {
              [...interviewList].reverse().map((item, index) => (
                <InterviewCard interview={item} key={index} />
              ))
            }
          </div>
        }
      </div>
    </div>
  )
}

export default LatestInterview
