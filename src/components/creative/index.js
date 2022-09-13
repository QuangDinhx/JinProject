import React, { useEffect, useState } from 'react'
import hpc from '../../assets/hp-creative.png'
import {BrowserRouter as Router, Route, Link, Routes, BrowserRouter} from 'react-router-dom';

export const Creative = props => {
    const [isActivce,setActive] = useState(false);
    useEffect(()=>{
      window.addEventListener("scroll", listenToScroll);
      
      return () => window.removeEventListener("scroll", listenToScroll); 
      

    },[])
    const listenToScroll = () => {
      let heightToHideFrom = 2000;
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      
      if (winScroll > heightToHideFrom && isActivce == false) {  
        setActive(true);
        
      }
    };

    return(
      <section id="creative">
        {isActivce&&
          <div className="content">
            <div className="hpImg">
              <img src={hpc} id="image"></img>
            </div>
            <div className="container">
              <div className="title">
                  <h3>3D editing tools</h3>
                  <p className="separator" />
                </div>
                
                <div className="desc full">
            
                <div>
                  
                  <p>
                  Access to a very useful and simple set of 3D editing tools. 
                  With our toolkit, you can create and edit any 3D model you want according to your imagination and your creative. And download it for free.
                  </p>
                </div>
                
                </div>
              {/* <h1>
                <span className="line">Access a helfull 3D editing tools</span>
                <span className="line">With our toolkit, you can create and edit any 3D model you want and</span>
                <span className="line">
                  Download it for <span className="color">free</span>.
                </span>
              </h1> */}
              <div className="buttons">
                <Link to="/creative"><button className="custom-btn btn-9">Try it</button></Link>
                
              </div>
            </div>
          </div>
        }
        
      </section>
    )
  };