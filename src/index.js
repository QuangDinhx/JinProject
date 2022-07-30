import "@google/model-viewer/dist/model-viewer";
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

import './subdir/style.scss'
// import headphoneAbout from './assets/headphone-about.jpg'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import hpb from './assets/headphone-about.jpg'
import opl from './assets/opensea-logo.png'
import gif from './subdir/bg-3.gif'


const a = Math.floor(Math.random() * 11) + 1;
    


  const Menu = props => {
    return (
      <div className={`menu-container ${props.showMenu}`}>
        <div className="overlay" />
        <div className="menu-items">
          <ul>
            <li>
              <a href="#welcome-section" onClick={props.toggleMenu}>
                HOME
              </a>
            </li>
            <li>
              <a href="#about" onClick={props.toggleMenu}>
                ABOUT
              </a>
            </li>
            <li>
              <a href="#creative" onClick={props.toggleMenu}>
                CREATIVE
              </a>
            </li>
            <li>
              <a href="#showroom" onClick={props.toggleMenu}>
                SHOWROOM
              </a>
            </li>
            <li>
              <a href="#roadmap" onClick={props.toggleMenu}>
                ROADMAP
              </a>
            </li>
          </ul>
          <SocialLinks />
        </div>
      </div>
    );
  };
  
  
  /***********************
    Nav Component
   ***********************/
  
  const Nav = props => {
    return (
      <React.Fragment>
        <nav id="navbar">
          <div className="nav-wrapper">
            <p className="brand">
              <strong>DEZAIN</strong>
            </p>
            <div className="leftContent">
              <a href="#welcome-section" >
                HOME
              </a>
              <a href="#about" >
                ABOUT
              </a>
              <a href="#creative" >
                CREATIVE
              </a>
              <a href="#showroom" >
                SHOWROOM
              </a>
              <a href="#roadmap" >
                ROADMAP
              </a>
            </div>
            <div className="rightContent">
              <div className="media-block">
                <a className="media-link twiter-link" href="https://twitter.com/nasclubdebates">
                    <img src="https://s3.amazonaws.com/files.enjin.com/851662/Footer_Images_Optimised/Twitter-min.png" />
                </a>
                <a className="media-link discord-link" href="https://discord.gg/aGNz5KE">
                    <img src="https://s3.amazonaws.com/files.enjin.com/851662/Footer_Images_Optimised/Discord-min.png" />
                </a>
              </div>
              <button className="custom-btn connectButton">
                <span>CONNECT NOW !</span><span>OWNER</span>
              </button>
            </div>
            <a
              onClick={props.toggleMenu}
              className={props.showMenu === 'active' ? 'menu-button active' : 'menu-button'}
            >
              <span />
            </a>
          </div>
        </nav>
      </React.Fragment>
    );
  };
  
  
  
  /***********************
    Header Component
   ***********************/
  
  export const  Header = props => {
    const [glbs,setGlbs] = useState([]);
    useEffect(()=>{
      setTimeout(()=>{
        var list = [];
        let listNumber = [1,2,3,4,5,6,7,8,9,10,11,12]
        listNumber = listNumber.sort(() => Math.random() - 0.5);
        
        for(let i = 0;i < 4;i++){
          let a = listNumber.pop();
          console.log(a);
          list.push(require(`./assets/headphoneBaner/new (${a}).glb`).default)
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
            <button className="custom-btn btn-9">Try it<div className="dot"></div></button>
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
  
  
  /***********************
    About Component
   ***********************/
  
    const About = props => {
      
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
                  if (i == str.length) {
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
    
  
  
  /***********************
    Creative Component
   ***********************/
  
  const Creative = props => {
    return(
      <section id="creative">
        
      </section>
    )
  };
  
  
  
  /***********************
    Showroom Component
   ***********************/
  
  const Showroom = props => {
    return (
      <div></div>
    );
  };
  
  
  
  /***********************
    Roadmap Component
   ***********************/
  
  const Roadmap = props => {
    return (
      <div></div>
    );
  };
  const Contact = props => {
    return (
      <section id="contact">
        <div className="container">
          <div className="heading-wrapper">
            <div className="heading">
              <p className="title">
                Want to <br />
                contact me?
              </p>
              <p className="separator" />
              <p className="subtitle">
                Please, use the form below or send an email to {''}
                <span className="mail">
                  web
                  <i className="fas fa-at at" />
                  yagoestevez
                  <i className="fas fa-circle dot" />
                  com
                </span>
                :
              </p>
            </div>
            <SocialLinks />
          </div>
          <form id="contact-form" action="#">
            <input placeholder="Name" name="name" type="text" required />
            <input placeholder="Email" name="email" type="email" required />
            <textarea placeholder="Message" type="text" name="message" />
            <input className="button" id="submit" value="Submit" type="submit" />
          </form>
        </div>
      </section>
    );
  }
  
  
  
  
  /***********************
    Social Links Component
   ***********************/
  
  const SocialLinks = props => {
    return (
      <div className="social">
        <a
          href="https://twitter.com/yagoestevez"
          target="_blank"
          rel="noopener noreferrer"
          title="Link to author's Twitter profile"
        >
          {' '}
          <i className="fab fa-twitter" />
        </a>
        <a
          id="profile-link"
          href="https://github.com/yagoestevez"
          target="_blank"
          rel="noopener noreferrer"
          title="Link to author's GitHub Profile"
        >
          {' '}
          <i className="fab fa-github" />
        </a>
        <a
          href="https://codepen.io/yagoestevez"
          target="_blank"
          rel="noopener noreferrer"
          title="Link to author's Codepen Profile"
        >
          {' '}
          <i className="fab fa-codepen" />
        </a>
      </div>
    );
  };
  
  
  
  
  /***********************
    Main Component
   ***********************/
  
  class App extends React.Component {
    state = {
      menuState: false
    };
  
    toggleMenu = () => {
      this.setState(state => ({
        menuState: !state.menuState
          ? 'active'
          : state.menuState === 'deactive'
            ? 'active'
            : 'deactive'
      }));
    };
    handleScroll = () => {
      const navbar = document.querySelector('#navbar');
      const header = document.querySelector('#welcome-section');
      let scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

      

      if (scrollPos - 100 <= window.innerHeight)
        header.style.visibility = header.style.visibility === 'hidden' && 'visible';
      else header.style.visibility = 'hidden';

      if (scrollPos + 100 >= window.innerHeight) navbar.classList.add('bg-active');
      else navbar.classList.remove('bg-active');
      
  
      (function navSmoothScrolling() {
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        for (let i in internalLinks) {
          if (internalLinks.hasOwnProperty(i)) {
            internalLinks[i].addEventListener('click', e => {
              e.preventDefault();
              document.querySelector(internalLinks[i].hash).scrollIntoView({
                block: 'start',
                behavior: 'smooth'
              });
            });
          }
        }
      })();
    }
  
    render() {
      return (
        <React.Fragment>
          <Menu toggleMenu={this.toggleMenu} showMenu={this.state.menuState} />
          <Nav toggleMenu={this.toggleMenu} showMenu={this.state.menuState} />
          <Header />
          <About />
          <Creative />
          <Showroom />
          <Roadmap />
          <Contact/>
          
        </React.Fragment>
      );
    }
  
    componentDidMount() {
      window.addEventListener('scroll', this.handleScroll);
    }
    
  }
  
  const root = ReactDOM.createRoot(document.getElementById("app"));
  root.render(<App />);
