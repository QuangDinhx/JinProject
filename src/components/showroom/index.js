import React, { useEffect, useState } from 'react'
import hpc from '../../assets/hp-creative.png'
export const Showroom = props => {
    const [isActivce,setActive] = useState(false);
    useEffect(()=>{
      window.addEventListener("scroll", listenToScroll);
      
      return () => window.removeEventListener("scroll", listenToScroll); 
      

    },[])
    const listenToScroll = () => {
      let heightToHideFrom = 3080;
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      
      if (winScroll > heightToHideFrom && isActivce == false) {  
        setActive(true);
        
      }
    };
    return (
      <section id="showroom">
          {isActivce&&
          <div className="content">
            <div className="container">
              <div className="title">
                  <h3>3D Showroom Demo</h3>
                  <p className="separator" />
                </div>
                
                <div className="desc full">
            
                <div>
                  
                  <p>
                  A place where you can upload or store any 3d models you just created with our tool. A perfect place to revisit your amazing creations.
                  Also if you are curious what your NFT looks like you can join here too, we have a special slot for it.
                  </p>
                </div>
                
                </div>
  
              <div className="buttons">
                <a href="gg.com"><button className="custom-btn btn-2">Try Demo</button></a>
              </div>
            </div>
            <div className="hpImg">
              <img src={hpc} id="image"></img>
            </div>
            
          </div>
        }
      </section>
    );
  };