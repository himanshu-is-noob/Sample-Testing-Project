"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { SidebarOptions } from "@/services/Constants"
import { usePathname } from "next/navigation"


export function AppSidebar() {
  const path = usePathname() ;

  return (
    <Sidebar>
      <SidebarHeader className='flex items-center'>
        <Image src={'/logo1.png'} alt="logo" width={100} height={100} className="mt-3"/>

        <Button className='w-full mt-3'><Plus/><Link href="dashboard/create-interview"> Create New Interview</Link></Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup >
          <SidebarContent>
            <SidebarMenu>
                {SidebarOptions.map((options,index) => (
                  <SidebarMenuItem key={index} className='p-1'>
                      <SidebarMenuButton asChild className={`p-5 ${path == options.path&&'bg-blue-50'}`}>
                         <Link href={options.path}>
                            <options.icon className={`${path == options.path&&'text-primary'}`}/>
                            <span className={`${path == options.path&&'text-primary'}`}>{options.name}</span>
                         </Link>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup >
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}