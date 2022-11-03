

import React, { useRef, useState } from 'react'
import { render } from "react-dom";
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber'

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
import box from '../geoImg/dice.png'


export const MyDiceGeometry = props => {
  const [data, setData] = React.useState({
    radius:1,
    details:0,
    wireframe:false
  });
  const [changed, setChanged] = React.useState(false);
  const [color,setColor] = React.useState({
    r: 255,
    g: 28,
    b: 104,
    a: 1,
    h: 0.9444444444444444,
    s: 0.88,
    v: 1,
  });
  const [submittedData, setSubmittedData] = React.useState({});
  
  const onChange = e => {
    if (e.value) {
      setData(e.value);
      
    }
    
  };

  function handleCreate(e){
    if (props.data.isSearching == false){
      let listFiles = [...props.data.fileInputs];
      let {radius,details} = e.data;
      
      let newFile = {
        name: `dice[${listFiles.length}]`,
        isGltf: false,
        link:box,
        geo: new THREE.DodecahedronGeometry(radius,details),
        material:new THREE.MeshBasicMaterial({
          color: `#${color.r.toString(16)}${color.g.toString(16)}${color.b.toString(16)}`,
          
        }),
        isGeo:true,
        Fpos: null
      }
      listFiles.push([newFile]);
      props.setData({
        fileInputs: listFiles,
      })
      props.setData({
        isSearching: true
      })
    } 
  }
  
  function changeColor(e){
    setColor(e.value)
  }

    return (
        <div className="containergeo" >
          <div className='viewer'>
            <Canvas>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
              <Dice radius={data.radius} details={(data.details).toFixed(0)} color={color} wireframe={data.wireframe}/>
            </Canvas>
            </div>
            <Container>
            <Form
                value={data}
                onChange={onChange}
                onSubmit={e => handleCreate(e)}
            >
                
                <h1>Radius:</h1>
                <div>
                    
                    <Slider name="radius" defaultValue={[1]} minimum={0} maximum={10} showTooltip />
                </div>
                
                <div>
                <h1>   Wireframe:</h1>
                    <Toggle name='wireframe'/>
                </div>
                <h1>   Color:</h1>
                <div>
                    <ColorPicker name="color" height="100px" value={color} onChange={(e)=>changeColor(e)}/>
                    <table style={{ padding: '10px', width: '100%' }}>
                    <tbody>
                        <tr>
                        <td width="50"><h1>HEX:</h1></td>
                        <td align="right"><h1>#{`${color.r.toString(16)}${color.g.toString(16)}${color.b.toString(16)}`}</h1></td>
                        </tr>
                        <tr>
                        <td><h1>RGB:</h1></td>
                        <td align="right"><h1>rgb({`${color.r}, ${color.g}, ${color.b}`})</h1></td>
                        </tr>
                    </tbody>
                    </table>
                </div>

                <div className="btnnn">
                    <Button  >Create</Button>
                </div>
            </Form>
            
        </Container>
        </div>
        
    );
}

const Dice = (props) => {
  const ref = useRef();
  const [active, setActive] = useState(true)
  
  useFrame(() => {
    if(ref.current&& active) {
      // rotates the object
      ref.current.rotation.x = ref.current.rotation.y += 0.01
    }
  });
  return (
  <mesh
    onClick={(e) => setActive(!active)}
    position={[0,0,0]}
    ref={ref}
  >
    
    <dodecahedronGeometry args={[props.radius]} />
    <meshStandardMaterial wireframe={props.wireframe} color={`#${props.color.r.toString(16)}${props.color.g.toString(16)}${props.color.b.toString(16)}`} />
  </mesh>);
}
