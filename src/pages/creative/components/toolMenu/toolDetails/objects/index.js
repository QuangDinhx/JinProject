import React, { useEffect, useState } from 'react'

import cubelogo from './cubelogo.png'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const Objects = props => {

    const [listObject, setListObject] = useState([]);
    const [mode, setMode] = useState()
    function toggleListorGrid() {
        setIsGrid(!isGrid);
        setActive(true);
    }
    useEffect(() => {
        let list = [];

        props.data.fileInputs.forEach((e, index) => {
            if(e.length == 1){
                let isGltf = (/\.(?=gltf|glb)/gi).test(e[0].name);
                let object = {
                ObjectName: e[0].name,
                ObjectImage: isGltf ? <img src={cubelogo} /> : <img src={window.URL.createObjectURL(e[0])} />
                }
                list.push(object)
            }else{
                let object = {
                ObjectName: `Object[${index}]`,
                ObjectImage: <img src={cubelogo} /> 
                }
                list.push(object)
            }
            
        });
        setListObject(list)
    }, [])
    useEffect(() => {
        setMode(props.data.mode);
    }, [props.data.mode])

    function setupRightClick(index) {
        const menuItems = [
        {
            display: 'Delete',
            icon: <FontAwesomeIcon icon={faTrash} />,
            event: () => { 
                handleRemove(index)
            },
        },
        ]
        const target = `.object--${index}`
        props.setData({
            menuItems:menuItems,
            target:target
        })
    }

    function handleRemove(index) {
        
        const newList = listObject.filter((item,i) => i !== index);
        setListObject(newList);
        const newfileInputs = props.data.fileInputs.filter((item,i) => i != index);
        props.setData({
            fileInputs:newfileInputs
        })
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
            <div className='objectBg'>
                {listObject.length !== 0 ?
                    <div className={`${isGrid ? 'object-grid' : 'object-list'}`} >
                        {listObject.map((item, index) => (
                            <div key={index} className={`object object--${index}`} onContextMenu={()=>setupRightClick(index)}>
                                <div className="object-image">
                                    {item.ObjectImage}
                                </div>
                                <h3 className="object-name">
                                    {item.ObjectName}
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