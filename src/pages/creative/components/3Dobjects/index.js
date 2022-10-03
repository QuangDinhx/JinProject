import React, { useLayoutEffect, useState, useRef, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

import './style.scss'
import { Box3Helper, BoxHelper, DoubleSide, Group } from "three";
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useDrag, useMove } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/three";
import { useThree } from "@react-three/fiber";
import { Html, useProgress } from '@react-three/drei'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faLockOpen } from '@fortawesome/free-solid-svg-icons';



// Drei is a really helpful library
// It has helpers for react-three-fiber
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { faL, faSackXmark } from '@fortawesome/free-solid-svg-icons';

export class Object3D extends React.Component {
  constructor({ fileInputs, groups, isSearching, setData, data }) {
    super();
    this.state = {
      fileInputs: fileInputs,
      groups: groups,
      isDragging: false,
      isSearching: isSearching,
      isSearchingDone: false,
      setData: setData,
      pos: []
    };


    this.updateObject = this.updateObject.bind(this)
    this.updateGroups = this.updateGroups.bind(this);

    this.setIsDragging = this.setIsDragging.bind(this);
    this.setIsSearching = this.setIsSearching.bind(this);
    this.setIsSearchingDone = this.setIsSearchingDone.bind(this);
    this.setPos = this.setPos.bind(this)
    this.floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  }

  componentDidMount() {


  }

  componentDidUpdate(prevProps) {
    if (this.props.fileInputs !== prevProps.fileInputs) {
      this.updateObject(this.props.fileInputs);
    }
    if (this.props.groups !== prevProps.groups) {
      this.updateGroups(this.props.groups);
    }
    if (this.props.pos !== prevProps.pos) {
      this.updatePos(this.props.pos);
    }

    if (this.props.isSearching !== prevProps.isSearching) {
      if (this.props.isSearching == true) {
        this.setIsSearchingDone(false)
      }
      this.updateIsSearching(this.props.isSearching);
    }

  }
  updateObject(files) {
    this.setState({
      fileInputs: files
    })
  }

  updateGroups(gs) {
    this.setState({
      groups: gs
    })
  }

  updatePos(value) {
    this.setState({
      pos: value
    })
  }


  updateIsSearching(value) {
    this.setState({
      isSearching: value
    })
  }

  setIsDragging(value) {
    this.setState({
      isDragging: value
    })

  }

  setIsSearching(value) {
    this.setState({
      isSearching: value
    })
    this.state.setData({
      isSearching: value
    })
  }

  setIsSearchingDone(value) {
    this.setState({
      isSearchingDone: value
    },)
  }

  setPos(value) {
    let a = this.state.pos;
    a.push(value)
    this.setState({
      pos: a
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
            <Objects fs={this.state.fileInputs} gs={this.state.groups} setIsDragging={this.setIsDragging} floorPlane={this.floorPlane} Fpos={this.state.pos} isSearchingDone={this.state.isSearchingDone} data={this.props.data} setData={(prop) => { this.props.setData(prop) }} />
            : ''}
          <Checkered floorPlane={this.floorPlane} isSearching={this.state.isSearching} setIsSearching={this.setIsSearching} setPosision={this.setPos} setIsSearchingDone={this.setIsSearchingDone} />
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

const Checkered = ({ floorPlane, isSearching, setIsSearching, setPosision, setIsSearchingDone }) => {
  const [pos, setPos] = useState([0, 1.5, 0]);
  const [isSearch, setIsSearch] = useState(false);
  useEffect(() => {
    setIsSearch(isSearching)

  }, [isSearching])
  let planeIntersectPoint = new THREE.Vector3();

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
  function handleOnClick() {
    setIsSearch(!isSearch);
    setIsSearching(!isSearch);
    setPosision([pos[0], 1.5, pos[2]]);
    setIsSearchingDone(true);
  }



  const bind = useMove(
    ({ active, movement: [x, y], timeStamp, event }) => {
      if (active && isSearch) {
        event.ray.intersectPlane(floorPlane, planeIntersectPoint);
        let pX;
        pX = Math.min(4, Math.max(-4, planeIntersectPoint.x));
        let pY
        pY = Math.min(4, Math.max(-4, planeIntersectPoint.z));
        setPos([pX, 0, pY]);
      }


      return timeStamp;
    },
    { delay: true }
  );

  return (
    <group>
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 1]} {...bind()}>
        <group>
          {
            lines.map((item, index) => {
              return (
                <Line key={index} start={item.start} end={item.end} />
              )
            })
          }
          <meshNormalMaterial attach="material" />
        </group>
      </mesh>
      {isSearch &&
        <mesh position={pos} rotation={[Math.PI, 0, 0]} onClick={handleOnClick}>
          <coneGeometry

            attach="geometry"
            args={[0.1, 0.3, 32]}
          />
          <meshNormalMaterial attach="material" />
        </mesh>
      }

    </group>

  );
}
export class Objects extends React.Component {

  constructor({ fs, gs, setIsDragging, floorPlane, Fpos, isSearchingDone, data, setData }) {
    super();
    this.state = {
      pos: Fpos,
      files: fs,
      isSearchDone: isSearchingDone,
      selected: [],
      lockedList:[],
      setIsDragging: setIsDragging,
      floorPlane: floorPlane,

    }
    console.log(fs)
    this.isDragging = false;
    this.updatePos = this.updatePos.bind(this);
    this.updateIsSearchingDone = this.updateIsSearchingDone.bind(this);
    this.updateFiles = this.updateFiles.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleLock = this.handleLock.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.handleUnLock = this.handleUnLock.bind(this);

  }

