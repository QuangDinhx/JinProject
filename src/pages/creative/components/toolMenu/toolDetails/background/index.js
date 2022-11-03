import React, { useEffect, useState } from 'react'
import JPG1 from './image/1.jpg';
import JPG2 from './image/2.jpg';
import JPG3 from './image/3.jpg'
import JPG4 from './image/4.jpg'
import JPG5 from './image/5.jpg'
import JPG6 from './image/6.jpg'
import JPG7 from './image/7.jpg'
import JPG8 from './image/8.jpg'
import JPG9 from './image/9.jpg'
import JPG10 from './image/10.jpg'
import JPG11 from './image/11.jpg'
import JPG12 from './image/12.jpg'
import JPG13 from './image/13.jpg'
import JPG14 from './image/14.jpg'
import JPG15 from './image/15.jpg'
import JPG16 from './image/16.jpg'
import JPG17 from './image/17.jpg'
import JPG18 from './image/18.jpg'
import JPG19 from './image/19.jpg'
import JPG20 from './image/20.jpg'


import './style.scss'


export const Objects = props => {

    const [listObject, setListObject] = useState([
        

    ]);
    const [mode, setMode] = useState()
    function toggleListorGrid() {
        setIsGrid(!isGrid);
        setActive(true);
    }

    const [isGrid, setIsGrid] = useState(true);
    const [isActive, setActive] = useState(false);
    const [isSelected, setSelected] = useState();
    return (
        <div className='objectComp' data-theme={mode}>
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
            <div className='objectBg' id='style-1'>
                {listObject.length !== 0 ?
                    <div className={`${isGrid ? 'object-grid' : 'object-list'}`} >
                        {listObject.map((item, index) => (
                            <div key={index} className={`object object--${index}`} onContextMenu={()=>setupRightClick(item.ObjectIndex)}>
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
                    <div className='empty'>
                        <div className='text'>Looks like you haven't uploaded anything yet</div>
                        <span className="btn" onClick={() => { props.switchChanel(0) }}>Upload</span>
                    </div>
                }

            </div>
        </div>

    )
}