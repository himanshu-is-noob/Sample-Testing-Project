import { Button } from '@/components/ui/button'
import { ArrowRight, Copy, Send } from 'lucide-react'
import moment from 'moment/moment'
import React from 'react'
import { toast } from 'sonner'
import Link from 'next/link'

function InterviewCard({interview , viewDetail = false}) {
    const url = process.env.NEXT_PUBLIC_HOST_URL+'/'+interview?.interview_id

    const copyLink = () => {
          const url = process.env.NEXT_PUBLIC_HOST_URL+'/'+interview?.interview_id
          navigator.clipboard.writeText(url);
          toast("Link copied !")
        }

    const onSend = () => {
        window.location.href="mailto:himanshumh12@gmail.com?subject=HireReady Interview Link & body= Interview Link:" + url
    }

  return (
    <div className='p-5 bg-white rounded-lg border'>
        <div className='flex items-center justify-between'>
            <div className='h-[20px] w-[20px] bg-primary rounded-full'></div>
            <h2 className='text-sm'>{moment(interview?.created_at).format('DD MMM yyy')}</h2>
        </div>

        <h2 className='mt-3 font-bold'>{interview?.jobPosition}</h2>
        <h3 className='mt-2 text-sm flex justify-between'>
                <span>{interview?.duration} Minutes </span>
                <span className='text-green-700 font-semibold'>{interview['Interview-Feedback']?.length} Candidates </span>
        </h3>

        {!viewDetail?
        <div className='mt-5 flex justify-end gap-3'>
            <Button variant='outline' onClick={copyLink}><Copy/> Copy Link</Button>
            <Button onClick={onSend}><Send/>Send</Button>
        </div> 
        :
            <Link href={'/scheduled-interview/'+interview?.interview_id+'/details'}>
                <Button className="mt-3 w-full" variant='outline'><ArrowRight/>View Detail</Button>
            </Link>
        }
    </div>
  )
}

export default InterviewCard
