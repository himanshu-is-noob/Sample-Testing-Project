import React from 'react'
import { Video, PhoneCall} from 'lucide-react'
import Link from 'next/link'

const CreateOptions = () => {
  return (
    <div className='grid grid-cols-2 gap-5 mt-4 '>

        <Link href='/dashboard/create-interview'>
          <div className='bg-gray-50 p-5 rounded-xl text-sm hover:bg-gray-100 transition-all'>
            <Video className='text-primary bg-blue-100 rounded-lg h-8 w-8 p-2'/>
            <h2 className='font-bold mt-2'>Create New Interview</h2>
            <p className='text-gray-500'>Create AI Interviews and schedule then with candidates</p>
          </div>
        </Link>
        
        <div className='bg-gray-50 p-5 rounded-xl text-sm hover:bg-gray-100'>
            <PhoneCall className='text-primary bg-blue-100 rounded-lg h-8 w-8 p-2'/>
            <h2 className='font-bold mt-2'>Create Phone Screening Call <span className='text-gray-400'>(Coming Soon..) </span></h2>
            <p className='text-gray-500'>Schedule phone screening call with candidates</p>
        </div>

    </div>
  )
}

export default CreateOptions
