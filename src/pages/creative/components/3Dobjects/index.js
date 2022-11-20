import React, { useLayoutEffect, useState, useRef, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

import './style.scss'
import { Box3Helper, BoxHelper, DoubleSide, Group, Mesh, PlaneGeometry } from "three";
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useDrag, useMove } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/three";
import { useThree } from "@react-three/fiber";
import { Html, Plane, useProgress } from '@react-three/drei'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownLeftAndUpRightToCenter, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { faObjectGroup } from '@fortawesome/free-solid-svg-icons';
import { faUpDownLeftRight } from '@fortawesome/free-solid-svg-icons';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ScreenCapture } from './ScreenCapture';
import opensea from '../../../../assets/opensea-logo.png';



// Drei is a really helpful library
// It has helpers for react-three-fiber
import { Controls, useControl } from 'react-three-gui/dist';
import { OrbitControls, PerspectiveCamera, useHelper, TransformControls, Text } from "@react-three/drei";
import { faL, faSackXmark } from '@fortawesome/free-solid-svg-icons';
import { matchRoutes } from 'react-router';

let history = [{
  files: [],
  pos: [],
  rotate: [],
  scale: [],
  lock:[]

}]

let flag = 0;

export const Object3D = props => {

  const [isDragging, setIsDragging] = useState(false);

  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setIsSearching(props.data.isSearching);
  }, [props.data.isSearching])

  const [isSearchingDone, setIsSearchingDone] = useState(false);

  const [pos, setPos] = useState([]);

  const [rotates, setRotates] = useState([]);

  const [scales, setScales] = useState([]);

  const [lockedList,setLockedList] = useState([])

  // useEffect(()=>{
  //   window.addEventListener('keydown',keydownZ)
    
  //   return ()=>{
  //     window.removeEventListener("keypress",keydownZ)
      
  //   }
  // },[])

  // useEffect(()=>{
    
  //   window.addEventListener('keydown',keydownY)
  //   return ()=>{
      
  //     window.removeEventListener("keypress",keydownY)
  //   }
  // },[])


  // function keydownZ(e){
  //   e.preventDefault();
  //   if(e.keyCode===90 && e.ctrlKey){
  //     console.log(e)
  //     handleUndo()
  //   }
  // }

  // function keydownY(e){
  //   e.preventDefault();
  //   if(e.keyCode===89 && e.ctrlKey){
  //     handleMoveOn()
  //   }
  // }




  function updateHistory(files, poss, rotatee, scalee,lock) {

    history = history.slice(0, flag + 1);
    history = history.concat([{
      files: files,
      pos: poss,
      rotate: rotatee,
      scale: scalee,
      lock:lock
    }])
    
    flag += 1;




  }

  function handleUndo() {

    if (flag == 0) {
      return
    }

    flag -= 1;
    const { files, pos, rotate, scale,lock } = history[flag];

    props.setData({
      fileInputs: files ? files : []
    })
    setPos(pos)
    setRotates(rotate)
    setScales(scale)
    setLockedList(lock)

  }

  function handleMoveOn() {

    if (flag == history.length - 1) {
      return;
    }

    flag += 1
    let { files, pos, rotate, scale,lock } = history[flag];

    props.setData({
      fileInputs: files ? files : []
    })
    setPos(pos)
    setRotates(rotate)
    setScales(scale)
    setLockedList(lock)

  }

  function exacuteHistory() {
    history = history.slice(0, flag + 1);
  }




  const ref = useRef()



  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

  function setIsSearchingf(value) {
    setIsSearching(value)
    props.setData({
      isSearching: value
    })
  }
  function setIsDraggingf(value) {
    if (value !== isDragging) {

      setIsDragging(value);
    }
  }

  function setIsSearchingDonef(value) {
    setIsSearchingDone(value)
  }

  function addPos(value) {

    let a = pos.map(item => ([...item]));
    a.push([value])
    setPos(a)
    let b = rotates.map(item => ([...item]));
    if(b.length !== a.length){
      b.push([[0, 0, 0]]);
    }
    setRotates(b);
    let c = scales.map(item => ([...item]));
    if(c.length !== a.length){
      c.push([[1, 1, 1]]);
    }
    setScales(c);
    let cloneData = props.data.fileInputs.map(item => ([...item]))
    updateHistory(cloneData, a, b, c,lockedList)
  }





  return (



    <div className='Object3D' data-theme={props.data.mode}>

      <ScreenCapture onEndCapture={(e) => {
        props.setData({
          takeScreenShotImg: <img src={e} id='imageToCapture' />
        })
      }}
        data={props.data} setData={(prop) => { props.setData(prop) }}
      />

      <div className="toolbox">
        <button className="mybtn btn-arrow btn-border revrese" onClick={handleUndo}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-right"
              >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Undo
          </span>
        </button>
        <button className="mybtn btn-arrow btn-border" onClick={handleMoveOn}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-right"
              >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Redo
          </span>
        </button>
      </div>


      <div className='captureAll'>
        <Canvas shadows={props.data.disableAllShadow ? false : true} gl={{ preserveDrawingBuffer: true }}
         raycaster={{ params: { Line: { threshold: 0.1 } } }}
        >
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow={props.data.disableAllShadow ? false : true} />
          <pointLight position={[-10, 10, -10]} castShadow={props.data.disableAllShadow ? false : true} />
          {props.data.fileInputs.length !== 0 && <Objects fs={props.data.fileInputs} setIsDragging={setIsDraggingf} floorPlane={floorPlane} Fpos={pos} Frotate={rotates} Fscale={scales} lockedList={lockedList} setLockedList={setLockedList}
            isSearchingDone={isSearchingDone} data={props.data} setData={(prop) => { props.setData(prop) }} updateHistory={(files, pos, rotate, scale,lock) => { updateHistory(files, pos, rotate, scale,lock) }}
            setPos={(prop) => { setPos(prop) }} setRotates={(prop) => { setRotates(prop) }} setScales={(prop) => { setScales(prop) }} />}
          <Background data={props.data} setData={(prop) => { props.setData(prop) }}></Background>
          <Checkered floorPlane={floorPlane} isSearching={isSearching} setIsSearching={setIsSearchingf} setPosision={addPos} setIsSearchingDone={setIsSearchingDonef}
            data={props.data} setData={(prop) => { props.setData(prop) }} />
          <PerspectiveCamera position={[0, 6, 12]} makeDefault />
          <OrbitControls minZoom={10} maxZoom={50} enabled={!isDragging} />

        </Canvas>
      </div>
      {!props.data.dontShow &&
        <Popup data={props.data} setData={(prop) => { props.setData(prop) }} />
      }



    </div>


  )


}
const Popup = props => {

  function handleClose() {
    props.setData({
      showPopup: false
    })
  }
  function handleDontShow(e) {

    if (e.target.checked == true) {
      props.setData({
        dontShow: true
      })
    }
  }

  return (
    <div className={`popup ${props.data.showPopup ? '' : 'hide'}`}>
      <div className='popup_inner' onBlur={handleClose}>
        <button className="circle boxShadow" data-animation="fadeOut" data-remove="3000" onClick={handleClose} />
        <div className="thankyou-wrapper">
          <h1><img src="http://montco.happeningmag.com/wp-content/uploads/2014/11/thankyou.png" alt="thanks" /></h1>
          <p>for using our service, we are planning more improvements with your support through the NFT channel... </p>

          <div className={`subcontent ${props.data.showPopup ? '' : 'hide'}`}>
            <a href="https://opensea.io/DEZAIN3D" id="logo">
              <img src={opensea} >
              </img></a>
            <a href="https://opensea.io/DEZAIN3D">
              <button className="custom-btn btn-12" id="buy"><span>Buy now</span><span>Let's go!</span></button>
            </a>
            <div className='notyf'>
              <input
                id="native-checkbox"
                type="checkbox"
                onChange={handleDontShow}
              ></input>
              <label
              >
                Don't show it again.
              </label>
            </div>
          </div>


        </div>

      </div>
    </div>
  );
}



