import React, { useLayoutEffect, useState, useRef, Suspense, useEffect } from 'react'
import { Canvas, useFrame} from '@react-three/fiber'

import './style.scss'
import { Box3Helper, BoxHelper, DoubleSide } from "three";
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/three";
import { useThree } from "@react-three/fiber";
import { Html, useProgress } from '@react-three/drei'



// Drei is a really helpful library
// It has helpers for react-three-fiber
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

export class Object3D extends React.Component {
  constructor({ fileInputs = [], groups = [] }) {
    super();
    this.state = {
      fileInputs: fileInputs,
      groups: groups,
      isDragging: false
    };
    this.updateObject = this.updateObject.bind(this);
    this.updateGroups = this.updateGroups.bind(this);
    this.setIsDragging = this.setIsDragging.bind(this);
    this.floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  }

  componentDidMount() {
    console.log(this.props.fileInputs);

  }

  componentDidUpdate(prevProps) {
    if (this.props.fileInputs !== prevProps.fileInputs) {
      this.updateObject(this.props.fileInputs);
    }
    if (this.props.groups !== prevProps.groups) {
      this.updateGroups(this.props.groups);
    }

  }

  updateObject(fileInputs) {
    this.setState({
      fileInputs: fileInputs
    })
  }

  updateGroups(groups) {
    this.setState({
      groups: groups
    })
  }

  setIsDragging(value) {
    this.setState({
      isDragging: value
    })
  }






  render() {
    return (
      <div className='Object3D'>
        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          {this.state.fileInputs.length !== 0 ?
            <Object fs={this.state.fileInputs} gs={this.state.groups} setIsDragging={this.setIsDragging} floorPlane={this.floorPlane} />
            : ''}
          <Checkered />
          <PerspectiveCamera position={[0, 4, 8]} makeDefault />
          <OrbitControls minZoom={10} maxZoom={50} enabled={!this.state.isDragging} />

        </Canvas>
      </div>

    )
  }

}



const Line = ({ start, end }) => {
  const ref = useRef()
  useLayoutEffect(() => {
    ref.current.geometry.setFromPoints([start, end].map((point) => new THREE.Vector3(...point)))
  }, [start, end])
  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color="hotpink" />
    </line>
  )
}

const Checkered = () => {

  const lines = [];
  for (let i = -3.5; i <= 3.9; i = i + 0.5) {
    let pointA = [-4, i, 0];
    let pointB = [4, i, 0];
    let pointC = [i, -4, 0];
    let pointD = [i, 4, 0];
    let lineA = {
      start: pointA,
      end: pointB
    }
    let lineB = {
      start: pointC,
      end: pointD
    };
    lines.push(lineA);
    lines.push(lineB);
  }


  return (

    <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 1]}>
      <group>
        {
          lines.map((item, index) => {
            return (
              <Line key={index} start={item.start} end={item.end} />
            )
          })
        }
      </group>
    </mesh>
  );
}

const Object = ({ fs, gs, setIsDragging, floorPlane }) => {
  const [pos, setPos] = useState([0,  1, 0]);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const [model, setModel] = useState(null);
  const [ref, meshRef] = useState()

  let planeIntersectPoint = new THREE.Vector3();

  const dragObjectRef = useRef();

  const [spring, api] = useSpring(() => ({
    // position: [0, 0, 0],
    position: pos,
    scale: 1,
    rotation: [0, 0, 0],
    config: { friction: 10 }
  }));

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      if (active) {
        
        event.ray.intersectPlane(floorPlane, planeIntersectPoint);
        setPos([planeIntersectPoint.x, 1.5, planeIntersectPoint.z]);
      }

      setIsDragging(active);

      api.start({
        // position: active ? [x / aspect, -y / aspect, 0] : [0, 0, 0],
        position: pos,
        scale: active ? 1 : 1,
        
      });
      return timeStamp;
    },
    { delay: true }
  );

  useEffect(() => {


    let gltfLink = window.URL.createObjectURL(fs[0]);
    let modelF;
    const loaderGLTF = new GLTFLoader();
    loaderGLTF.load(gltfLink, function (gltf) {
      modelF = gltf.scene;
      setModel(modelF);
      URL.revokeObjectURL(gltfLink);
    }, function () { }, function () {
      URL.revokeObjectURL(gltfLink);
    });
  }, [fs])


  if (model) {
    return (
      <Suspense fallback={null}>
        <animated.mesh {...spring} {...bind()} castShadow >
          
            <primitive ref={meshRef}  object={model} scale={[0.5, 0.5, 0.5]} castShadow recieveShadow/>
            <boxHelper  args={[ref, 0xffff00]} ref={dragObjectRef}/>
         
          
          
          <meshNormalMaterial attach="material" />
        </animated.mesh>
      </Suspense>
    )
  } else {
    return null
  }


}

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}