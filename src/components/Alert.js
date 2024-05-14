import React, {useContext}from 'react'

import { noteContext } from '../context/notes/NoteState';

const Alert = () => {
  const {message} = useContext(noteContext);
  return (
   
   <div className='flex items-end'>
    <div role="alert" className=" alert justify-end  flex flex-row  "> 
   <div>
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    </div>
    <div>
    <span className='text-lg '>{message}</span>

    </div>
    </div>
    {/* <div><button className="btn btn-sm btn-primary">close</button></div> */}
    </div>

  
  )
}

export default Alert
