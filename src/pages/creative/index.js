import React, { Component, useEffect, useState, } from 'react'
import * as THREE from 'three'
import { ToolMenu } from './components/toolMenu'
import { ContextMenu } from './components/right-click';
import './style.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';


const menuItems = [
    
  {
    display: 'Copy',
    icon: <FontAwesomeIcon icon={faCopy} />,
    event:()=>{console.log('isCopy')},
  },
  
];

class CreativeComp extends React.Component {
  constructor() {
    super();
    this.state = {
      scene: null,
      fileInputs: [],
      target:".sidebarAll",
      menuItems:menuItems,
      mode:'light'
    };
    this.update = this.update.bind(this);
  }
  componentDidMount(){
    
  }

  update(props) {
    this.setState(props,console.log(props));
    
  }


  render() {
    return (
      <div className='CreativeComp'>
        <ToolMenu data={this.state} setData={(props) => { this.update(props) }} />
        <Vis data={this.state} setData={(props) => { this.update(props) }} />
        <ContextMenu target={this.state.target} menuItems={this.state.menuItems} mode={this.state.mode}/>
      </div>
    );
  }
}
export default CreativeComp;

const Vis = (props) => {
  const { useRef, useEffect, useState } = React
  const mount = useRef(null)
  const [isAnimating, setAnimating] = useState(true)
  const controls = useRef(null)



  useEffect(() => {
    let width = mount.current.clientWidth
    let height = mount.current.clientHeight
    let frameId

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff })
    const cube = new THREE.Mesh(geometry, material)

    camera.position.z = 4
    scene.add(cube);

    props.setData({
      scene: scene
    })

    renderer.setClearColor('#000000')
    renderer.setSize(width, height)

    const renderScene = () => {

      renderer.render(scene, camera)
    }

    const handleResize = () => {
      width = mount.current.clientWidth
      height = mount.current.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderScene()
    }

    const animate = () => {
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01

      renderScene()
      frameId = window.requestAnimationFrame(animate)
    }

    const start = () => {
      if (!frameId) {
        frameId = requestAnimationFrame(animate)
      }
    }

    const stop = () => {
      cancelAnimationFrame(frameId)
      frameId = null
    }

    mount.current.appendChild(renderer.domElement)
    window.addEventListener('resize', handleResize)
    start()

    controls.current = { start, stop }

    return () => {
      stop()
      window.removeEventListener('resize', handleResize);
      if (mount.current != null) {
        mount.current.removeChild(renderer.domElement)
      }

      scene.remove(cube);
      props.setData({ scene: scene });
      geometry.dispose()
      material.dispose()
    }
  }, [])

  useEffect(() => {
    if (isAnimating) {
      controls.current.start()
    } else {
      controls.current.stop()
    }
  }, [isAnimating])

  return <div className="vis" ref={mount} onClick={() => setAnimating(!isAnimating)} />
}

