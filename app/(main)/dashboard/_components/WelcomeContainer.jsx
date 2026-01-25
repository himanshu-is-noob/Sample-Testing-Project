"use client"
import { useUser } from '@/app/provider'
import React from 'react'
import Image from 'next/image'

const WelcomeContainer = () => {
     const { user } = useUser();
    
    if (user === undefined) {
        return <p>Loading user...</p>;
    }
    
    if (!user) {
        return <p>Please log in</p>;
    }

    return (
        <div>
            <div className='bg-gray-50 p-5 rounded-xl w-full flex justify-between items-center'>
                <div>
                    <h2 className='text-md font-bold'>Welcome back, {user.name}</h2>
                    <h2 className='text-gray-500 text-sm'>AI-driven Mock Interviews, Hassel-free</h2>
                </div>
                {user&&<Image src={user?.picture} alt='userAvatar' height='40' width='40' className='rounded-full' />}
            </div>

            
        </div>
    );
}

export default WelcomeContainer
