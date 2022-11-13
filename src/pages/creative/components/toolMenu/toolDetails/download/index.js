

import React, { useEffect, useRef, useState } from 'react'
import { render } from "react-dom";
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'
import { PLYExporter } from 'three/examples/jsm/exporters/PLYExporter.js';
import { Raytracer } from '@react-three/lgl';


import {
  Container,
  Form,
  Button,
  TextField,
  Checkbox,
  RadioButtonGroup,
  RadioButton,
  DropdownField,
  Toggle,
  Slider,
  ColorPicker
} from "precise-ui";
import { toRenderble } from "./toRenderble"
import './style.scss'





export const MyDownload = props => {
  const [resourse, setResource] = useState(null);
  const [gltfLink, setGltfLink] = useState(null);
  const [objLink, setObjLink] = useState(null);
  const [imgLink, setImgLink] = useState(null);

  useEffect(()=>{
    setImgLink(props.data.takeScreenShotImg);
  },[props.data.takeScreenShotImg])


  const ref = useRef();
  const exporter = new GLTFExporter();
  const Objexporter = new PLYExporter();

  useEffect(() => {
    setResource(props.data.downloadTarget)
    console.log(props.data.downloadTarget)
  }, [props.data.downloadTarget])

  useEffect(() => {
    handleDownloadGltf();
    handleDownloadOBJ();
  }, [resourse])

  function handleDownloadGltf() {
    if (resourse !== null) {

      exporter.parse(
        resourse,
        function (result) {
          let buffer = JSON.stringify(result, null, 2);
          let blob = new Blob([buffer], { type: 'application/octet-stream' });
          let linkDown = URL.createObjectURL(blob);
          setGltfLink(linkDown)
        },
        {
          binary: true
        }
      );


    }



  }

  function handleDownloadOBJ() {
    if (resourse !== null) {
      let result = Objexporter.parse(resourse);
      let buffer = result;
      let blob = new Blob([buffer], { type: 'application/octet-stream' });
      let linkDown = URL.createObjectURL(blob);
      setObjLink(linkDown)

    }
  }

  function handlePopup(){
    props.setData({
      showPopup:true
    })
  }

  




  return (
    <div className="containerDownload" >

      {resourse ?
        <div>
          
            <div className='downloadContent'>
              <div className='viewerd'>
                <Canvas ref={ref} gl={{ preserveDrawingBuffer: true }}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                  <pointLight position={[-10, -10, -10]} />

                  <MyViewer resourse={resourse} setImgLink={(e) => setImgLink(e)} />


                </Canvas>
              </div>
              <div className='download'>
                
                <div className='text'>
                  By GLTF File:
                </div>
                <a href={gltfLink} download='new.glb' onClick={handlePopup}>
                  <button className="custom-btn btn-6" ><span>Download</span></button>
                </a>
                <div className='text'>
                  By PLY File:
                </div>
                <a href={objLink} download='new.obj' onClick={handlePopup}>
                  <button className="custom-btn btn-5" ><span>Download</span></button>
                </a>
                <div className='text'>
                  By OBj File:
                </div>

                <button className="custom-btn btn-7" ><span>Comming soon...</span></button>


              </div>
            </div>
            
          


        </div>


        :
        <div className='empty'>
          <div className='text'>Looks like you haven't selected anything to download yet.Click the right mouse button with the object and then select download. See ya</div>
          <span className="btn" onClick={() => { props.switchChanel(0) }}>Upload</span>
        </div>
      }



    </div>

  );
}

const MyViewer = (props) => {
  const ref = useRef();
  const [active, setActive] = useState(true);
  const [reff, meshRef] = useState();
  const gl = useThree(state => state.gl);
  props.setImgLink(gl.domElement.toDataURL())
  
  

  useFrame(() => {
    if (ref.current && active) {

      ref.current.rotation.y = ref.current.rotation.y += 0.01
    }
  });

  return (
    <mesh
      onClick={(e) => setActive(!active)}
      position={[0, 0, 0]}
      ref={ref}

    >
      <primitive ref={meshRef} object={props.resourse} />
      <boxHelper args={[reff, 0xffff00]}
        visible={false}
        onClick={(e) => setActive(!active)}
      />

    </mesh>);
}


  

