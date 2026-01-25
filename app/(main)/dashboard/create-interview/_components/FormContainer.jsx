import React, { useEffect,useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { InterviewType } from '@/services/Constants'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

// We are taking // jobPosition , jobDescription , duration , type from form


function FormContainer({onHandleInputChange , GoToNext}) {
  const [typeInterview , settypeInterview] = useState([]) ;

  // For storing SELECTED interview TYPES 
  useEffect(() => {
      if(typeInterview)
      {
        onHandleInputChange('type' , typeInterview)
      }
  },[typeInterview])


  

  //This is Logic to select and deselect Interview type 
  const AddInterviewType = (type) => {
    const data = typeInterview.includes(type);

    if(!data){
       settypeInterview(prev => [...prev , type]);
    }
    else{
      const result = typeInterview.filter(item => item!=type) ;
      settypeInterview(result);
    }
  }

  

  return (
    <div className='p-5 mt-4 bg-gray-50 rounded-xl'>
        <div>
          <h2 className='text-xs font-semibold'>Job Postion</h2>
          <Input placeholder='e.g. Full Stack Developer' className='mt-2' onChange={(event) => onHandleInputChange('jobPosition', event.target.value)}/>

        </div>
 
        <div>
          <h2 className='text-xs font-semibold mt-4'>Job Description</h2>
          <Textarea placeholder='e.g. Describe Job or paste Job Description' className='mt-2 h-[200px]' onChange={(event) => onHandleInputChange('jobDescription' , event.target.value)}/>
        </div>

        <div>
          <h2 className='text-xs font-semibold mt-4'>Interview Duration</h2>
              <Select onValueChange={(value) => onHandleInputChange('duration',value)}>  
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue placeholder="Select Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Min</SelectItem>
                  <SelectItem value="15">15 Min</SelectItem>
                  <SelectItem value="30">30 Min</SelectItem>
                  <SelectItem value="45">45 Min</SelectItem>
                </SelectContent>
              </Select>
        </div>

        <div>
          <h2 className='text-xs font-semibold mt-4'>Interview Type</h2>
          <div className='flex flex-wrap gap-5  mt-3'>
            {
              InterviewType.map((type,index) => (
                <div key={index} 
                className={`flex gap-5 items-center p-2 bg-gray-50 border border-gray-200 cursor-pointer rounded-2xl hover:bg-secondary
                   ${typeInterview.includes(type?.title)&&'bg-blue-200 text-primary'}`}
                  onClick={() => {
                      AddInterviewType(type?.title)
                  }}
                >
                    <type.icon/>
                    <span className='text-sm'>{type?.title}</span>
                </div>
              ))
            }
          </div>
        </div>
        
        <div className='mt-3 flex items-end w-full justify-end  ' onClick={() => GoToNext()}>
          <Button>Generate Interview <ArrowRight/></Button>
        </div>
        
    </div>
  )
}

export default FormContainer
