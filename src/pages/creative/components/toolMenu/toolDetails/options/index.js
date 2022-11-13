import React, { useEffect, useState } from 'react'
import './style.scss'
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

export const Options = props => {
    const [selected, setSelected] = useState([props.data.graphicLevel]);
    const [enable,setEnable] = useState([props.data.graphicLevel])

    function handleSelect(key) {
        if (!selected.includes(key)) {
            setSelected([key])
            
        } else {
            setSelected([])
        }
    }
    function handleEnable(key) {
        if(!enable.includes(key)){
            setEnable([key])
            if(key == 0){
                handleLow()
            }else if(key == 1){
                handleMedium()
            }else if(key == 2){
                handleHigh()
            }
        }else{
            setEnable([key])
        }
    }

    function handleLow() {
        let cloneCheck = props.data.checkBoard;
        props.setData({
            disableAllShadow:true,
            background: null,
            checkBoard:{
                size:cloneCheck.size,
                caroSize:cloneCheck.caroSize,
                isHidePlane:false,
                isHideCaro:true,
                isRecievieShadow:false,
                caroColor:cloneCheck.caroColor,
                planeColor:cloneCheck.planeColor
            },
            limitObjects:10,
            graphicLevel:0,
        })
    }
    function handleMedium() {
        let cloneCheck = props.data.checkBoard;
        props.setData({
            disableAllShadow:false,
            checkBoard:{
                size:cloneCheck.size,
                caroSize:cloneCheck.caroSize,
                isHidePlane:false,
                isHideCaro:false,
                isRecievieShadow:false,
                caroColor:cloneCheck.caroColor,
                planeColor:cloneCheck.planeColor
            },
            limitObjects:15,
            graphicLevel:1,
        })
    }
    function handleHigh() {
        let cloneCheck = props.data.checkBoard;
        props.setData({
            disableAllShadow:false,
            checkBoard:{
                size:cloneCheck.size,
                caroSize:cloneCheck.caroSize,
                isHidePlane:false,
                isHideCaro:false,
                isRecievieShadow:true,
                caroColor:cloneCheck.caroColor,
                planeColor:cloneCheck.planeColor
            },
            limitObjects:30,
            graphicLevel:2,
        })
    }

    return (
        <div className='myOptions' data-theme={props.data.mode}>
            
            <div className='optionTitle'>
                Choose graphic options:
            </div>
            <div className='Fps'>
                <span>Show Fps:</span>
                <Toggle defaultValue={props.data.showFPS} onChange={(e)=>props.setData({showFPS:e.value})}/>
            </div>
            <div className='graphicsLevel'>
                <div className='lowGraphic'>
                    <div className='graphicContainer'>
                        <div className='title' onClick={() => handleSelect(0)}>
                            <div className='arrow-wrapper'>
                                <i className={selected.includes(0)
                                    ? "fa fa-angle-down fa-rotate-180"
                                    : "fa fa-angle-down"}
                                ></i>
                            </div>
                            <span className="title-text">
                                Low Graphic
                            </span>
                        </div>
                        <div className={selected.includes(0)
                            ? "contentG content-open"
                            : "contentG"}
                        >
                            <div className={selected.includes(0)
                                ? "content-text content-text-open"
                                : "content-text"}
                            >
                                <span>
                                    - Turn off all shadow.
                                </span>
                                <span>
                                    - Disable checkered.
                                </span>
                                <span>
                                    - Choose default background.
                                </span>
                                <span>
                                    - Limit the number of objects to 10.
                                </span>
                                <span>Actice:</span>
                                <Toggle value={enable.includes(0)} onChange={()=>handleEnable(0)}/>
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className='mediumGraphic'>
                    <div className='graphicContainer'>
                        <div className='title' onClick={() => handleSelect(1)}>
                            <div className='arrow-wrapper'>
                                <i className={selected.includes(1)
                                    ? "fa fa-angle-down fa-rotate-180"
                                    : "fa fa-angle-down"}
                                ></i>
                            </div>
                            <span className="title-text">
                                Medium Graphic
                            </span>
                        </div>
                        <div className={selected.includes(1)
                            ? "contentG content-open"
                            : "contentG"}
                        >
                            <div className={selected.includes(1)
                                ? "content-text content-text-open"
                                : "content-text"}
                            >
                                <span>
                                    - Only show object shadow.
                                </span>
                                <span>
                                    - Non-disable checkered.
                                </span>
                                <span>
                                    - Limit the number of objects to 15.
                                </span>
                                <span>Actice:</span>
                                <Toggle value={enable.includes(1)} onChange={()=>handleEnable(1)}/>
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className='hightGraphic'>
                    <div className='graphicContainer'>
                        <div className='title' onClick={() => handleSelect(2)}>
                            <div className='arrow-wrapper'>
                                <i className={selected.includes(2)
                                    ? "fa fa-angle-down fa-rotate-180"
                                    : "fa fa-angle-down"}
                                ></i>
                            </div>
                            <span className="title-text">
                                High Graphic
                            </span>
                        </div>
                        <div className={selected.includes(2)
                            ? "contentG content-open"
                            : "contentG"}
                        >
                            <div className={selected.includes(2)
                                ? "content-text content-text-open"
                                : "content-text"}
                            >
                                <span>
                                    - Turn on all shadow.
                                </span>
                                <span>
                                    - Non-disable anything.
                                </span>
                                
                                <span>
                                    - Limit the number of objects to 30.
                                </span>
                                <span>Actice:</span>
                                <Toggle value={enable.includes(2)} onChange={()=>handleEnable(2)}/>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}