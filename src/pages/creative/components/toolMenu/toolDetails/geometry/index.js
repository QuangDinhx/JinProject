import React, { useEffect, useState } from 'react'

import './style.scss'
import { MyBoxGeometry } from './listGeometrys/boxGeometry';
import box from './geoImg/block.png'
import { MyCapsuleGeometry } from './listGeometrys/capsuleGeometry';
import capsule from './geoImg/capsule.png';
import { MyCircleGeometry } from './listGeometrys/circleGeometry';
import circle from './geoImg/oval.png'
import { MyConeGeometry } from './listGeometrys/coneGeometry';
import cone from './geoImg/cone.png'
import { MyCylinderGeometry } from './listGeometrys/cylinderGeometry';
import cylinder from './geoImg/cylinder.png'
import { MyDiceGeometry } from './listGeometrys/diceGeometry';
import dice from './geoImg/dice.png'


export const Geometrys = props => {

    const listObject = [
        {
            content:<MyBoxGeometry data={props.data} setData={(prop) => { props.setData(prop) }} />,
            name:'box',
            image:<img src={box}></img>
        },
        {
            content:<MyCapsuleGeometry data={props.data} setData={(prop) => { props.setData(prop) }}/>,
            name:'capsule',
            image:<img src={capsule}></img>

        },
        {
            content:<MyCircleGeometry data={props.data} setData={(prop) => { props.setData(prop) }}/>,
            name:'circle',
            image:<img src={circle}></img>

        },
        {
            content:<MyConeGeometry data={props.data} setData={(prop) => { props.setData(prop) }}/>,
            name:'cone',
            image:<img src={cone}></img>

        },
        {
            content:<MyCylinderGeometry data={props.data} setData={(prop) => { props.setData(prop) }}/>,
            name:'cylinder',
            image:<img src={cylinder}></img>

        },
        {
            content:<MyDiceGeometry data={props.data} setData={(prop) => { props.setData(prop) }}/>,
            name:'dice',
            image:<img src={dice}></img>

        },

    ];
    const [mode, setMode] = useState()
    function toggleListorGrid() {
        setIsGrid(!isGrid);
        setActive(true);
    }
    
    useEffect(() => {
        setMode(props.data.mode);
    }, [props.data.mode])

    const [isGrid, setIsGrid] = useState(true);
    const [isActive, setActive] = useState(false);
    const [selected,setSelected] = useState(null)
    const [isSelected, setIsSelected] = useState(false);

    

    return (
        <div className='objectComp' data-theme={mode}>
            {!isSelected ?
                <button className={`grid-list ${isActive ? (isGrid ? 'animation' : 'animation active') : ''}`} onClick={toggleListorGrid}>
                <div className="icon">
                    <div className="dots">
                        <i></i><i></i><i></i><i></i>
                    </div>
                    <div className="lines">
                        <i></i><i></i><i></i><i></i>
                    </div>
                </div>
                <div className="text">
                    <span>Grid</span>
                    <span>List</span>
                </div>
            </button>
            :
            <button className="leftArrow" onClick={()=>setIsSelected(false)}><i className="fa fa-3x fa-arrow-circle-left"></i></button>
            }
            
            
            <div className='objectBg' id='style-1'>
                {!isSelected ?
                    <div className={`${isGrid ? 'object-grid' : 'object-list'}`} >
                        {listObject.map((item, index) => (
                            <div key={index} className={`object object--${index}`} onClick={()=>{setSelected(index);setIsSelected(true)}}>
                                <div className="object-image">
                                    {item.image}
                                </div>
                                <h3 className="object-name">
                                    {item.name}
                                </h3>

                            </div>
                        ))}
                    </div>
                    :
                    <>
                        {selected !== null && 
                            <div className='setting' >
                                {listObject[selected].content}
                            </div>
                        }
                    </>
                    
                }

            </div>
        </div>

    )
}