const Background = props => {
  const [material, setMaterial] = useState(null)
  const plane = new THREE.BoxGeometry(60, 60, 60);

  useEffect(() => {
    if (props.data.background !== null) {
      const texture = new THREE.TextureLoader().load(
        props.data.background.props.src,
        function (texture) {
          // do something with the texture

        },
        // Function called when download progresses
        function (xhr) {

        },
        // Function called when download errors
        function (xhr) {

        }
      )
      texture.magFilter = THREE.LinearFilter;
      texture.minFilter = THREE.LinearFilter;
      const shader = THREE.ShaderLib["equirect"];
      const material = new THREE.ShaderMaterial({
        uniforms: shader.uniforms,
        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      material.map = true;
      material.uniforms.tEquirect.value = texture;
      setMaterial(material);
    } else {
      setMaterial(null)
    }

  }, [props.data.background]);



  return (
    <>
      {material &&
        <mesh geometry={plane} material={material}>
        </mesh>
      }
    </>

  )
}


const Line = ({ start, end, color }) => {
  const ref = useRef()
  useLayoutEffect(() => {
    ref.current.geometry.setFromPoints([start, end].map((point) => new THREE.Vector3(...point)))
  }, [start, end])
  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color={color} />
    </line>
  )
}

const Checkered = ({ floorPlane, isSearching, setIsSearching, setPosision, setIsSearchingDone, data, setData }) => {
  const [pos, setPos] = useState([0, 1.5, 0]);
  const [isSearch, setIsSearch] = useState(false);

  const [cdata, setCdata] = useState(data.checkBoard)
  const [lines, setLines] = useState([])

  useEffect(() => {
    setIsSearch(isSearching)

  }, [isSearching])

  useEffect(() => {

    setCdata(data.checkBoard)
    let caroSize = data.checkBoard.caroSize / 2;
    let maxS = data.checkBoard.size / 2;
    let maxSs = data.checkBoard.size / 2 - caroSize;
    let lines = [];


    for (let i = -maxSs; i <= maxSs; i = i + caroSize) {
      let pointA = [-maxS, i, 0];
      let pointB = [maxS, i, 0];
      let pointC = [i, -maxS, 0];
      let pointD = [i, maxS, 0];
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

    setLines([...lines])

  }, [data.checkBoard])


  const planeIntersectPoint = new THREE.Vector3();



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
        pX = Math.min(cdata.size / 2, Math.max(-cdata.size / 2, planeIntersectPoint.x));
        let pY
        pY = Math.min(cdata.size / 2, Math.max(-cdata.size / 2, planeIntersectPoint.z));
        setPos([pX, 0, pY]);
      }

      return timeStamp;
    },
    { delay: true }
  );

  return (
    <>
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 1]} {...bind()}>
        <group>
          {!cdata.isHideCaro &&
            lines.map((item, index) => {
              return (
                <Line key={index} start={item.start} end={item.end} color={`#${cdata.caroColor.r.toString(16)}${cdata.caroColor.g.toString(16)}${cdata.caroColor.b.toString(16)}`} />
              )
            })
          }
          {
            !cdata.isHidePlane &&
            <mesh receiveShadow={cdata.isRecievieShadow} >
              <planeGeometry args={[cdata.size, cdata.size, 1, 1]} />
              <meshPhongMaterial attach="material" color={`#${cdata.planeColor.r.toString(16)}${cdata.planeColor.g.toString(16)}${cdata.planeColor.b.toString(16)}`} side={THREE.DoubleSide} />
            </mesh>
          }


        </group>
      </mesh>
      {isSearch &&
        <mesh position={[pos[0], pos[1], pos[2]]} rotation={[Math.PI, 0, 0]} onClick={handleOnClick}>
          {/* <boxGeometry args={}/> */}
          <coneGeometry

            attach="geometry"
            args={[0.1, 0.3, 32]}
          />
          <meshNormalMaterial attach="material" />
        </mesh>
      }

    </>

  );
}
export const Objects = props => {
  const debug = false

  const [selected, setSelected] = useState([]);
  const [focus, setFocus] = useState([]);
  
  const [enabled, setEnabled] = useState([]);
  const [mode, setMode] = useState('translate');


  const [box, setBox] = useState(null);

  const [extraPos, setExtraPos] = useState([]);
  const [extraRotate, setExtraRotate] = useState([]);
  const [extraScale, setExtraScale] = useState([]);
  const [selectEnable, setSelectEnable] = useState(true);
  const [refSelect, setRefSelect] = useState([]);
  const groupRef = useRef();
  let needto = false;

  const gl = useThree((state) => state.gl)

  useEffect(() => {
    if (props.data.handleRemove == null) {
      props.setData({
        handleRemove: (index) => {
          handleRemove(index, selected)
        }
      })
    }


  })

  const [isMax, setMax] = useState(false);
  useEffect(() => {
    let isLimit = props.data.objectCount >= props.data.limitObjects;
    setMax(isLimit)
  }, [props.data.objectCount])

  function handleCopy(index, ref) {
    if (!isMax) {
      if (props.data.isSearching == false ) {
        

        
        let listFiles = (props.data.fileInputs).map(item => ([...item]));
        
        
        let newFile = {
          name: `Clone[${index}]`,
          isGltf: true,
          model: ref,
          isImg: false,
          Fpos: null
        }
        listFiles.push([newFile]);
        props.setData({
          fileInputs: listFiles,
        })
        props.setData({
          isSearching: true
        })
        let count = props.data.objectCount + 1;
        props.setData({
          objectCount: count,
        })
        let newR = (props.Frotate).map(item => ([...item]));
        let newS = (props.Fscale).map(item => ([...item]));
        let cloneR = newR[index]
        let cloneS = newS[index]
        newR.push(cloneR)
        newS.push(cloneS)
        props.setRotates(newR)
        props.setScales(newS)
      }
    }

  }
  useEffect(()=>{
    if(enabled.length == 0){
      
      setSelectEnable(true)
    }else{
      setSelected([])
      setSelectEnable(false)
    }
  },[enabled])

  function handleSelect(e, key,ref) {
    
    if (selectEnable && props.data.isSearching == false) {
      if (e && e.ctrlKey) {
        let selectA = [...selected];
        let refSelectA = [...refSelect]

        if (!selectA.includes(key)) {
          selectA.push(key);
          refSelectA.push({
            index:key,
            ref:ref
          })
          
        } else {
          selectA = selectA.filter((item) => item !== key);
          refSelectA = refSelectA.filter((item)=>item.index !== key)
        }
        setSelected(selectA)
        setRefSelect(refSelectA)

      } else {
        if (!selected.includes(key)) {
          setSelected([key]);
          setRefSelect([{
            index:key,
            ref:ref
          }])
          
        } else {
          setSelected([])
          setRefSelect([])
        }
      }
    }

  }

  function handleFocus(key) {
    if (!focus.includes(key)) {
      setSelected([key])
    } else {
      setSelected([])
    }
  }

  function handleContextMenu(e, index, ref) {
    

    if (props.data.isSearching == false) {
      const menuItems1 = [
        {
          display: props.lockedList.includes(index) ? 'Unlock' : 'Lock',
          icon: props.lockedList.includes(index) ? <FontAwesomeIcon icon={faLockOpen} /> : <FontAwesomeIcon icon={faLock} />,
          event: () => {
            if (props.lockedList.includes(index)) {
              handleUnLock(index)
            } else {
              handleLock(index)
            }
          },
        },

        {
          display: 'Delete',
          icon: <FontAwesomeIcon icon={faTrash} />,
          event: () => {
            handleRemove(index, selected)
          },
        },
        {
          display: (enabled.includes(index) && mode == 'translate') ? 'Cancel Move' : 'Move',
          icon: <FontAwesomeIcon icon={faUpDownLeftRight} />,
          event: () => {
            if (enabled.includes(index) && mode == 'translate') {
              setEnabled([])
              setSelectEnable((true))
            } else {
              handleEnableTranslate(index)
              setSelectEnable((false))
            }
          },
        },
        {
          display: (enabled.includes(index) && mode == 'rotate') ? 'Cancel Rotate' : 'Rotate',
          icon: <FontAwesomeIcon icon={faRotate} />,
          event: () => {
            if (enabled.includes(index) && mode == 'rotate') {
              setEnabled([])
              setSelectEnable((true))
            } else {
              handleEnableRotate(index)
              setSelectEnable((false))
            }
          },
        },
        {
          display: (enabled.includes(index) && mode == 'scale') ? 'Cancel Scale' : 'Scale',
          icon: <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} />,
          event: () => {
            if (enabled.includes(index) && mode == 'scale') {
              setEnabled([])
              setSelectEnable((true))
            } else {
              handleEnableScale(index)
              setSelectEnable((false))
            }
          },
        },
        {
          display: 'Download',
          icon: <FontAwesomeIcon icon={faDownload} />,
          event: () => {
            handleDownload(ref)
          },
        },
        {
          display: 'Copy',
          icon: <FontAwesomeIcon icon={faCopy} />,
          mes: isMax ? 'Got the limit' : undefined,
          event: () => {
            handleCopy(index, ref)
          },
        },
        {
          display: 'View',
          icon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
          event: () => {
            handleViewer(ref, index)
          },
        }
      ]
      const menuItems2 = [
        {
          display: 'Add to Group',
          icon: <FontAwesomeIcon icon={faObjectGroup} />,
          event: () => {
            if (selected.length > 1) {
              handleGrouped()
            }
          },
        },
      ]
      // const menuItems = selected.length > 1 ? [menuItems2[0], menuItems1[0], menuItems1[1]] : [...menuItems1]
      let menuItems = [];
      if (selected.length > 1) {
        menuItems.push(menuItems2[0])
      }
      if (selected.length <= 1) {
        menuItems.push(menuItems1[0]);
      }
      if (!props.lockedList.includes(index)) {
        menuItems.push(menuItems1[1])

        if (selected.length <= 1) {
          menuItems.push(menuItems1[7])
          menuItems.push(menuItems1[6])
          menuItems.push(menuItems1[2])
          menuItems.push(menuItems1[3])
          menuItems.push(menuItems1[4])
        }
      }
      if (selected.length <= 1) {
        menuItems.push(menuItems1[5])
      }



      const { clientX, clientY } = e;
      const contextMenuPos = {
        x: clientX,
      }

      props.setData({
        menuItems: menuItems,
        target: null,
        contextMenuPos: {
          x: clientX,
          y: clientY
        }
      })
    }



  }

  function handleViewer(ref, index) {
    props.setData({
      viewerTarget: {
        ref: ref.clone(),
        index: index
      }
    })
  }

  function handleDownload(ref) {
    props.setData({
      downloadTarget: ref
    })
    props.data.switchChanel(6)
  }

  function handleRemove(index, selected) {
    if (props.data.viewerTarget !== null) {
      if (selected.includes(props.data.viewerTarget.index)) {
        props.data.setData({
          viewerTarget: null
        })
      }
    }

    if (selected.length >= 2) {

      let newfileInputs = [...props.data.fileInputs];
      let newFpos = [...props.Fpos];
      let newFrotate = [...props.Frotate];
      let newFscale = [...props.Fscale];
      let count = props.data.objectCount;



      selected.forEach((index, i) => {
        count = count - newfileInputs[index].length;
        if (newfileInputs[index].length >= 2) {

          let newExtraPos = [...extraPos];
          newExtraPos = newExtraPos.filter((e) => e.index !== index);

          let newExtraRotate = [...extraRotate];
          newExtraRotate = newExtraRotate.filter((e) => e.index !== index);

          let newExtraScale = [...extraScale];
          newExtraScale = newExtraScale.filter((e) => e.index !== index);
          setExtraPos(newExtraPos);
          setExtraRotate(newExtraRotate);
          setExtraScale(newExtraScale);
        }

        newFrotate[index] = [];
        newFscale[index] = [];
        newFpos[index] = [];
        newfileInputs[index] = [];
      })

      props.setData({
        objectCount: count
      })
      props.setData({
        fileInputs: newfileInputs
      })

      props.setPos(newFpos);
      props.setRotates(newFrotate);
      props.setScales(newFscale);
      props.updateHistory(newfileInputs, newFpos, newFrotate, newFscale,props.lockedList);
    } else {

      let newfileInputs = [...props.data.fileInputs];
      let newFpos = [...props.Fpos];
      let newFrotate = [...props.Frotate];
      let newFscale = [...props.Fscale];
      let count = props.data.objectCount;
      count = count - newfileInputs[index].length;

      if (newfileInputs[index].length >= 2) {

        let newExtraPos = [...extraPos];
        newExtraPos = newExtraPos.filter((e) => e.index !== index);

        let newExtraRotate = [...extraRotate];
        newExtraRotate = newExtraRotate.filter((e) => e.index !== index);

        let newExtraScale = [...extraScale];
        newExtraScale = newExtraScale.filter((e) => e.index !== index);
        setExtraPos(newExtraPos);
        setExtraRotate(newExtraRotate);
        setExtraScale(newExtraScale);
      }
      newFrotate[index] = [];
      newFscale[index] = [];
      newFpos[index] = [];
      newfileInputs[index] = [];

      props.setData({
        objectCount: count
      })
      props.setData({
        fileInputs: newfileInputs
      })
      props.setPos(newFpos);
      props.setRotates(newFrotate);
      props.setScales(newFscale);
      props.updateHistory(newfileInputs, newFpos, newFrotate, newFscale);



    }

    if (selected.includes(index)) {
      let updated = [...selected];
      updated = updated.filter((item, i) => item !== index);
      setSelected(updated)
    }
    if (props.lockedList.includes(index)) {
      let updated = [...props.lockedList];
      updated = updated.filter((item, i) => item !== index);
      props.setLockedList(updated)
    }
  }

  function handleLock(index) {

    let updated = [...props.lockedList];
    updated.push(index);
    props.setLockedList(updated)
    props.updateHistory(props.data.fileInputs,props.Fpos,props.Frotate,props.Fscale,updated)
  }

  function handleUnLock(index) {
    let updated = [...props.lockedList];
    updated = updated.filter((item, i) => item !== index);
    props.setLockedList(updated);
    props.updateHistory(props.data.fileInputs,props.Fpos,props.Frotate,props.Fscale,updated);
    setSelected([index])
  }

  

  function handleGrouped() {
    needto = true;
    let array = [...selected]
    let refA = [...refSelect]
    let groupIndex = array[0];
    array.forEach((e, i) => {
      if (e <= groupIndex) {
        groupIndex = e
      }
    });




    let pushAr = array.filter((e) => e !== groupIndex);

    let fileInputUp = props.data.fileInputs.map(item => ([...item]));
    let posUp = props.Fpos.map(item => ([...item]));
    let rotateUp = props.Frotate.map(item => ([...item]));
    let scaleUp = props.Fscale.map(item => ([...item]));
   


    let group = new THREE.Group();

    console.log(posUp)
    console.log(refA)
    
    refA.forEach((item)=>{
      let cloneRef = item.ref.clone();
      console.log(cloneRef);
      cloneRef.position.x = posUp[item.index][0][0]
      cloneRef.position.y = posUp[item.index][0][1] - 1.5;
      cloneRef.position.z = posUp[item.index][0][2]
      cloneRef.rotation.x = rotateUp[item.index][0][0]
      cloneRef.rotation.y = rotateUp[item.index][0][1]
      cloneRef.rotation.z = rotateUp[item.index][0][2]
      cloneRef.scale.x = scaleUp[item.index][0][0]
      cloneRef.scale.y = scaleUp[item.index][0][1]
      cloneRef.scale.z = scaleUp[item.index][0][2]
      group.add(cloneRef)
    })
    console.log(group)
    array.forEach((item)=>{
      if(item == groupIndex){
        fileInputUp[item] = [{
          name:`Group[${item}]`,
          isGroup:true,
          model:group,
          isGltf:true,
          isImg:false,
          isGeo:false
          
        }]
  
        
        posUp[item] = [[0,posUp[item][0][1],0]];
        rotateUp[item] = [[0,0,0]];
        scaleUp[item] = [[1,1,1]];
      }else{
        fileInputUp[item] = []
        posUp[item] = [];
        rotateUp[item] = [];
        scaleUp[item] = [];
      }
    })

    

    props.setPos(posUp);
    props.setScales(scaleUp);
    props.setRotates(rotateUp);
    setSelected([]);
    setRefSelect([]);

    props.setData({
      fileInputs: fileInputUp
    })
    props.updateHistory(fileInputUp, posUp, rotateUp,scaleUp,props.lockedList);
    


  }

  function setObjectPos(a, b, value) {
    let newArr = (props.Fpos).map(item => ([...item]));
    if (equal(newArr[a][b], value)) {
      newArr[a][b] = value
      props.setPos(newArr);
      let newR = (props.Frotate).map(item => ([...item]));
      let newS = (props.Fscale).map(item => ([...item]));
      props.updateHistory(props.data.fileInputs, newArr, newR, newS,props.lockedList);
    }

  }

  function setObjectRotate(a, b, value) {
    let newArr = (props.Frotate).map(item => ([...item]))
    if (equal(newArr[a][b], value)) {
      let clone = [newArr[a][b][0] + value[0],newArr[a][b][1] + value[1],newArr[a][b][2] + value[2]]      
      newArr[a][b] = clone
      props.setRotates(newArr);
      let newP = (props.Fpos).map(item => ([...item]));
      let newS = (props.Fscale).map(item => ([...item]));
      props.updateHistory(props.data.fileInputs, newP, newArr, newS,props.lockedList);
    }

  }

  function setObjectScale(a, b, value) {
    let newArr = (props.Fscale).map(item => ([...item]));
    if (equal(newArr[a][b], value)) {
      
      newArr[a][b] = value
      props.setScales(newArr);
      let newP = (props.Fpos).map(item => ([...item]));
      let newR = (props.Frotate).map(item => ([...item]));
      props.updateHistory(props.data.fileInputs, newP, newR, newArr,props.lockedList);
    }

  }
  function equal(a, b) {
    if (a[0] !== b[0] || a[1] !== b[1] || a[2] !== b[2]) {
      return true
    } else {
      return false
    }
  }

  function handleEnableTranslate(index) {
    handleEnable(index);
    setMode('translate');
  }

  function handleEnableRotate(index) {
    handleEnable(index);
    setMode('rotate');
  }

  function handleEnableScale(index) {
    handleEnable(index);
    setMode('scale')
  }

  function handleEnable(index) {
    setEnabled([index])
  }



  return (

    <animated.mesh ref={groupRef}>
      {props.fs.map((e, i) => {

        return (
          <group key={i}>
            
            {(props.Fpos[i] && e.length == 1 && e.length == props.Fpos[i].length) &&
              <>
                <Object file={e[0]} setIsDragging={props.setIsDragging} floorPlane={props.floorPlane}
                  Fpos={props.Fpos[i][0]}
                  Frotate={props.Frotate[i][0]}
                  Fscale={props.Fscale[i][0]}
                  isSearchDone={props.isSearchingDone}
                  status={selected.includes(i)} click={(e,ref) => handleSelect(e, i,ref)} focus={() => handleFocus(i)} isFocus={focus.includes(i)} isLocked={props.lockedList.includes(i)} 
                  handleContextMenu={(e, ref) => handleContextMenu(e, i, ref)} isGrouped={false}
                  setObjectPos={(value) => setObjectPos(i, 0, value)}
                  setObjectRotate={(value) => setObjectRotate(i, 0, value)}
                  setObjectScale={(value) => setObjectScale(i, 0, value)}
                  
                  isEnabled={enabled.includes(i)} mode={mode} debug={debug}
                  disableAllShadow={props.data.disableAllShadow}
                />
              </>
            }
          </group>
        )
      })}
    </animated.mesh >
  )


}


