import React, { Component, useEffect, useState, } from 'react'
import * as THREE from 'three'
import { ToolMenu } from './components/toolMenu'
import { ContextMenu } from './components/right-click';
import { Object3D } from './components/3Dobjects';
import { Loading } from './components/Loading';
import './style.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';


const menuItems = [
  
];

class CreativeComp extends React.Component {
  constructor() {
    super();
    this.state = {
      scene: null,
      fileInputs: [],
      groups:[],
      target:".sidebarAll",
      menuItems:menuItems,
      mode:'light',
      isLoaded:false,
      isSearching:false,
      contextMenuPos:{x:0,y:0}
    };
    this.update = this.update.bind(this);
  }
  componentDidMount(){
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
      // console.log(props)
    }
    
    
  }

  render() {
    return (
      <div className='CreativeComp'>
        <Loading visible={!this.state.isLoaded}/>
        <ToolMenu data={this.state} setData={(props) => { this.update(props) }} />
        <Object3D data={this.state} setData={(props) => { this.update(props) }} fileInputs={this.state.fileInputs} groups={this.state.groups} isSearching={this.state.isSearching}/>
        <ContextMenu target={this.state.target} menuItems={this.state.menuItems} mode={this.state.mode} pos={this.state.contextMenuPos}/>
      </div>
    );
  }
}
export default CreativeComp;



