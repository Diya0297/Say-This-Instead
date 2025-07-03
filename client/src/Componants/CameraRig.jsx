import React, {useRef} from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import state from '../store'
import { useSnapshot } from 'valtio'

const CameraRig = ({children}) => {
  const snap = useSnapshot(state);
  const meshRef = useRef();

  useFrame((state, delta) => {

    let targetPosition = [3, -10, 25];

    if(snap.intro){
        easing.damp3(state.camera.position, targetPosition, 0.25, delta);
    }else{
        targetPosition = [0, -10, 1]
        easing.damp3(state.camera.position, targetPosition, 0.25, delta);
    }

  })

  return (
    <group ref={meshRef}>
        {children}
    </group>
  )
}

export default CameraRig
