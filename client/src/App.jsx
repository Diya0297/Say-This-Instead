import React, {useState, useEffect} from 'react'
import './index.css';
import CanvasModel from './Componants/Canvas'
import Home from "./Pages/Home"
import LearningPage from './Pages/LearningPage';
import {motion} from "framer-motion"
import {headContainerAnimation, fadeAnimation} from "./config/motion"



export default function App() {

   return (
    <div className='w-screen h-screen bg-black m-0 p-0 relative overflow-hidden font-space'>
      <motion.div 
      {...fadeAnimation}
      className='absolute z-1 w-full h-full'>
          <CanvasModel/>
      </motion.div>
      <div className='absolute top-1/3 bottom-0-1/2 z-10 w-fit h-fit flex items-center justify-start ml-5'>
          <Home />
      </div>
      <div className='absolute z-10 wi-fit h-fit'>
          <LearningPage />
      </div>

      
    </div>
  )
}

