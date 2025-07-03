import React, {useState, useEffect, useRef} from 'react'
import arrows from '../assets/arrows.png'

const Questions = ({question, showInput, setShowInput, response, setResponse}) => {
  const [displayedText, setDisplayedText] = useState('');
  
  const indexRef = useRef(0) 

  useEffect(() => {
    setDisplayedText('');
    setShowInput(false);
    indexRef.current = 0 

    const interval = setInterval(() => {
        if(indexRef.current < question.length){
            const char = question.charAt(indexRef.current);
            setDisplayedText(prev => prev + char);
            indexRef.current+=1;
        }else{
            
            clearInterval(interval)
            setShowInput(true)
        }
        
    }, 100);

    return () => clearInterval(interval)
  }, [question])

  return (
    <div className='flex flex-col text-white'>
      <div className='flex gap-2 m-2 h-fit w-fit'>
        <img src={arrows} alt="" className='w-4 h-4 mt-1'/>
        <h1>{displayedText}</h1>
      </div>

      {showInput && <div className='flex  gap-2 m-2'>
        <img src={arrows} alt="" className='w-4 h-4'/>
        <textarea type="text" placeholder='Answer...' className='bg-transparent w-full' onChange={(e) => setResponse(e.target.value)} value={response}/>
      </div>}
    </div>
  )
}

export default Questions
