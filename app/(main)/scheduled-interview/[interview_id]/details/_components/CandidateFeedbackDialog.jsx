import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

function CandidateFeedbackDialog({candidate}) {

  const feedback = candidate?.feedback?.feedback;
  const avgScore = (feedback?.rating?.technicalSkills + feedback?.rating?.communication + feedback?.rating?.experience + feedback?.rating?.problemSolving)/4 ;
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant='outline' className='text-primary'>View Report</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription asChild>
                <div className='mt-5'>
                      <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-4'> 
                              <div>
                                <h2 className='text-xs text-white bg-primary h-6 w-6 rounded-full items-center flex justify-center'>{candidate?.userName?.[0]}</h2>
                              </div>
                              <div>
                                <h2 className='text-sm text-black font-bold'>{candidate?.userName}</h2>
                                <h2 className='text-xs text-gray-500'>{candidate?.userEmail}</h2>
                              </div>
                            </div>
                        
                            <div className='flex justify-between items-center gap-5'>
                              <h2 className='text-green-600 font-bold text-3xl'><span className={avgScore*10 > 5 ? "text-green-600" : "text-red-500"}>{avgScore}/10</span></h2>
                            </div>
                      </div>        

                      <div className='mt-5'>
                        <h2 className='font-bold text-lg'>Skill Assesment</h2>
                        <div className='mt-3 grid grid-cols-2 gap-10'>
                            <div className='mt-3 '>
                              <h2 className='flex justify-between font-bold'>Technical Skills <span className={feedback?.rating?.technicalSkills > 5 ? "text-green-600" : "text-red-500"}>{feedback?.rating?.technicalSkills}/10</span></h2>
                              <Progress value={feedback?.rating?.technicalSkills*10} className='mt-1'/>
                            </div>

                            <div className='mt-3'>
                              <h2 className='flex justify-between font-bold'>Communication Skills <span className={feedback?.rating?.communication > 5 ? "text-green-600" : "text-red-500"}>{feedback?.rating?.communication}/10</span></h2>
                              <Progress value={feedback?.rating?.communication*10} className='mt-1'/>
                            </div>

                             <div className='mt-3'>
                              <h2 className='flex justify-between font-bold'>Problem Solving Skills <span className={feedback?.rating?.problemSolving > 5 ? "text-green-600" : "text-red-500"}>{feedback?.rating?.problemSolving}/10</span></h2>
                              <Progress value={feedback?.rating?.problemSolving*10} className='mt-1'/>
                            </div>

                             <div className='mt-3'>
                              <h2 className='flex justify-between font-bold'>Experience Skills <span className={feedback?.rating?.experience > 5 ? "text-green-600" : "text-red-500"}>{feedback?.rating?.experience}/10</span></h2>
                              <Progress value={feedback?.rating?.experience*10} className='mt-1'/>
                            </div> 
                        </div>
                      </div>       


                      <div className='mt-5'>
                          <h2 className='font-bold text-lg'>Performance Summary</h2>
                          <p className='mt-5 bg-secondary p-4 rounded-lg text-black'>{feedback?.summary}</p>
                      </div>    

                      <div className='mt-5'>
                        <h2 className='font-bold text-lg'>Recommendation Message</h2>
                        <p className='mt-4 bg-secondary p-4 rounded-lg text-black'>{feedback?.RecommendationMsg}</p>
                      </div>
                </div>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default CandidateFeedbackDialog
