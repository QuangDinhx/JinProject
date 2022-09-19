import './style.scss'
import React, { Component, useEffect, useState, } from 'react'
import ReactDOM from 'react-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

export class ContextMenu extends React.Component {
  constructor({ target = null, menuItems = [], mode = "light" }) {
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
      }
    }
    this.root = React.createRef(null);
    this.initSetup = this.initSetup.bind(this);
    this.updateMode = this.updateMode.bind(this)
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

  initSetup(){
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
        console.log([positionX,positionY])
        
            
            this.setState({
              setXY:{
                x:positionX,
                y:positionY,
              }
            })
      });
    });
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

// export class ContextMenu {
//     constructor({ target = null, menuItems = [], mode = "light" }) {
//       this.target = target;
//       this.menuItems = menuItems;
//       this.mode = mode;
      
//       this.isOpened = false;
//     }
  
//     getTargetNode() {
//       const nodes = document.querySelectorAll(this.target);
  
//       if (nodes && nodes.length !== 0) {
//         return nodes;
//       } else {
//         console.error(`getTargetNode :: "${this.target}" target not found`);
//         return [];
//       }
//     }
  
//     getMenuItemsNode() {
//       const nodes = [];
  
//       if (!this.menuItems) {
//         console.error("getMenuItemsNode :: Please enter menu items");
//         return [];
//       }
  
//       this.menuItems.forEach((data, index) => {
//         const item = this.createItemMarkup(data);
//         item.firstChild.setAttribute(
//           "style",
//           `animation-delay: ${index * 0.08}s`
//         );
//         nodes.push(item);
//       });
  
//       return nodes;
//     }
  
//     createItemMarkup(data) {
//       const button = document.createElement("BUTTON");
//       const item = document.createElement("LI");
  
//       button.innerHTML = data.content;
//       button.classList.add("contextMenu-button");
//       item.classList.add("contextMenu-item");
  
//       if (data.divider) item.setAttribute("data-divider", data.divider);
//       item.appendChild(button);
  
//       if (data.events && data.events.length !== 0) {
//         Object.entries(data.events).forEach((event) => {
//           const [key, value] = event;
//           button.addEventListener(key, value);
//         });
//       }
  
//       return item;
//     }
  
//     renderMenu() {
//       const menuContainer = React.createElement("UL");
      
//       console.log(menuContainer)
//       menuContainer.classList.add("contextMenu");
//       menuContainer.setAttribute("data-theme", this.mode);
  
//       this.menuItemsNode.forEach((item) => menuContainer.appendChild(item));
      
//       return menuContainer;
//     }
  
//     closeMenu(menu) {
//       if (this.isOpened) {
//         this.isOpened = false;
//         console.log(this.isOpened);
//         menu.remove();
//       }
//     }
  
//     init() {
//       this.targetNode = this.getTargetNode();
//       this.menuItemsNode = this.getMenuItemsNode();
//       const contextMenu = this.renderMenu();
//       document.addEventListener("click", () => this.closeMenu(contextMenu));
//       window.addEventListener("blur", () => this.closeMenu(contextMenu));
//       document.addEventListener("contextmenu", (e) => {
//         this.targetNode.forEach((target) => {
//           if (!e.target.contains(target)) {
//             contextMenu.remove();
//           }
//         });
//       });
  
//       this.targetNode.forEach((target) => {
//         target.addEventListener("contextmenu", (e) => {
//           e.preventDefault();
//           this.isOpened = true;
//           console.log(this.isOpened)
  
//           const { clientX, clientY } = e;
//           document.body.appendChild(contextMenu);
  
//           const positionY =
//             clientY + contextMenu.scrollHeight >= window.innerHeight
//               ? window.innerHeight - contextMenu.scrollHeight - 20
//               : clientY;
//           const positionX =
//             clientX + contextMenu.scrollWidth >= window.innerWidth
//               ? window.innerWidth - contextMenu.scrollWidth - 20
//               : clientX;
  
//           contextMenu.setAttribute(
//             "style",
//             `--width: ${contextMenu.scrollWidth}px;
//             --height: ${contextMenu.scrollHeight}px;
//             --top: ${positionY}px;
//             --left: ${positionX}px;`
//           );
//         });
//       });
//     }
//   }
  
  // const copyIcon = `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" style="margin-right: 7px" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
  
  // const cutIcon = `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" style="margin-right: 7px" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>`;
  
  // const pasteIcon = `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" style="margin-right: 7px; position: relative; top: -1px" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>`;
  
  // const downloadIcon = `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" style="margin-right: 7px; position: relative; top: -1px" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`;
  
  // const deleteIcon = `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" fill="none" style="margin-right: 7px" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;
  
  // const menuItems = [
  //   {
  //     content: `${copyIcon}Copy`,
  //     events: {
  //       click: (e) => console.log(e, "Copy Button Click")
  //       // mouseover: () => console.log("Copy Button Mouseover")
  //       // You can use any event listener from here
  //     }
  //   },
  //   { content: `${pasteIcon}Paste` },
  //   { content: `${cutIcon}Cut` },
  //   { content: `${downloadIcon}Download` },
  //   {
  //     content: `${deleteIcon}Delete`,
  //     divider: "top" // top, bottom, top-bottom
  //   }
  // ];
  
  // const light = new ContextMenu({
  //   mode: "light", // default: "dark"
  //   menuItems
  // });
  
  // light.init();
  
  // const dark = new ContextMenu({
  //   menuItems
  // });
  
  // dark.init();
  
  
  