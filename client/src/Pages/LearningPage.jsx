import React, {useState} from 'react'
import { useSnapshot } from 'valtio'
import state from '../store'
import CustomButton from '../Componants/CustomButton'
import {motion} from "framer-motion"
import { slideAnimation, headContentAnimation } from '../config/motion'
import Questions from '../Componants/Questions'
import axios from 'axios';
import {extractArrayFromResponse, extractFeedback} from '../config/helpers'



const LearningPage = () => {
  const snap = useSnapshot(state);
  const [showInput, setShowInput] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [response, setResponse] = useState("");
  const [questions, setQuestions] = useState([]);
  const [start, setStart] = useState(false);
  const [feedback, setFeedback] = useState("");
 

  const getQuestionsArray = async () => {
    setStart(true);
    try{

    const response = await axios.post("http://localhost:8080/api/get-questions", {
      name: "Diya"
    });

      const data = response.data;
      setQuestions(extractArrayFromResponse(data.questions));

    }catch(error){
      console.log("Failed to fetch!", error);
    }

  }

  const getFeedback = async () => {
    const userMessage = {
      question: questions[currentQuestion],
      userResponse: response
    };
    try{

    const response = await axios.post('http://localhost:8080/api/feedback', {
      message: userMessage  // message to backend
    });

    const data = response.data;
    setFeedback(extractFeedback(data.feedback))

    }catch(error){
      console.log("Failed to fetch!", error);
    }

  }

  if(snap.intro){return null}
  return (

    <div className='h-screen w-screen'>
    <CustomButton title="Go Back" handleClick={() => state.intro=true} customStyles="absolute top-5 left-5 z-20"/>
    
    <motion.div
    {...slideAnimation('top')}
    className='absolute left-1/3 top-[20%] sm:top-15 md:top-15 min-h-10 w-2/3 sm:w-1/3 h-2/3 border border-white glassmorphism rounded-3xl p-5 z-10'
    >
      {questions.length > 0 && <Questions question={questions[currentQuestion]} showInput={showInput} setShowInput={setShowInput} response={response} setResponse={setResponse}/>}

      {showFeedback && <motion.p {...headContentAnimation} className='text-md text-white ml-5 mt-2'>{feedback}</motion.p>}

      {start && <div className='flex justify-center items-center absolute bottom-4 ml-3'>
        <CustomButton 
        title="Feedback" 
        handleClick={() => {
          setShowFeedback(true);
          getFeedback();
        }}
        
        />

        <CustomButton 
        title="Next" 
        handleClick={() => {
          setCurrentQuestion(prev => prev + 1)
          setShowFeedback(false);
          setResponse("");
        }
          }/>
      </div>}
      {!start && <CustomButton title="Start" handleClick={getQuestionsArray} customStyles="absolute left-3"/>}
    </motion.div> 
    
    </div>
  )
}

export default LearningPage
