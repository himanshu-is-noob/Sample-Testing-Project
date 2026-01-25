import { Button } from '@/components/ui/button'
import moment from 'moment'
import React from 'react'

function ExperienceCard({experience}) {
  return (
    <div className='p-6 bg-white rounded-lg border'>
      <div className='flex justify-between items-center'>
        <div>
            <h2 className='font-bold text-lg'>{experience?.company} | <span className='font-semibold text-sm'>{experience?.jobRole}</span></h2>
        </div>
        
      </div>

      <div className='flex gap-3 mt-4'>
            <div className='bg-blue-100 rounded-xl px-3 py-1 text-sm font-semibold'>{experience?.difficulty}</div>
            <div className='bg-blue-100 rounded-xl px-3 py-1 text-sm font-semibold'>{experience?.selected}</div>
      </div>

      <div className='mt-5'>
        <p className='text-sm font-semibold text-gray-600'>{experience?.tips}</p>
      </div>

      <div className='mt-5 flex justify-between items-center'>
        <div className='flex flex-col'>
            <h3 className='text-xs text-gray-500'>{experience?.name}</h3>
            <h2 className='text-xs text-gray-500'>{moment(experience?.created_at).format('DD MMM yyy')}</h2>
        </div>
        <Button variant="outline">View details</Button>
      </div>

      
    </div>
  )
}

export default ExperienceCard