  componentDidUpdate(prevProps) {
    // console.log(this.props.fs);
    // console.log(prevProps.fs)

    if (this.props.fs !== prevProps.fs) {
      this.updateFiles(this.props.fs);
    }
    if (this.props.Fpos !== prevProps.Fpos) {
      this.updatePos(this.props.Fpos);
    }
    if (this.props.isSearchingDone !== prevProps.isSearchingDone) {
      this.updateIsSearchingDone(this.props.isSearchingDone);
    }

  }


  updatePos(Fpos) {

    this.setState({
      pos: Fpos
    })
  }

  updateFiles(fs) {
    this.setState({
      files: fs
    })
  }

  updateIsSearchingDone(value) {
    this.setState({
      isSearchDone: value
    })
  }

  handleSelect(e, key) {
    if (e.ctrlKey) {
      let selectA = [...this.state.selected];

      if (!selectA.includes(key)) {
        selectA.push(key)
      } else {
        selectA = selectA.filter((item) => item !== key);
      }
      this.setState({
        selected: selectA
      })


    } else {
      if (!this.state.selected.includes(key)) {
        this.setState({ selected: [key] })
      } else {
        this.setState({ selected: [] })
      }
    }
  }

  handleContextMenu(e, index) {
    const menuItems = [
      {
        display: this.state.lockedList.includes(index) ?'Unlock':'Lock',
        icon: this.state.lockedList.includes(index) ? <FontAwesomeIcon icon={faLockOpen} /> : <FontAwesomeIcon icon={faLock} />,
        event: () => {
          if (this.state.lockedList.includes(index)) {
            this.handleUnLock(index)
          } else {
            this.handleLock(index)
          }
        },
      },
      {
        display: 'Delete',
        icon: <FontAwesomeIcon icon={faTrash} />,
        event: () => {
          this.handleRemove(index)
        },
      },
    ]
    const { clientX, clientY } = e;
    const contextMenuPos = {
      x: clientX,
    }

    this.props.setData({
      menuItems: menuItems,
      target: null,
      contextMenuPos: {
        x: clientX,
        y: clientY
      }
    })
  }

  handleRemove(index) {
    const newfileInputs = this.props.data.fileInputs.filter((item, i) => i !== index);
    this.props.setData({
      fileInputs: newfileInputs
    })
    if(this.state.selected.includes(index)){
      let updated = [...this.state.selected];
      updated = updated.filter((item, i) => item !== index);
      this.setState({selected:updated})
    }
    if(this.state.lockedList.includes(index)){
      let updated = [...this.state.lockedList];
      updated = updated.filter((item, i) => item !== index);
      this.setState({lockedList:updated})
    }
  }

  handleLock(index) {
    let updated = [...this.state.lockedList];
    updated.push(index);
    this.setState({lockedList:updated});
  }

  handleUnLock(index) {
    console.log(index)
    console.log(this.state.lockedList)
    let updated = [...this.state.lockedList];
    updated = updated.filter((item, i) => item !== index);
    this.setState({lockedList:updated})
  }

  render() {
    return (
      <>
        {this.state.files.map((e, i) => {
          if (this.state.pos[i]) {
            return (
              <group key={i}>
                {this.state.pos[i] && <Object file={e} setIsDragging={this.state.setIsDragging} floorPlane={this.state.floorPlane} Fpos={this.state.pos[i]} isSearchDone={this.state.isSearchDone}
                  status={this.state.selected.includes(i)} click={(e) => this.handleSelect(e, i)} isLocked={this.state.lockedList.includes(i)} handleContextMenu={(e) => this.handleContextMenu(e, i)} />}
              </group>
            )
          } else {
            return null
          }
        })}
      </>
    )
  }

}


const Object = ({ file, setIsDragging, floorPlane, Fpos, isSearchDone, status, click, isLocked, handleContextMenu }) => {
  const [pos, setPos] = useState(Fpos);
  const [isSearchingDone, setIsSearchingDone] = useState(isSearchDone);


  useEffect(() => {

    if (isSearchDone == true) {
      setIsSearchingDone(true);
    }

  }, [isSearchDone])


  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const [model, setModel] = useState(null);
  const [ref, meshRef] = useState();

  let count = 0;


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
      if (active && !isLocked && status) {
        event.ray.intersectPlane(floorPlane, planeIntersectPoint);
        setPos([planeIntersectPoint.x, 1.5, planeIntersectPoint.z]);
      }
      if (status) {
        setIsDragging(active);
      } else {
        setIsDragging(false)
      }



      api.start({


        scale: active ? 1 : 1,

      });
      return timeStamp;
    },
    { delay: true }
  );



  useEffect(() => {


    let gltfLink = window.URL.createObjectURL(file[0]);
    let modelF;
    const loaderGLTF = new GLTFLoader();
    loaderGLTF.load(gltfLink, function (gltf) {
      modelF = gltf.scene;
      setModel(modelF);
      URL.revokeObjectURL(gltfLink);
    }, function () { }, function () {
      URL.revokeObjectURL(gltfLink);
    });

  }, [file])


  if (model && pos !== null && isSearchingDone) {
    return (
      <Suspense fallback={null} >

        <animated.mesh {...spring} {...bind()} castShadow position={pos} >
          <primitive ref={meshRef} object={model} scale={[0.5, 0.5, 0.5]} castShadow recieveShadow />
          <boxHelper args={[ref, 0xffff00]} ref={dragObjectRef} visible={!isLocked && status} onPointerDown={(e) => { if (!isLocked) click(e) }} onContextMenu={(e) => { handleContextMenu(e) }} />

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