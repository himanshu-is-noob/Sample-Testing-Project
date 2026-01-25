import React from 'react'
import WelcomeContainer from './_components/WelcomeContainer'
import CreateOptions from './_components/CreateOptions'
import LatestInterview from './_components/LatestInterview'
import { Button } from '@/components/ui/button'
import { AlertConfirmation } from '@/app/interview/[interview_id]/start/_components/AlertConfirmation'

const Dashboard = () => {
  return (
    <div>
      {/* <WelcomeContainer/> */}
      <p className='my-3 font-bold text-xl'>Dashboard</p>
      <CreateOptions/>
      <LatestInterview/>
    </div>
  )
}

export default Dashboard
