import React, { Component, useEffect, useState, } from 'react'
import * as THREE from 'three'
import { ToolMenu } from './components/toolMenu'
import { ContextMenu } from './components/right-click';
import { Object3D } from './components/3Dobjects';
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
      mode:'light'
    };
    this.update = this.update.bind(this);
  }
  componentDidMount(){
    
  }

  update(props) {
    this.setState(props);
    console.log(props)
    
  }

  render() {
    return (
      <div className='CreativeComp'>
        <ToolMenu data={this.state} setData={(props) => { this.update(props) }} />
        <Object3D data={this.state} setData={(props) => { this.update(props) }} fileInputs={this.state.fileInputs} groups={this.state.groups}/>
        <ContextMenu target={this.state.target} menuItems={this.state.menuItems} mode={this.state.mode}/>
      </div>
    );
  }
}
export default CreativeComp;



