

import React, { useEffect, useRef, useState } from 'react'
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

import './style.scss'
import Resizer from "react-image-file-resizer";
import html2canvas from "html2canvas";





export const MyScreenShot = props => {
    const [resourse, setResource] = useState(null);
    const [isSelected, setIsSelected] = useState(null);
    const [selected, setSelected] = useState([0]);
    const [width, setWidth] = useState(1);
    const [height, setHeight] = useState(1);
    const [isRatio, setRatio] = useState(true);
    const [ratio, setRatioo] = useState(1);
    const [type, setType] = useState("JPEG");
    const [isChange,setIsChange] = useState(0)


    useEffect(() => {
        setResource(props.data.takeScreenShotImg);
    }, [props.data.takeScreenShotImg])

    useEffect(() => {

    }, [resourse])

    function handleSelect(key, type) {
        if (!selected.includes(key)) {
            setIsChange(isChange + 1);
            setType(type)
            setSelected([key])
        }
    }

    function handleWidth(value) {
        setIsChange(isChange + 1);
        if (isRatio) {

            setWidth(value);
            setHeight((value / ratio).toFixed(0))
        } else {
            setWidth(value);
        }

    }

    function handleHeight(value) {
        setIsChange(isChange + 1);
        if (isRatio) {
            setHeight(value);
            setWidth((value * ratio).toFixed(0))
        } else {
            setHeight(value);
        }

    }

    function handleCapture() {
        if (props.data.takeScreenShot !== null) {
            console.log('isOK')
            props.data.takeScreenShot()
        }
    }

    
      


    return (
        <div className="containerDownload" >

            {resourse ?
                <div>

                    <div className='downloadContent' id='style-1'>
                        <div className='viewerd' id='showIMG'>
                            <img src={resourse} onLoad={(e)=>{
                                const img = e.target;
                                setWidth(img.width);
                                setHeight(img.height);
                                setRatioo(img.width/img.height)
                            }}></img>
                        </div>
                        <div className='download'>

                            <div className='text'>
                                Take another shot:
                            </div>

                            <button className="custom-btn btn-12" onClick={handleCapture}><span>ScreenShot</span><span>Take It!</span></button>

                            <div className='text'>
                                Download as PNG:
                            </div>
                            <a href={resourse} download="new.png">
                                <button className="custom-btn btn-5" ><span>Download</span></button>
                            </a>
                            
                            <div className='text'>
                                Download as JPG:
                            </div>
                            <a href={resourse} download="new.jpg">
                                <button className="custom-btn btn-5" ><span>Download</span></button>
                            </a>
                            
                            {/* <div className='text'>   Width:</div>
                            <div>
                                <TextField name="width" type="number" value={width} onChange={(e) => { handleWidth(e.value) }} />
                            </div>
                            <div className='text'>   Height:</div>
                            <div>
                                <TextField name="height" type="number" value={height} onChange={(e) => { handleHeight(e.value) }} />
                            </div>
                            <div className='text'>Maintain aspect ratio</div>
                            <div>
                                <Toggle name="isRatio" value={isRatio} onChange={(e) => { setRatio(e.value) }} />
                            </div>
                            <>
                                <Checkbox value={selected.includes(0)} onChange={(e) => { handleSelect(0, "jpeg") }}><div>JPEG</div></Checkbox>
                                <Checkbox value={selected.includes(1)} onChange={(e) => { handleSelect(1, "png") }}><div>PNG</div></Checkbox>
                            </> */}
                           
                            
   
                        </div>
                    </div>




                </div>


                :
                <div className='empty'>
                    <div className='text'>Looks like you haven't capture any picture</div>
                    <button className="custom-btn btn-12" onClick={handleCapture}><span>ScreenShot</span><span>Take It!</span></button>
                </div>
            }



        </div>

    );
}




