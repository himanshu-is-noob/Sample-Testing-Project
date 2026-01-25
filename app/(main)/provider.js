import React from 'react'
import { AppSidebar } from './_components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import WelcomeContainer from './dashboard/_components/WelcomeContainer'

const DashboardProvider = ({children}) => {
  return (
    <SidebarProvider>
        <AppSidebar/>
        <main className='w-full mt-2'>
            {/* <SidebarTrigger /> */}
            <WelcomeContainer/>
            {children}
        </main>
    </SidebarProvider>
  )
}

export default DashboardProvider
