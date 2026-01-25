import React, { useState,useEffect } from 'react'
import { supabase } from '@/services/supabaseClient'
import { useUser } from '@/app/provider';
import ExperienceCard from './ExperienceCard';

function AllExperiencesList() {
  const [experiencesList , setExperienceList] = useState([]);
  const {user} = useUser();

  useEffect(() => {
    if(user){
      fetchExperiences();
    }
  },[user])

  
  const fetchExperiences = async() => {

    if(!user){
      console.log("There is No User Detail");
      return ;
    }
      
    let { data: Experiences, error } = await supabase
    .from('Experiences')
    .select('*')

    setExperienceList(Experiences);
    console.log("Fetched Data : " ,Experiences);
  }
  
  return (
    <div>
        <h3>Fetch all experiences</h3>
        <div>
          {
           experiencesList && 
          <div className='grid grid-cols-2 xl:grid-cols-3 gap-5 mt-4'>
            {
              [...experiencesList].reverse().map((item, index) => (
                <ExperienceCard experience={item} key={index} />
              ))
            }
          </div>
        }
        </div>
        
    </div>
  )
}

export default AllExperiencesList
