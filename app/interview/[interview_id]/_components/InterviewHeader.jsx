import Image from 'next/image'
import React from 'react'

function InterviewHeader() {
  
  return (
    <div className='p-4 shadow-sm'>
      <Image src={'/logo.png'} alt='logo image' width={50} height={50} className='rounded-full' />
    </div>
  )
}

export default InterviewHeader
