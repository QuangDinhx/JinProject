import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faArrowsUpDownLeftRight } from '@fortawesome/free-solid-svg-icons';
import { Upload } from './toolDetails/upload';
import './style.scss';




export const ToolMenu = props => {

  const sidebarNavItems = [
    {
      display: 'Upload',
      icon: <FontAwesomeIcon icon={faUpload} />,
      to: '/',
      content: <Upload data={props.data} setData={(props) => { props.setData(props) }} />,
      haveContent: true

    },
    {
      display: 'Move',
      icon: <FontAwesomeIcon icon={faArrowsUpDownLeftRight} />,
      to: '/',
      content: ' ',
      haveContent: true
    },
    {
      display: 'Pant',
      icon: <FontAwesomeIcon icon={faDownload} />,
      to: '/',
      content: ' ',
      haveContent: true
    },
    {
      display: 'Pant',
      icon: <FontAwesomeIcon icon={faDownload} />,
      to: '/',
      content: ' ',
      haveContent: true
    },
    {
      display: 'Pant',
      icon: <FontAwesomeIcon icon={faDownload} />,
      to: '/',
      content: ' ',
      haveContent: true
    },
    {
      display: 'Download',
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

  useEffect(() => {
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


  return (
    <div className='sidebarAll'>
      <div className={expanded ? "sidebar sidebar--expanded" : "sidebar"}
        onMouseOver={() => setExpanded(true)}
        onMouseOut={() => setExpanded(false)}>
        {expanded ? <div className="sidebar__logo">
          DEZAIN
        </div> : ''}

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
                setActiveIndex(index);
                setActiveSlc(true);
                setShowContent(true);

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
                top: '75vh',
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
        
          
            <div className={`contentContainer ${showContent && activeSlc ?(expanded ? "contentContainer--expanded" :' '):'hide'}`}>
              <div className='triangle'
                style={{
                  top: `${140 + activeIndex * stepHeight}px`
                }}
              ></div>
              <div className='content'>
                <button class="circle boxShadow" data-animation="fadeOut" data-remove="3000" onClick={() => {
                  setShowContent(false)
                }}></button>
                {sidebarNavItems[activeIndex]? sidebarNavItems[activeIndex].content:''}
              </div>
            </div>

          
      }

    </div>
  )
};

