"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React from 'react'
import { useUser } from "../provider";
import Image from "next/image";

function Header() {
    const { user } = useUser();
    return (
        <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
            <div className="flex items-center gap-2">
                <div className="rounded-full bg-gradient-to-br from-violet-500 to-pink-500" >
                    <Image src='/logo.png' alt='userAvatar' height='40' width='40' className='rounded-full'></Image>
                </div>
                <h1 className="text-base font-bold md:text-2xl">HireReady</h1>
            </div>

            <div className="item">
                {user ? (
                    <div>
                        {user&&<Image src={user?.picture} alt='userAvatar' height='40' width='40' className='rounded-full' />}
                    </div>
                ) : (

                    <Link href="./auth">
                        <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                            Login
                        </button>
                    </Link>

                )}
            </div>

        </nav>
    )
}

export default Header
