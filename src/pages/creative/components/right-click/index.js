import './style.scss'
import React, { Component, useEffect, useState, } from 'react'
import ReactDOM from 'react-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

export class ContextMenu extends React.Component {
  constructor({ target , menuItems, mode,pos  }) {
    super();
    this.state = {
      target:target,
      menuItems:menuItems,
      mode:mode,
      isOpened: false,
      setXY:{
        x:0,
        y:0,
        w:0,
        h:0
      },
      pos:pos
    }
    this.root = React.createRef(null);
    this.initSetup = this.initSetup.bind(this);
    this.updateMode = this.updateMode.bind(this);
    this.updateTarget = this.updateTarget.bind(this);
    this.updateMenuItems = this.updateMenuItems.bind(this);
    this.updatePos = this.updatePos.bind(this);
    this.menu = this.state.menuItems
  }
  
  componentDidMount(){
    
    setTimeout(()=>{
      this.initSetup();
    },1000)
    document.addEventListener("click", () => this.closeMenu());
    window.addEventListener("blur", () => this.closeMenu());
    document.addEventListener("contextmenu", (e) => {
      this._handleContextMenu(e)
    });

    
  }
  componentDidUpdate(prevProps) {
    if(this.props.mode !== prevProps.mode)
    {
      this.updateMode();
    }
    if(this.props.target !== prevProps.target){
      this.updateTarget();
    }
    if(this.props.menuItems !== prevProps.menuItems){
      this.updateMenuItems();
    }
    if(this.props.pos !== prevProps.pos){
      this.updatePos();
    }
  }

  updateMode(){
    if(this.state.mode == 'light'){
      this.setState({
        mode:'dark'
      })
    }else{
      this.setState({
        mode:'light'
      })
    }
  }
  updateTarget(){
    this.setState({
      target:this.props.target
    })
  }
  updateMenuItems(){
    this.setState({
      menuItems:this.props.menuItems
    })
  }

  updatePos(){
    this.setState({
      pos:this.props.pos
    })
    setTimeout(()=>{
      this.initSetup()
    },100)
    
  }

  initSetup(){
    if(this.state.target !== null){
      this.targetNode = this.getTargetNode();
    
    this.targetNode.forEach((target) => {
      target.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        this.setState({
          isOpened:true
        })
        if(this.root!==null&&this.state.setXY.w !== this.root.scrollWidth){
          this.setState({
            setXY:{
              w:this.root.scrollWidth
            }
          })
        }
        if(this.root!==null&&this.state.setXY.h !== this.root.scrollHeight){
          this.setState({
            setXY:{
              h:this.root.scrollHeight
            }
          })
        }

        const { clientX, clientY } = e;

        
        
        const positionY =
          clientY + this.state.setXY.h >= window.innerHeight
            ? window.innerHeight - this.state.setXY.h - 20
            : clientY;
        const positionX =
          clientX + this.state.setXY.w >= window.innerWidth
            ? window.innerWidth - this.state.setXY.w - 20
            : clientX;
        
            this.setState({
              setXY:{
                x:positionX,
                y:positionY,
              }
            })
      });
    });
    }else{
      {
        this.setState({
          isOpened:true
        })
        if(this.root!==null&&this.state.setXY.w !== this.root.scrollWidth){
          this.setState({
            setXY:{
              w:this.root.scrollWidth
            }
          })
        }
        if(this.root!==null&&this.state.setXY.h !== this.root.scrollHeight){
          this.setState({
            setXY:{
              h:this.root.scrollHeight
            }
          })
        }
  
        const { x, y } = this.props.pos;
  
        const positionY =
          y + this.state.setXY.h >= window.innerHeight
            ? window.innerHeight - this.state.setXY.h - 20
            : y;
        const positionX =
          x + this.state.setXY.w >= window.innerWidth
            ? window.innerWidth - this.state.setXY.w - 20
            : x;
        
            this.setState({
              setXY:{
                x:positionX,
                y:positionY,
              }
            })
      }
    }
    
  }

  componentWillUnmount() {
    document.removeEventListener("click", () => this.closeMenu());
    window.removeEventListener("blur", () => this.closeMenu());
    document.removeEventListener("contextmenu", (e) => {
      this._handleContextMenu(e)
    });
    // this.targetNode.forEach((target) => {
    //   target.removeEventListener("contextmenu")
    // })
  }

  getTargetNode() {
    const nodes = document.querySelectorAll(this.state.target);
    
    if (nodes && nodes.length !== 0) {
      return nodes;
    } else {
      console.error(`getTargetNode :: "${this.state.target}" target not found`);
      return [];
    }
  }
  
  closeMenu() {
    if (this.state.isOpened) {
      this.setState({
        isOpened:false
      })
      
    }
  }
  
  _handleContextMenu(e){
    e.preventDefault();
    if(this.targetNode){
      this.targetNode.forEach((target) => {    
        if (!e.target.contains(target) && this.state.isOpened) {
        
        } 
      });
    }
    
  }
  handleEvent(item){
    item.event();
    this.setState({
      menuItems:[],
    })
  }


  render() {
    
    if(this.state.isOpened){
      return(
        <ul ref={ref => (this.root = ref)} className='contextMenu' data-theme={this.state.mode} 
        style={{
          width:`${this.state.setXY.w}px`,
          height:`${this.state.setXY.h}px`,
          top:`${this.state.setXY.y}px`,
          left:`${this.state.setXY.x}px`
        }}
        >
          
          {this.state.menuItems.map((item, index) => (
              <li key={`${index}`} className={`contextMenu-item`} >
                <button className='contextMenu-button' onClick={()=>this.handleEvent(item)}>
                  <div className='contextMenu-button-icon'>
                    {item.icon}
                  </div>
                    {item.display}
                </button>
              </li>


            ))}
        </ul>
      )
    }else{
      return null
    }
    
    
    
      
    
    
  }

}


  
  