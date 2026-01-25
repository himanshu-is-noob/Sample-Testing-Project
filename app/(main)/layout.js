import React from 'react'
import DashboardProvider from './provider'

const DashboardLayout = ({children}) => {
  return (
    <div>
        <DashboardProvider>
          <div className='p-8'>
            {children}
          </div>
        </DashboardProvider>
    </div>
  )
}

export default DashboardLayout
 