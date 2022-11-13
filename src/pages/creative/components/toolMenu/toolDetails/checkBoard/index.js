

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
import { useEffect } from 'react';
import { ReflectorForSSRPass } from 'three-stdlib';



export const MyCheckBoard = props => {
    const [data, setData] = React.useState({
        size:props.data.checkBoard.size,
        caroSize: props.data.checkBoard.caroSize,
        isHidePlane: props.data.checkBoard.isHideCaro,
        isHideCaro: props.data.checkBoard.isHidePlane,
        isRecievieShadow:props.data.checkBoard.isRecievieShadow,
    });
    const [changed, setChanged] = React.useState(false);
    const [colorCaro, setColorCaro] = React.useState(props.data.checkBoard.caroColor);
    const [colorPlane, setColorPlane] = React.useState(props.data.checkBoard.planeColor);
    const [submittedData, setSubmittedData] = React.useState({});

    const onChange = e => {
        if (e.value) {
            let newsize = e.value.size;
            let newCaroSize = e.value.caroSize;
            setData({
                size:newsize,
                caroSize:newCaroSize,
                isHideCaro:e.value.isHideCaro,
                isHidePlane:e.value.isHidePlane,
                isRecievieShadow:e.value.isRecievieShadow
            });
            setChanged(true);
        }

    };

    
    useEffect(()=>{
        if(changed){
            
            props.setData({
                checkBoard: {
                    size: Math.round(data.size),
                    caroSize: Math.round(data.caroSize),
                    isHideCaro: data.isHideCaro,
                    isHidePlane: data.isHidePlane,
                    isRecievieShadow:data.isRecievieShadow,
                    caroColor: colorCaro,
                    planeColor: colorPlane
                }
            })
        }
        
    },[colorCaro,colorPlane,data])

    

    return (
        <div className='objectBg' id='style-1'>
            <div className="containerCheckboard" >

                <Container>
                    <Form
                        value={data}
                        onChange={onChange}
                        onSubmit={e => handleCreate(e)}
                    >
                        <h1>Caro Color:</h1>
                        <div>
                            <ColorPicker height="100px" value={colorCaro} onChange={(e) => {setColorCaro(e.value);setChanged(true)}} />
                            <table style={{ padding: '10px', width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td width="50"><h1>HEX:</h1></td>
                                        <td align="right"><h1>#{`${colorCaro.r.toString(16)}${colorCaro.g.toString(16)}${colorCaro.b.toString(16)}`}</h1></td>
                                    </tr>
                                    <tr>
                                        <td><h1>RGB:</h1></td>
                                        <td align="right"><h1>rgb({`${colorCaro.r}, ${colorCaro.g}, ${colorCaro.b}`})</h1></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h1>Plane Color:</h1>
                        <div>
                            <ColorPicker height="100px" value={colorPlane} onChange={(e) => {setColorPlane(e.value);setChanged(true)}} />
                            <table style={{ padding: '10px', width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td width="50"><h1>HEX:</h1></td>
                                        <td align="right"><h1>#{`${colorPlane.r.toString(16)}${colorPlane.g.toString(16)}${colorPlane.b.toString(16)}`}</h1></td>
                                    </tr>
                                    <tr>
                                        <td><h1>RGB:</h1></td>
                                        <td align="right"><h1>rgb({`${colorPlane.r}, ${colorPlane.g}, ${colorPlane.b}`})</h1></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h1>Plane Size:</h1>
                        <div>

                            <Slider name="size" defaultValue={[data.size]} minimum={0} maximum={20} showTooltip />
                        </div>
                        <h1>Caro size:</h1>
                        <div>

                            <Slider name="caroSize" defaultValue={[data.caroSize]} minimum={1} maximum={4} showTooltip />
                        </div>

                        <div>
                            <h1>Hide Caro:</h1>
                            <Toggle name='isHideCaro' defaultValue={data.isHideCaro}/>
                        </div>

                        <div>
                            <h1>Hide Plane:</h1>
                            <Toggle name='isHidePlane' defaultValue={data.isHidePlane}/>
                        </div>

                        <div>
                            <h1>Recieve Shadow:</h1>
                            <Toggle name='isRecievieShadow' defaultValue={data.isRecievieShadow}/>
                        </div>
                        

                        
                    </Form>

                </Container>
            </div>
        </div>


    );
}



