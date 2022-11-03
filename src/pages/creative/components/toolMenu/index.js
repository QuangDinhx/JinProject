import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faArrowsUpDownLeftRight } from '@fortawesome/free-solid-svg-icons';
import { faCube,faCubes } from '@fortawesome/free-solid-svg-icons';
import { Upload } from './toolDetails/upload';
import { Objects, Objetcs } from './toolDetails/objects';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { ContextMenu } from '../right-click';
import { Geometrys } from './toolDetails/geometry'; 
import { MyDownload } from './toolDetails/download';
import { MyScreenShot } from './toolDetails/screenshot';

import './style.scss';




export const ToolMenu = props => {

  const sidebarNavItems = [
    {
      display: 'Upload',
      icon: <FontAwesomeIcon icon={faUpload} />,
      to: '/',
      content: <Upload data={props.data} setData={(prop) => { props.setData(prop) }} switchChanel={switchChanel} />,
      haveContent: true

    },
    {
      display: 'Objects',
      icon: <FontAwesomeIcon icon={faCube} />,
      to: '/',
      content: <Objects data={props.data} setData={(prop) => { props.setData(prop) }} switchChanel={switchChanel} />,
      haveContent: true
    },
    {
      display: 'Geometrys',
      icon: <FontAwesomeIcon icon={faCubes} />,
      to: '/',
      content: <Geometrys data={props.data} setData={(prop) => { props.setData(prop) }} switchChanel={switchChanel} />,
      haveContent: true
    },
    {
      display: 'Screen Shot',
      icon: <FontAwesomeIcon icon={faImage} />,
      to: '/',
      content: <MyScreenShot data={props.data} setData={(prop) => { props.setData(prop) }} switchChanel={switchChanel}/>,
      haveContent: true
    },
    {
      display: 'Download',
      icon: <FontAwesomeIcon icon={faDownload} />,
      to: '/',
      content: <MyDownload data={props.data} setData={(prop) => { props.setData(prop) }} switchChanel={switchChanel} />,
      haveContent: true
    },
    {
      display: 'Pant',
      icon: <FontAwesomeIcon icon={faDownload} />,
      to: '/',
      content: ' ',
      haveContent: true
    },
    


  ]
  const exitProps = {
    display: 'Logout',
    icon: <FontAwesomeIcon icon={faRightFromBracket} />,
    to: '/',
    content: ' '
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const [showContent, setShowContent] = useState(true);
  const [activeSlc, setActiveSlc] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();
  const [mode, setMode] = useState();

  useEffect(()=>{
    if(props.data.switchChanel == null){
      props.setData({
        switchChanel: (index) =>{
          switchChanel(index)
        }
      })
    }
  })

  function switchChanel(index) {
    setActiveSlc(false);
    setShowContent(false);
    setTimeout(()=>{
      setActiveIndex(index);
      setActiveSlc(true);
      setShowContent(true);
    },200)
  }

  useEffect(() => {
    setMode(props.data.mode)
    setTimeout(() => {
      const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
      indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
      setStepHeight(sidebarItem.clientHeight);
    }, 50);
  }, []);

  // change active index
  useEffect(() => {
    const curPath = window.location.pathname.split('/')[1];
    const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);

  }, [location]);

  

  function updateMode() {
    if (mode == 'light') {
      setMode('dark')
      props.setData({
        mode: 'dark'
      })
    } else {
      setMode('light')
      props.setData({
        mode: 'light'
      })
    }

  }


  return (
    <div className='sidebarAll' data-theme={mode}>
      <div className={expanded ? "sidebar sidebar--expanded" : "sidebar"}
        onMouseOver={() => setExpanded(true)}
        onMouseOut={() => setExpanded(false)}
        >
        {expanded ?
          <div className="sidebar__above">
            <div className='sidebar__above__logo'>
              DEZAIN
            </div>
            <div className='sidebar__above__switch' >
              <div className="btn-container" data-mode={mode}>
                <i className="fa fa-sun-o" aria-hidden="true"></i>
                <label className="switch btn-color-mode-switch" >
                  <input type="checkbox" name="color_mode" id="color_mode" checked={mode == 'dark'?true:false} onChange={updateMode}/>
                  <label htmlFor="color_mode" data-on="Dark" data-off="Light" className="btn-color-mode-switch-inner" ></label>
                </label>
                <i className="fa fa-moon-o" aria-hidden="true"></i>
              </div>
            </div>
          </div>

          : ''}

        <div ref={sidebarRef} className="sidebar__menu">

          <div
            ref={indicatorRef}
            className={`sidebar__menu__indicator ${activeSlc ? (expanded ? 'active' : 'hide') : ''}`}
            style={{
              transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
            }}
          ></div>

          <div className={`sidebar__container ${expanded ? '' : 'hide'}`}>
            {sidebarNavItems.map((item, index) => (
              <div key={`${index}`} className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`} onClick={() => {
                
                setActiveSlc(false);
                setShowContent(false);
                setTimeout(()=>{
                  setActiveIndex(index);
                  setActiveSlc(true);
                  setShowContent(true);
                },200)

              }}>
                <div className={`sidebar__menu__item__icon ${expanded ? '' : 'hide'}`}>
                  {item.icon}
                </div>
                {expanded ? <div className="sidebar__menu__item__text">
                  {item.display}
                </div> : ''}

              </div>


            ))}



            <Link to={exitProps.to}>
              <div className={`sidebar__menu__item`} style={{
                position: 'absolute',
                top: '70vh',
              }}>
                <div className={`sidebar__menu__item__icon ${expanded ? '' : 'hide'}`}>
                  {exitProps.icon}
                </div>
                {expanded ? <div className="sidebar__menu__item__text">
                  {exitProps.display}
                </div> : ''}

              </div>
            </Link>

          </div>



        </div>
      </div>

      {


        <div className={`contentContainer ${showContent && activeSlc ? (expanded ? "contentContainer--expanded" : ' ') : 'hide'}`}

        >
          <div className='triangle'
            style={{
              top: `${140 + activeIndex * stepHeight}px`
            }}
          ></div>
          <div className='content'
            
          >
            <button className="circle boxShadow" data-animation="fadeOut" data-remove="3000" onClick={() => {
              setShowContent(false)
            }}></button>
            {sidebarNavItems[activeIndex] ? sidebarNavItems[activeIndex].content : ''}
          </div>
        </div>


      }

    </div>
  )
};

