"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { supabase } from '@/services/supabaseClient';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();

  // ✅ If user is already logged in, redirect to dashboard
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        router.push('/dashboard');
      }
    };
    checkUser();
  }, [router]);

  const signInwithGoogle = async() => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`, // ✅ Redirect after login
      }
    });

    if (error) {
      console.error('Error', error.message);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='flex flex-col items-center justify-center border rounded-2xl p-10'>
        <Image src={'/logo1.png'} alt='Logo' height={100} width={100} className='w-[100px]' />
        
        <div className='flex flex-col items-center justify-center'>
          <Image src={'/LoginPage_Logo.png'} alt='Sample Image'
            height={400}
            width={600}
            className='w-[400px] h-[250px] rounded-xl mt-5'
          />

          <h2 className='text-2xl font-semibold text-center mt-5'>Welcome to HireReady</h2>
          <p className='text-gray-500 text-center'>Sign in with Google</p>
          <Button className='mt-5 w-full' onClick={signInwithGoogle}><FaGoogle />Login with Google</Button>
        </div>
      </div>
    </div>
  )
}

export default Login;
