import React, { useEffect, useState } from 'react';
import './style.scss'

export const Viewer = props =>{
    const [model,setModel] = useState(null);
    const [index,setIndex] = useState(0);
    const [isShrinkView, setIsShrinkView] = useState(false);
    



    const handleSidebarView = () => {
        setIsShrinkView(!isShrinkView);
      };

    useEffect(()=>{
        if(props.data.viewerTarget !== null){
            setModel(props.data.viewerTarget.ref);
            setIndex(props.data.viewerTarget.index);      
        }
    },[props.data.viewerTarget])

    return(
        <>
            {(props.data.viewerTarget !== null && !props.data.hideUI) &&
                <div className='ObjectViewer' data-theme={props.data.mode}>
                    <div className={`Rsidebar ${isShrinkView ? "shrink" : ""}`}>
                    <button
                        className="Rsidebar-viewButton"
                        type="button"
                        aria-label={isShrinkView ? "Expand Sidebar" : "Shrink Sidebar"}
                        title={isShrinkView ? "Expand" : "Shrink"}
                        onClick={handleSidebarView}
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-chevron-left"
                        >
                        <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    </div>
                </div>
            }
        </>   
    )
}