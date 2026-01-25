'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import AddExperienceForm from './_components/AddExperienceForm'
import AllExperiencesList from './_components/AllExperiencesList'

function Experiences() {

  // 1. Write Function to Open Add New Form 
  // 2. Write Function to Save that data into supabase
  
  
  return (
    <div>
      <div className='flex justify-between'>
        <h2 className='font-bold text-xl'>Experiences</h2>
      </div>
      
      <AddExperienceForm />

      <div className='mt-5'>
        <AllExperiencesList/> 
      </div>
      
    </div>
  )
}

export default Experiences
