import React from 'react'
import moment from 'moment'
import { Button } from '@/components/ui/button'
import CandidateFeedbackDialog from './CandidateFeedbackDialog'

function CandidateList({candidateList}) {
  return (
    <div className='mt-4'>
      <h2 className='text-sm'>Candidates <span className='text-green-500 font-bold'>({candidateList?.length})</span></h2>

      <div className='mt-3'>
        {
            candidateList?.map((item,index) => (
                <div key={index} className='flex gap-3 items-center justify-between bg-gray-50 rounded-lg  p-4 '>
                    <div className='flex items-center gap-5'>
                        <h2 className='text-xs text-white bg-primary h-6 w-6 rounded-full items-center flex justify-center'>{item?.userName?.[0]}</h2>
                        <div> 
                            <h2 className='text-sm text-black font-bold'>{item?.userName}</h2>
                            <h2 className='text-xs text-gray-500'>Completed On : {moment(item?.created_at).format('MMM DD, yyyy')}</h2>
                        </div>
                    </div>
                    <div className='flex justify-between items-center gap-5'>
                      
                      <CandidateFeedbackDialog candidate={item}/>
                    </div>
                    
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default CandidateList
