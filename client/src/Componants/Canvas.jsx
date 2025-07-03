import React, {useState, useEffect} from 'react'
import PlaneRenderer from "./Plane"
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import {  Stars, OrbitControls } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import state from '../store'
import {easing} from 'maath'
import {Environment, Center} from '@react-three/drei'
import CameraRig from './CameraRig'

const CanvasModel = () => {
  const snap = useSnapshot(state);
    
  return (
    <Canvas 
        camera={{position:[4,-10,17], fov:19}}>
        <ambientLight intensity={0.5} />
        <Environment preset="night"/>
        <directionalLight position={[0,1,2]} color="#FFFFFF" intensity={0.5}/>
        <directionalLight position={[0,1,-2]} color="#FFFFFF" intensity={1}/>
        <Stars
            radius={100} // Radius of the sphere containing the stars
            depth={50}   // Depth of the starfield
            count={6000} // Number of stars
            factor={10}   // Size factor of the stars
            saturation={1} // Saturation of the stars (0-1)
            fade={true}  // Whether stars fade in and out
        />
        <CameraRig>
          <Center>
            <PlaneRenderer/>
          </Center>
        </CameraRig>
        
        
        <OrbitControls/>
      
    </Canvas>
  )
}

export default CanvasModel
