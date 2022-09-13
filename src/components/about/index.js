import React, { useEffect, useState } from 'react'
import hpb from '../../assets/headphone-about.jpg'
import opl from '../../assets/opensea-logo.png'
export const About = props => {
      
    const [isTrigger,setTrigger] = useState(false);
    useEffect(()=>{
      window.addEventListener("scroll", listenToScroll);
      if(isTrigger){
        var str = document.getElementsByClassName('wrapper')[0].innerHTML.toString();
        var i = 0;
        document.getElementsByClassName('wrapper')[0].innerHTML = "";

        setTimeout(function() {
            var se = setInterval(function() {
                i++;
                document.getElementsByClassName('wrapper')[0].innerHTML = str.slice(0, i) + "|";
                if (i == str.length || (document.body.scrollTop || document.documentElement.scrollTop) > 1700) {
                    clearInterval(se);
                    document.getElementsByClassName('wrapper')[0].innerHTML = str;
                }
            }, 10);
        },1);
      }
      return () => window.removeEventListener("scroll", listenToScroll); 
      

    },[isTrigger])
    const listenToScroll = () => {
      let heightToHideFrom = 600;
      
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      if (winScroll > heightToHideFrom && isTrigger == false) {  
        setTrigger(true);
        
      }
      
    };
    

    return (
      <section id="about">
        {isTrigger&&
          <div className="wrapper">
          <article>
            
            <div className="title">
              <h3>What is DEZAIN ?</h3>
              <p className="separator" />
            </div>
            
            <div className="desc full">
            <h4 className="subtitle">DEZAIN is a range of services offered as NFT.</h4>
            <div>
              <img>
                {/* them image o day */}
              </img>
              <p>
                DEZAIN allows you to upload and edit 3d model files in a simple way 
                that anyone can do it. Also you can admire your edited model in 
                different ways. Even if you don't own our NFT, you will still be able to 
                use most of the features but with your contribution NFT will unlock 
                more cool features and help us develop more features other in the future.
              </p>
            </div>
            
            </div>
            
            
            <div className="title">
              <h3>NFTs</h3>
              <p className="separator" />
            </div>
            
            <div className="desc full">
            <h4 className="subtitle">Enjoy owning cool NFT headphones</h4>
              <div className="containerAbout">
                <div className="left">
                  <a href="#welcome-section">
                  <img src={hpb} id="image-about"></img>
                  </a>
                </div>
                <div className="right">
                  <div className="content">
                    <p>
                    We offer you NFTs of various shapes and colors as 3d models for your collection. Each NTFs is unique and irreplaceable.
                    </p>
                    <p>
                    If you don't already have one, you can check out our store on OpenSea. Check it now to enjoy service offers
                    </p>
                    <a href="https://opensea.io/3DHeadphone"><button className="custom-btn btn-5" ><span>Buy now</span></button></a>
                    <a href="https://opensea.io/"><img src={opl} id="logo"></img></a>
                  </div>
                </div>

              </div>
            </div>
            
            
            {/* <div className="desc full">
              <h4 className="subtitle">Also a designer.</h4>
              <p>
                I feel comfortable working with many Adobe products. Photoshop, Illustrator, InDesign,
                Lightroom or Xd are some kind of industry standards and I love working with them. I'm
                not limited to them, though: Gimp, Inkscape or Figma are also very valid applications
                that I've been working with.
              </p>
              <p>
                User interfaces, brochures, books, branding... You name it! As I mentioned, creating
                pretty things is particularly important for me.
              </p>
            </div> */}
          </article>
        </div>
        }
        
      </section>
    );
  };