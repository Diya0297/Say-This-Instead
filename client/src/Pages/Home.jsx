import React from 'react'
import {motion} from "framer-motion"
import { fadeAnimation, slideAnimation, headTextAnimation } from "../config/motion"
import CustomButton from '../Componants/CustomButton'
import state from '../store'
import { snapshot, useSnapshot } from 'valtio'


const Home = () => {
  const snap = useSnapshot(state);

  return (
    (snap.intro && <motion.div 
   {...fadeAnimation}
    className='flex flex-col flex-wrap justify-start items-start'>

      <motion.div
       {...headTextAnimation}>
          <h1 
          className='sm:text-lg md:text-xl lg:text-2xl xl:text-[5rem] m-3 mb-7 p-1 text-white font-bold'>Say this instead!</h1>
          <p 
          className='sm:text-2xl xl:text-xl/8 text-md text-white mt-7 m-2 p-2 '>
          is a simple web app that helps people learn how to support someone dealing with depression.
          <br/>Users practice responding to realistic, emotionally expressive messages from an AI character <br />
          and receive gentle feedback on how supportive or unhelpful their replies are. <br />
          It’s a tool for building empathy, one conversation at a time.


          </p>
      </motion.div>

      <motion.div>
          <CustomButton handleClick={() => state.intro = false} title="Start Learning"/>
      </motion.div>
      
    </motion.div>)
  )
}

export default Home
