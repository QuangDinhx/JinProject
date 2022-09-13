import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import {BrowserRouter as Router, Route, Link, Routes, BrowserRouter} from 'react-router-dom';
export const  Header = props => {
    const [glbs,setGlbs] = useState([]);
    useEffect(()=>{
      setTimeout(()=>{
        var list = [];
        let listNumber = [1,2,3,4,5,6,7,8,9,10,11,12]
        listNumber = listNumber.sort(() => Math.random() - 0.5);
        
        for(let i = 0;i < 4;i++){
          let a = listNumber.pop();
          
          list.push(require(`../../assets/headphoneBaner/new (${a}).glb`).default)
        }
        setGlbs(list);
        
      },1000)
    },[])

    return (
      <header id="welcome-section">
        {/* <div className="forest" />
        <div className="silhouette" />
        <div className="moon" /> */}
        <div className="container">
          <h1>
            <span className="line">Make 3D</span>
            <span className="line">to be easy</span>
            <span className="line">
              <span className="color">&</span> soft.
            </span>
          </h1>
          <div className="buttons">
            <button className="custom-btn btn-11">Connect now</button>
            <Link to="/creative"><button className="custom-btn btn-9">Try it</button></Link>
          </div>
          
          <a id="openSea" href="https://opensea.io/3DHeadphone" >
            Do you own our NFTs ? Check it out!
          </a>
          
        </div>
        <div className='modelViewer'>
          
          <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            
            
          >
            <SwiperSlide>
            <model-viewer
                src={glbs[0]}
                alt="A 3D model of an astronaut"
                shadow-intensity="1"
                camera-controls
                auto-rotate
                disable-zoom
                auto
              ></model-viewer>
            </SwiperSlide>
            <SwiperSlide>
            <model-viewer
                src={glbs[1]}
                alt="A 3D model of an astronaut"
                shadow-intensity="1"
                camera-controls
                auto-rotate
                disable-zoom
                auto
              ></model-viewer>
            </SwiperSlide>
            <SwiperSlide>
            <model-viewer
                src={glbs[2]}
                alt="A 3D model of an astronaut"
                shadow-intensity="1"
                camera-controls
                auto-rotate
                disable-zoom
                auto
              ></model-viewer>
            </SwiperSlide>
            <SwiperSlide>
              <model-viewer
                src={glbs[3]}
                alt="A 3D model of an astronaut"
                shadow-intensity="1"
                camera-controls
                auto-rotate
                disable-zoom
                auto
              ></model-viewer>
            </SwiperSlide>
            
          </Swiper>
        </div>
      </header>
    );
  };