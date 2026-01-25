import React from 'react'

function QuestionListContainer({questions}) {
  return (
    <div>
      {questions?.length>0 && 
            <div className='p-5 border mt-4 border-gray-300 rounded-xl flex flex-col gap-5 '>
              {
                questions.map((item,index) => (
                  <div key={index} className='border border-gray-300 rounded-xl p-4'>
                    <h2 className='font-bold text-sm'>{item?.question}</h2>
                    <h3 className='font-semibold text-sm text-primary'>{item?.type}</h3>
                  </div>
                ))
              }
            </div>

        }
    </div>
  )
}

export default QuestionListContainer
