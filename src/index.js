import "@google/model-viewer/dist/model-viewer";
import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Link, Routes, BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom/client'

import './subdir/style.scss'

import CreativeComp from "./pages/creative/index.js";
import ShowroomComp from "./pages/showroom/index.js";
import { About } from "./components/about";
import { Contact } from "./components/contact";
import { Creative } from "./components/creative";
import { Header } from "./components/header";
import { Showroom } from "./components/showroom";
import { SocialLinks } from "./components/socialLinks";
import { Roadmap } from "./components/roadmap";



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
                <a className="media-link twiter-link" href="https://twitter.com/DEZAIN3D">
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
        <BrowserRouter forceRefresh={true}>
          
            
            <Routes>
              <Route path="/creative" element={<CreativeComp />} />
              <Route path="/showroom" element={<ShowroomComp />} />
              <Route path="/" element={
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
              } />

              <Route path="*"
                element={
                <div>
                  <h2>404 Page not found etc</h2>
                </div>
                }
              />

            </Routes>
        
        </BrowserRouter>

      
        
      );
    }
  
    componentDidMount() {
      window.addEventListener('scroll', this.handleScroll);
    }
    
  }
  
  const root = ReactDOM.createRoot(document.getElementById("app"));
  root.render(<App />);