const MyBoxHelper = ({ box, isLocked, status, isEnabled }) => {
  const helper = useRef()
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    if (!box) return
    helper.current = new BoxHelper(box, 0xffff00);
    helper.current.update()
    if (!isLocked && status && !isEnabled) {
      helper.current.material.visible = true
    } else {
      helper.current.material.visible = false
    }

    if (helper.current) {
      scene.add(helper.current);
    }

    return () => {
      if (helper.current) {
        scene.remove(helper.current);
      }
    };

  }, [box, isLocked, status, isEnabled])

  useFrame(() => {
    if (helper.current?.update) {
      helper.current.update();
    }
  });

}




const Object = ({ file, setIsDragging, floorPlane, Fpos, Frotate, Fscale, isSearchDone, status, click,
  isLocked, handleContextMenu, isGrouped, setObjectPos, setObjectRotate, setObjectScale, mode, isEnabled, focus, isFocus, debug, disableAllShadow }) => {
  const [pos, setPos] = useState(Fpos);
  const [ppos, setPpos] = useState(Fpos);
  const [rotate, setRotates] = useState(Frotate);
  const [scale, setScales] = useState(Fscale);
  const [isSearchingDone, setIsSearchingDone] = useState(isSearchDone);
  const [hight, setHight] = useState(Fpos[1]);
  const orbit = useRef()
  const transform = useRef()
  useEffect(() => {
    setPpos(pos)
  }, [pos])

  useEffect(() => {
    setPos(Fpos)
  }, [Fpos])
  



  useEffect(() => {

    if (isSearchDone == true) {
      setIsSearchingDone(true);
    }

  }, [isSearchDone])




  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const [ref, meshRef] = useState();
  let posVec = null;


  let nowFlag = false;
  let preFlag = true;

  let planeIntersectPoint = new THREE.Vector3();
  const planeGeo = new THREE.PlaneGeometry(1, 1, 1, 1);

  const dragObjectRef = useRef();
  const downloadObj = useRef()

  const [spring, api] = useSpring(() => ({
    // position: [0, 0, 0],
    position: pos,
    scale: 1,
    rotation: [0, 0, 0],
    config: { friction: 10 }
  }));

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      if (!isEnabled && !isGrouped) {
        if (active !== preFlag) {
          nowFlag = active;
          preFlag = !nowFlag;

        }

        if (active && !isLocked && status && !isGrouped) {
          event.ray.intersectPlane(floorPlane, planeIntersectPoint);
          setPos([planeIntersectPoint.x,hight, planeIntersectPoint.z]);
          setIsDragging(active);
        }

        if (status && !isLocked) {
          if (active == false) {
            setObjectPos(pos)
          }
        } else {
          setIsDragging(false)
        }


        // api.start({
        //   scale: active ? 1 : 1,
        // });
        return timeStamp;
      }

    },
    { delay: true }
  );

  function handleUpdate() {
    if (isEnabled) {

      if (mode == 'translate') {
        let vec = {
          x: ppos[0] + transform.current.offset.x,
          y: ppos[1] + transform.current.offset.y,
          z: ppos[2] + transform.current.offset.z
        }
        setPpos([ppos[0] + transform.current.offset.x, ppos[1] + transform.current.offset.y, ppos[2] + transform.current.offset.z])
        if (vec.y !== hight) {
          setHight(vec.y);
        }

        setObjectPos([vec.x, vec.y, vec.z]);
      }
      if (mode == 'rotate') {
        let a = transform.current.rotationAxis.x !== 0 ? transform.current.rotationAngle : 0
        let b = transform.current.rotationAxis.y !== 0 ? transform.current.rotationAngle : 0
        let c = transform.current.rotationAxis.z !== 0 ? transform.current.rotationAngle : 0
        let finalRotate = [a, b, c]

        setObjectRotate(finalRotate);
      }
      if (mode == 'scale') {

        let a = transform.current.worldScale.x;
        let b = transform.current.worldScale.y;
        let c = transform.current.worldScale.z;

        setObjectScale([a, b, c])
      }


      setIsDragging(false);
    }

  }

  
  if (pos !== null && isSearchingDone) {
    if(file.isGroup){
      console.log('isMount')
    }
    return (
      <Suspense fallback={null} >
        
          <>
            <TransformControls ref={transform}  enabled={isEnabled && !isLocked} mode={mode}
              showX={isEnabled && !isLocked} showY={isEnabled && !isLocked} showZ={isEnabled && !isLocked}

              onObjectChange={(e) => { setIsDragging(true) }} onMouseUp={() => {  handleUpdate() }}
              
              onPointerLeave={(e) => { if (!isEnabled){ e.stopPropagation();setIsDragging(false)} }}
              position={pos} rotation={Frotate} scale={Fscale}
            >
              <animated.mesh ref={dragObjectRef} {...bind()}  onClick={(e) => { e.stopPropagation(); if (!isLocked && !isEnabled) { click(e,downloadObj.current.clone()) } }}
              onContextMenu={(e) => { e.stopPropagation(); handleContextMenu(e, downloadObj.current.clone()) }}>
                <mesh ref={downloadObj}   
              
                >
                  {
                    (file.model && file.isGltf) &&
                    <primitive ref={meshRef} object={file.model} castShadow={disableAllShadow ? false : true} recieveShadow={disableAllShadow ? false : true}/>
                    
                  }
                  {
                    (file.texture && file.isImg) &&
                    <mesh ref={meshRef} geometry={planeGeo} castShadow={disableAllShadow ? false : true} recieveShadow={disableAllShadow ? false : true} material={new THREE.MeshStandardMaterial({
                      map: file.texture,
                      side: THREE.DoubleSide,
                      transparent: true,

                    })}


                    ></mesh>
                  }
                  {
                    (file.geo && file.isGeo) &&
                    <mesh geometry={file.geo} castShadow={disableAllShadow ? false : true} recieveShadow={disableAllShadow ? false : true} material={disableAllShadow ? file.material2 : file.material} ref={meshRef}>

                    </mesh>
                  }
                  
                </mesh>

                <MyBoxHelper box={ref} isLocked={isLocked} status={status} isEnabled={isEnabled} />

              </animated.mesh>
            </TransformControls>
            {debug &&
              <>
                <Line start={pos} end={[0, 0, 0]} color={"black"} />

                <Text
                  scale={[1, 1, 1]}
                  color="black"
                  anchorX="center"
                  anchorY="middle"
                  position={pos}
                >
                  {`[${pos[0]},`}
                  {`${pos[1]},`}
                  {`${pos[2]}]`}
                </Text>
              </>
            }

          </>

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