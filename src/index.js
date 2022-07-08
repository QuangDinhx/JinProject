import "@google/model-viewer/dist/model-viewer";
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

import './style.scss'

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import hp from './assets/headphoneBaner/new (1).glb'

const a = Math.floor(Math.random() * 11) + 1;
    
// const hp = React.lazy(() => import(`./assets/headphoneBaner/new (1).glb`));

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
              <a href="#projects" onClick={props.toggleMenu}>
                PORTFOLIO
              </a>
            </li>
            <li>
              <a href="#contact" onClick={props.toggleMenu}>
                CONTACT
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
            <a href="#projects">Connect now</a>
            <a href="#contact" className="cta">
              Try it
            </a>
          </div>
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
    return(<div>do some thing</div>)
  };
  
  
  /***********************
    Project Component
   ***********************/
  
  const Project = props => {
    const tech = {
      sass: 'fab fa-sass',
      css: 'fab fa-css3-alt',
      js: 'fab fa-js-square',
      react: 'fab fa-react',
      vue: 'fab fa-vuejs',
      d3: 'far fa-chart-bar',
      node: 'fab fa-node'
    };
  
    const link = props.link || 'http://';
    const repo = props.repo || 'http://';
  
    return (
      <div className="project">
        <a className="project-link" href={link} target="_blank" rel="noopener noreferrer">
          <img className="project-image" src={props.img} alt={'Screenshot of ' + props.title} />
        </a>
        <div className="project-details">
          <div className="project-tile">
            <p className="icons">
              {props.tech.split(' ').map(t => (
                <i className={tech[t]} key={t} />
              ))}
            </p>
            {props.title}{' '}
          </div>
          {props.children}
          <div className="buttons">
            <a href={repo} target="_blank" rel="noopener noreferrer">
              View source <i className="fas fa-external-link-alt" />
            </a>
            <a href={link} target="_blank" rel="noopener noreferrer">
              Try it Live <i className="fas fa-external-link-alt" />
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  
  
  /***********************
    Projects Component
   ***********************/
  
  const Projects = props => {
    return(
      <div></div>
    )
  };
  
  
  
  /***********************
    Contact Component
   ***********************/
  
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
  };
  
  
  
  /***********************
    Footer Component
   ***********************/
  
  const Footer = props => {
    return (
      <footer>
        <div className="wrapper">
          <h3>THANKS FOR VISITING</h3>
          <p>© {new Date().getFullYear()} Yago Estévez.</p>
          <SocialLinks />
        </div>
      </footer>
    );
  };
  
  
  
  
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
  
    render() {
      return (
        <React.Fragment>
          <Menu toggleMenu={this.toggleMenu} showMenu={this.state.menuState} />
          <Nav toggleMenu={this.toggleMenu} showMenu={this.state.menuState} />
          <Header />
          <About />
          <Projects />
          <Contact />
          <Footer />
        </React.Fragment>
      );
    }
  
    componentDidMount() {
      const navbar = document.querySelector('#navbar');
      const header = document.querySelector('#welcome-section');
      const forest = document.querySelector('.forest');
      const silhouette = document.querySelector('.silhouette');
      let forestInitPos = -300;
  
      window.onscroll = () => {
        let scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
  
        if (scrollPos <= window.innerHeight) {
          silhouette.style.bottom = `${parseInt(scrollPos / 6)}px`;
          forest.style.bottom = `${parseInt(forestInitPos + scrollPos / 6)}px`;
        }
  
        if (scrollPos - 100 <= window.innerHeight)
          header.style.visibility = header.style.visibility === 'hidden' && 'visible';
        else header.style.visibility = 'hidden';
  
        if (scrollPos + 100 >= window.innerHeight) navbar.classList.add('bg-active');
        else navbar.classList.remove('bg-active');
      };
  
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
  }
  
  const root = ReactDOM.createRoot(document.getElementById("app"));
  root.render(<App />);
