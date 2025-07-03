import React from 'react'
import {motion} from "framer-motion"
import { slideAnimation, fadeAnimation } from '../config/motion'


const CustomButton = ({handleClick, customStyles, title}) => {
  return (
    <motion.div
    className='relative'
    {...slideAnimation('up')}
    >
      <motion.button
      initial={{ 
        boxShadow: "0 0 0px rgba(0, 0, 255, 0.5)",
        }}
      whileHover={{
        boxShadow: "0 0 20px rgba(153, 195, 240, 0.8)",
        transition: { duration: 0.4, ease: "easeInOut" },
      }}
      className={ `button ${customStyles}`}
      onClick={handleClick}
      >
        {title}
      </motion.button>
    </motion.div>
  )
}

export default CustomButton
