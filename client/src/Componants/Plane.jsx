import React, {useRef, useEffect, useState} from 'react'
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'



const PlaneRenderer = () => {
  const planeRef = useRef();
  const [prevHover, setPrevHover] = useState([]);

  const {width, height, widthSegments, heightSegments, color} = useControls({
    width:{value: 19, min:1, max:25, step:1},
    height:{value: 19, min: 1, max: 25, step: 1},
    widthSegments: {value: 17, min:1, max:25, step:1},
    heightSegments: {value: 17, min:1, max:25, step:1},
    color: '#ffc8dd'
  })
  
  useEffect(() => {
    if(planeRef.current){
      const { array } = planeRef.current.geometry.attributes.position;
      const count = planeRef.current.geometry.attributes.position.count;

      const colorArray = new Float32Array(count * 3);

      
      for(let i = 0 ; i<array.length; i+=3){
        const x = array[i];
        const y = array[i + 1];
        const z = array[i + 2];
        const randomOffset = (Math.random() - 0.5) * 0.3;
        
        array[i] = x + randomOffset;
        array[i + 1] = y + randomOffset;
        array[i+2] = z + randomOffset;

        colorArray[i] = 0;
        colorArray[i+1] = 0.4667;
        colorArray[i+2] = 0.7137;
      }

      planeRef.current.geometry.attributes.position.needsUpdate = true;
      planeRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3))
      
    }
  }, [width, height, widthSegments, heightSegments]);

  useFrame((state, delta) => {
    if(!planeRef.current){return;}

    const { array } = planeRef.current.geometry.attributes.position;
    const time = state.clock.getElapsedTime() * 0.2;

    for(let i = 0 ; i<array.length; i+=3){
        const x = array[i];
        const y = array[i + 1];
        
        const waveZ = 0.3 * Math.sin(x * 2 + time) + 0.3 * Math.cos(y * 3 + time * 1.5)
        array[i+2] = waveZ;
    }
    planeRef.current.geometry.attributes.position.needsUpdate = true
    planeRef.current.geometry.computeVertexNormals()

  })

  const addHoverEffect = (colorAttr, abc) => {

    if(!colorAttr || !abc){return}
    colorAttr.setXYZ(prevHover[0], 0, 0.4667, 0.7137);
    colorAttr.setXYZ(prevHover[1], 0, 0.4667, 0.7137);
    colorAttr.setXYZ(prevHover[2], 0, 0.4667, 0.7137);
    
    const {a, b, c} = abc;
    colorAttr.setXYZ(a, 0, 0.71, 0.85);
    colorAttr.setXYZ(b, 0, 0.71, 0.85);
    colorAttr.setXYZ(c, 0, 0.71, 0.85);
    colorAttr.needsUpdate = true;
    const prevVer = [a,b,c]
    setPrevHover(prev => prevVer);

  }


  return (
    <group>
        <mesh 
        onPointerMove={(e) => addHoverEffect(e.object.geometry.attributes.color, e.face)}
        ref={planeRef}>
          <planeGeometry  
          args={[width, height, widthSegments, heightSegments]}/>
          <meshPhongMaterial 
          vertexColors={true}
          color={color}
          shininess={100} 
          specular={0x406080} 
          roughness={0.7}
          flatShading={true}
          side={THREE.DoubleSide} 
          
          />
        </mesh>
    </group>
       
              
   
  )
}

export default PlaneRenderer
