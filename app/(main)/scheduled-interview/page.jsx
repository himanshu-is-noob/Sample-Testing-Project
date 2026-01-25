"use client"
import { useUser } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient'
import { Camera, Loader2Icon, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/_components/InterviewCard';

function ScheduledInterview() {
    const { user } = useUser();
    const [interviewList, setInterviewList] = useState([]);
    const [loading, setLoading] = useState(true);

    const GetInterviewList = async () => {
        try {
            setLoading(true);
            const result = await supabase.from('Interviews')
                .select('jobPosition , duration , interview_id , Interview-Feedback(userEmail)')
                .eq('userEmail', user?.email)
                .order('id', { ascending: false });

            if (result.error) {
                console.error(result.error);
                setInterviewList([]);
            } else {
                setInterviewList(result.data || []);
            }

        } catch (err) {
            console.error('Error fetching interviews:', err);
            setInterviewList([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // 🟢 If user exists, fetch interview list
        if (user?.email) {
            GetInterviewList();
        }
        // 🔴 If user is explicitly null, stop loading
        else if (user === null) {
            setInterviewList([]);
            setLoading(false);
        }
    }, [user]); // Refetch when user becomes available

    // 🔄 LOADING UI
    if (loading) {
        return (
            <div>
                <h2 className='text-bold font-bold text-lg'>Interview List with Candidate Feedback</h2>
                <div className='p-8 flex flex-col items-center gap-3 rounded-xl mt-5 bg-gray-50'>
                    <Loader2Icon className='animate-spin text-primary h-8 w-8'/>
                    <p className='text-gray-600'>Loading interviews...</p>
                </div>
            </div>
        );
    }

    // 📌 NO INTERVIEW UI
    if (!loading && interviewList.length === 0) {
        return (
            <div>
                <h2 className='text-bold font-bold text-lg'>Interview List with Candidate Feedback</h2>
                <div className='p-8 flex flex-col items-center gap-3 rounded-xl mt-5 bg-gray-50'>
                    <Camera className='text-primary bg-blue-100 rounded-lg h-8 w-8 p-2'/>
                    <h2>You don't have any interview created!</h2>
                    <Button className='bg-primary'><Plus/> Create New Interview</Button>
                </div>
            </div>
        );
    }

    // 🟢 INTERVIEW LIST UI
    return (
        <div>
            <h2 className='text-bold font-bold text-lg'>Interview List with Candidate Feedback</h2>
            <div className='grid grid-cols-2 xl:grid-cols-3 gap-5 mt-4'>
                {interviewList.map((item, index) => (
                    <InterviewCard interview={item} key={index} viewDetail={true} />
                ))}
            </div>
        </div>
    );
}

export default ScheduledInterview;
