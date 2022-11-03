

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
    const [resourse, setResource] = useState('0000');
    const [link,setLink] = useState(null)


    useEffect(() => {
        setResource(props.data.takeScreenShotImg);
        
       
    }, [props.data.takeScreenShotImg])
    

    function handleCapture() {
        if (props.data.takeScreenShot !== null) {
            
            props.data.takeScreenShot()
        }
    }

    function handleDownloadasPNG(){
        let a = document.createElement('a');
        a.download = 'new.png';
        a.href = resourse.props.src;
        a.click();
        a.remove();
    }

    function handleDownloadasJPG(){
        let a = document.createElement('a');
        a.download = 'new.jpg';
        a.href = resourse.props.src;
        a.click();
        a.remove();
    }

    
      


    return (
        <div className="containerDownload" >

            {resourse ?
                <div>

                    <div className='downloadContent' id='style-1'>
                        <div className='viewerd' id='showIMG'>
                            {resourse}
                        </div>
                        <div className='download'>

                            <div className='text'>
                                Take another shot:
                            </div>

                            <button className="custom-btn btn-12" onClick={handleCapture}><span>ScreenShot</span><span>Take It!</span></button>

                            <div className='text'>
                                Download as PNG:
                            </div>
                            
                            <button className="custom-btn btn-5" onClick={handleDownloadasPNG} ><span>Download</span></button>
                            
                            
                            <div className='text'>
                                Download as JPG:
                            </div>
                            
                            <button className="custom-btn btn-5" onClick={handleDownloadasJPG}><span>Download</span></button>
                            
                            
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




