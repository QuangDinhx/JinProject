

import * as React from "react";
import { render } from "react-dom";
import * as THREE from 'three';

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
import box from '../geoImg/cylinder.png'


export const MyCylinderGeometry = props => {
  const [data, setData] = React.useState();
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
      console.log(e)
    }
    
  };

  function handleCreate(e){
    if (props.data.isSearching == false){
      let listFiles = [...props.data.fileInputs];
      let {radiusTop,radiusBottom,height,radiusSegments} = e.data;
      
      let newFile = {
        name: `cylinder[${listFiles.length}]`,
        isGltf: false,
        link:box,
        geo: new THREE.CylinderGeometry(radiusTop,radiusBottom,height, radiusSegments),
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
            <Container>
            <Form
                value={data}
                onChange={onChange}
                onSubmit={e => handleCreate(e)}
            >
                
                <h1>   Radius Top:</h1>
                <div>
                    <TextField name="radiusTop" type="number" defaultValue="1" />
                </div>
                <h1>   Radius Bottom:</h1>
                <div>
                    <TextField name="radiusBottom" type="number" defaultValue="1"/>
                </div>
                <h1>   Height:</h1>
                <div>
                    <TextField name="height" type="number" defaultValue="1"/>
                </div>
                <h1>   Radius Segments:</h1>
                <div>
                    <TextField name="radiusSegments" type="number" defaultValue="5"/>
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


