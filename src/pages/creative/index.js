import React, { Component, useEffect, useState, } from 'react'
import * as THREE from 'three'
import { ToolMenu } from './components/toolMenu'
import { ContextMenu } from './components/right-click';
import { Object3D } from './components/3Dobjects';
import { Loading } from './components/Loading';
import './style.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { Viewer } from './components/viewer';
import 'reactjs-popup/dist/index.css';
import { Stats } from '@react-three/drei'

import JPG1 from './components/toolMenu/toolDetails/background/image/1.jpg'


class CreativeComp extends React.Component {
  constructor() {
    super();
    this.state = {
      scene: null,
      fileInputs: [],
      groups:[],
      target:".sidebarAll",
      menuItems:[],
      mode:'light',
      isLoaded:false,
      isSearching:false,
      contextMenuPos:{x:0,y:0},
      handleRemove:null,
      switchChanel:null,
      downloadTarget:null,
      takeScreenShot:null,
      takeScreenShotImg:null,
      background:<img src={JPG1}/>,
      hideUI:false,
      checkBoard:{
        size:8,
        caroSize:1,
        isHidePlane:false,
        isHideCaro:false,
        isRecievieShadow:false,
        caroColor:{r: 255,g: 28,b: 104,a: 1,h: 0.9444444444444444,s: 0.88,v: 1,},
        planeColor:{r: 255,g: 255,b: 255,a: 1,h: 0.9444444444444444,s: 0.88,v: 1,}
      },
      showPopup:false,
      dontShow:false,
      showWarning:false,
      skipWarning:false,
      viewerTarget:null,
      graphicLevel:1,
      disableAllShadow:false,
      limitObjects:15,
      objectCount:0,
      showFPS:false,
    };
    this.update = this.update.bind(this);
    this.handleCheckWindow = this.handleCheckWindow.bind(this);
  }
  componentDidMount(){
    window.addEventListener('resize', this.handleCheckWindow);
    setTimeout(() => {
      this.setState({ isLoaded: true });
    }, 2500);
  }

  componentWillUnmount() {
    this.setState({ isLoaded: false });
  }

  update(props) {
    if(this.state !== props){
      this.setState(props);
      
    }
  }

  handleCheckWindow(){
    const { innerWidth: width, innerHeight: height } = window;
    console.log('isok')
    if(width<= 600){
      this.setState({showWarning:true})
    }else{
      this.setState({showWarning:false})
    }
  }
  

  render() {
    
    return (
      <div className='CreativeComp'>
        <Loading visible={!this.state.isLoaded}/>
        <ToolMenu data={this.state} setData={(props) => { this.update(props) }} />
        {/* <Viewer data={this.state} setData={(props) => { this.update(props) }} /> */}
        {this.state.isLoaded && <Object3D data={this.state} setData={(props) => { this.update(props) }} />}
        <ContextMenu target={this.state.target} menuItems={this.state.menuItems} mode={this.state.mode} pos={this.state.contextMenuPos}/>
        {
          !this.state.skipWarning &&
          <Popup data={this.state} setData={(props) => { this.update(props) }}/>
        }
        {(this.state.showFPS && !this.state.hideUI) &&
          <Stats showPanel={0} className="stats" parent={document.body} />
        }
        
        
      </div>
    );
  }
}
export default CreativeComp;

const Popup = props => {

  function handleClose() {
    props.setData({
      skipWarning: true
    })
  }
  

  return (
    <div className={`popup ${props.data.showWarning ? '' : 'hide'}`}>
      <p>This application is specifically designed for desktop computers. We recommend making the window size larger. We apologize for this inconvenience.</p>
      <a onClick={handleClose}>Skip and Close</a>
    </div>
  );
}

const UndoMoveOn = props => {
  return(
    <>
      <div className="toolbox">
          <div className="undo-button" id="undo" onClick={()=>{props.data.handleUndo()}}>
              <h3>Undo</h3>
          </div>
          <div className="redo-button" id="redo" onClick={()=>{props.data.handleMoveOn()}}>
              <h3>Redo</h3>
          </div>
        </div>
    </>
  )
}
