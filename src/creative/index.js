import React, {Component, useEffect, useState } from 'react'
import '../subdir/style.scss'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import  gltfPath  from './assets/headphone1.gltf'
import iro from '@jaames/iro'

const Content = props => {
    // let isSetUp = true;
    // const scene = new THREE.Scene();
    // const bgScene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    // const renderer = new THREE.WebGLRenderer({ alpha: true });

    // const controls = new OrbitControls( camera, renderer.domElement );
    // // Materials

    // // Canvas Renderer
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.shadowMap.enabled = true;
    // renderer.autoClearColor = false;
    // renderer.shadowMapSoft = true;
    // renderer.autoClear = false;
    // renderer.xr.enabled = true;

    // renderer.shadowCameraNear = 1;
    // renderer.shadowCameraFar = 500;
    // renderer.shadowCameraFov = 60;

    // renderer.shadowMapBias = 0.05;
    // renderer.shadowMapDarkness = 1;
    // renderer.shadowMapWidth = 512;
    // renderer.shadowMapHeight = 512;

    // document.getElementById("saveImage").addEventListener('click', takeScreenshot);
    // document.body.appendChild(renderer.domElement);

    // document.getElementById("background").appendChild( renderer.domElement );
    // document.body.appendChild( VRButton.createButton( renderer ) );
    // camera.position.z = 12;
    // function onWindowResize(){
    //     camera.aspect = window.innerWidth / window.innerHeight;
    //     camera.updateProjectionMatrix();
    
    //     renderer.setSize( window.innerWidth, window.innerHeight );
    // }
    // window.addEventListener( 'resize', onWindowResize, false );



    // // bacgroundScene3D
    // const btnBG = document.getElementById('attachment-BG');
    // btnBG.addEventListener('click',toggleBGPicker);
    // let count = 1;
    // function toggleBGPicker() {
    //     isChangeBG = true;
    //     count++;
    //     if(count == 11){
    //         count = 1;
    //     }
    //     BGsource = require(`./assets/BG/${count}.jpg`);
    //     isChangeBG = true;
    //     draw();

    // }


    // let bgMesh;
    // let isChangeBG = false;
    // let BGsource = require('./assets/BG/1.jpg');
    // function addBackGround() {
    //     // const loader = new THREE.TextureLoader();
    //     // console.log(BGsource);
    //     const texture = new THREE.TextureLoader().load(
    //         // resource URL
    //         BGsource,
    //         // Function when resource is loaded
    //         function ( texture ) {
    //             // do something with the texture
                
    //         },
    //         // Function called when download progresses
    //         function ( xhr ) {
    //             console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    //         },
    //         // Function called when download errors
    //         function ( xhr ) {
    //             console.log( 'An error happened' );
    //         }
    //     );
    //     texture.magFilter = THREE.LinearFilter;
    //     texture.minFilter = THREE.LinearFilter;

    //     const shader = THREE.ShaderLib[ "equirect" ];
    //     const material = new THREE.ShaderMaterial({
    //     uniforms: shader.uniforms,
    //     fragmentShader: shader.fragmentShader,
    //     vertexShader: shader.vertexShader,
    //     depthWrite: false,
    //     side: THREE.DoubleSide,
    //     });
    //     material.map = true;
    //     material.uniforms.tEquirect.value = texture;
    //     // const material = new THREE.MeshPhongMaterial({ color: 0x33281b });
    //     const plane1 = new THREE.BoxBufferGeometry(2, 2, 2);
    //     bgMesh = new THREE.Mesh(plane1, material);
    //     bgScene.add(bgMesh);
    // }






    // // create object
    // let animateString = [];
    // let hpColor = 0x664e31;
    // const loaderHP = new GLTFLoader();
    // // anh tai nghe
    // let layerSource = require("./assets/BG/19.jpg") //thuoc tinh 1

    // let isChangeColor = false;
    // // anh sticker
    // let stikerSoucre = require("./assets/sticker/2.png");


    // function addHeadPhone() {
    //     let stickerSr = new THREE.TextureLoader().load(layerSource);
    //     loaderHP.load(gltfPath,function(glb){
    //         glb.scene.traverse( function( node ) {
    //             if ( node.isMesh ) { 
    //                 node.castShadow = true; 
    //                 console.log(node);
    //                 node.material.map = stickerSr;
    //                 node.material.color.setHex( hpColor); // them mau cho tai nghe
                    
    //             }
    //         } );
            
    //         const glbHP = glb.scene;
    //         scene.add(glbHP);
            
    //     },function(xhr){
    //         console.log((xhr.loader/xhr.total*100) + "% loader")
    //     },function(error){
    //         console.log('Error')
    //     })
    // }

    // // color picker
    // let isOpenColor = false;
    // let randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    // var colorPicker = new iro.ColorPicker(".colorPicker", {
    //     width: 180,
    //     color: randomColor,
    //     borderWidth: 1,
    //     borderColor: "#fff",
    // });
    
    // var values = document.getElementById("values");
    // var hexInput = document.getElementById("hexInput");
    
    
    // colorPicker.on(["color:init", "color:change"], function(color){
    //     values.innerHTML = [
    //     "hex: " + color.hexString,
    //     "rgb: " + color.rgbString,
    //     "hsl: " + color.hslString,
    //     ].join("<br>");
        
    //     hexInput.value = color.hexString.toString();
    //     hpColor = '0x' + (color.hexString).substring(1);
    //     isChangeColor = true;
    //     draw()
    // });
    
    // hexInput.addEventListener('change', function() {
    //     colorPicker.color.hexString = this.value;

    // });
    // // change color

    // const btnColor = document.getElementById('attachment-color');
    // btnColor.addEventListener('click',toggleColorPicker);
    // function toggleColorPicker() {
    //     const element = document.querySelector('.wrap');
    //     console.log(123456)
    //     isOpenColor = !isOpenColor;
        
    //     element.style.visibility = isOpenColor ? 'visible' : 'hidden';
    //     element.style.opacity = isOpenColor ? 1 : 0;
    // }


    // //getRadomObject
    // const btnRadom = document.getElementById('radom');
    // btnRadom.addEventListener('click',getRadomObject);

    // function getRadomObject () {
    //     randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    //     hpColor = '0x' + (randomColor).substring(1);
    //     console.log(hpColor);
    //     layerSource = require(`./assets/BG/${Math.floor(Math.random() * 20) + 1}.jpg`)
    //     stikerSoucre = require(`./assets/sticker/${Math.floor(Math.random() * 76) + 1}.png`);
    //     isChangeColor = true;
    //     draw();
    // }


    // camera.position.z = 5;
    // function resizeRendererToDisplaySize(renderer) {
    //     const canvas = renderer.domElement;
    //     const width = canvas.clientWidth;
    //     const height = canvas.clientHeight;
    //     const needResize = canvas.width !== width || canvas.height !== height;
    //     if (needResize) {
    //     renderer.setSize(width, height, false);
    //     }
    //     return needResize;
    // }

    // function animate() {
    //     if (resizeRendererToDisplaySize(renderer)) {
    //     const canvas = renderer.domElement;
    //     camera.aspect = canvas.clientWidth / canvas.clientHeight;
    //     camera.updateProjectionMatrix();
    //     }
        
    //     if(animateString.length != 0){
    //         animateString.forEach(element =>{
    //             element();
    //         })
    //     }
    //     bgMesh.position.copy(camera.position);
    //     renderer.render(bgScene, camera);
    //     renderer.render( scene, camera );
        
        
        
    //     requestAnimationFrame( animate );
        
    // };


    // // nen san


    // function addPlane() {
        
    //     let stiker = new THREE.TextureLoader().load(stikerSoucre);
    //     const planeGeo = new THREE.PlaneGeometry(1,1,1,1);
    //     let material = new THREE.MeshStandardMaterial({
    //         map: stiker
    //     })
    //     material.transparent = true;
    //     //plane
    //     const plane = new THREE.Mesh(planeGeo,material )
        
    //     scene.add(plane)

        
    //     plane.receiveShadow = true;
        
    //     plane.rotation.y = -Math.PI / 2.1;
        
    //     plane.rotateOnAxis(new THREE.Vector3(1,0,0),Math.PI/5.9);
        
    //     plane.position.set(-1.819, -1.7, 0)
    //     //plane2
    //     const plane2 = new THREE.Mesh(planeGeo,material )
    //     scene.add(plane2)
        
    //     plane2.receiveShadow = true;
    //     plane2.rotation.y = Math.PI / 2.1;
        
    //     plane2.rotateOnAxis(new THREE.Vector3(1,0,0),Math.PI/5.9);
        
    //     plane2.position.set(1.819, -1.7, 0)
    // }


    // function addLights() {
    //     const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.4, 100 );
    //     const light = new THREE.HemisphereLight(0xffffff, 0xb3858c, 0.9);
    
    //     scene.add(light);
    //     scene.add(directionalLight);
        
    //     directionalLight.position.set( 8, 8, 8 );
        
    //     directionalLight.castShadow = true;
        
    //     directionalLight.shadow.mapSize.width = 512;  // default
    //     directionalLight.shadow.mapSize.height = 512; // default
    //     directionalLight.shadow.camera.near = 0.5;    // default
    //     directionalLight.shadow.camera.far = 500;
    // }

    // function draw() {
    //     if(isSetUp == true){
    //         scene.remove.apply(scene, scene.children);
    //         bgScene.remove.apply(bgScene,bgScene.children);
            
            
    //         addBackGround();
    //         addPlane();
    //         addLights();
    //         addHeadPhone();
    //         isSetUp = false;
    //     }else{
    //         scene.remove.apply(scene, scene.children);
    //         if(isChangeBG ==  true){
    //             bgScene.remove.apply(bgScene,bgScene.children);
    //             addBackGround();
    //             isChangeBG = false;
    //         }
            
    //         addPlane();
    //         addLights();
    //         if(isChangeColor == true){
    //             addHeadPhone();
    //             isOpenColor = false;
    //         }
    //     }
        
    // }
    // animate();
    // draw();
    // const submitDown = document.getElementById('submit');

    // // submitDown.addEventListener('submit',tool);

    // // function tool(){
    // //     let n = document.forms[0].fname.value;
        
    // //     if(n && n > 0){
    // //         let a = []
    // //         for(let i = 0;i <n;i++){
    // //             a.push(0)
    // //         }
    // //         a.forEach(async i =>{
    // //             console.log(i)
    // //             await getRadomObject();
    // //             setTimeout(()=>{
    // //                 download();
    // //                 takeScreenshot();
    // //             },3000)
    // //         })
    // //     }
    // // }





    // // Download glb
    // const btnDown = document.getElementById('download');
    // const linkDown = document.createElement('a');
    // btnDown.addEventListener('click',download);

    // function download(){
    //     console.log('isdownload')
        
    //     const exporter = new GLTFExporter();
    //     exporter.parse(
    //         [scene],
    //         function (result) {
    //             saveArrayBuffer(result, 'new.glb'); 
    //         },
    //         { 
    //             binary: true
    //         }
    //     );
    // }

    // function saveArrayBuffer(buffer, filename) {
    //     save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
    // }

    // function takeScreenshot() {

    
    //     renderer.render(scene, camera);
    //     renderer.domElement.toBlob(function(blob){
    //         var a = document.createElement('a');
    //     var url = URL.createObjectURL(blob);
    //     a.href = url;
    //     a.download = 'new.png';
    //     a.click();
    //     }, 'image/png', 1.0);

        
    // }

    // function save(blob, filename) {
    //     linkDown.href = URL.createObjectURL(blob); 
    //     linkDown.download = filename;
    //     linkDown.click(); // This step makes sure your glb file gets downloaded
    //     // sendFileToBackend(blob, filename)
    // }

    // function sendFileToBackend(blob, filename){
    //     const endpoint = "YOUR_BACKEND_URL_HERE";
    //     const formData = new FormData();

    //     let sceneFile= new File([blob], filename);
    //     console.log(sceneFile)
    //     formData.append("file", sceneFile);

    //     const options = {
    //         method:'POST',
    //         mode: 'no-cors',
    //         body: formData,
    //     }

    //     fetch(endpoint,options)
    //         .then(response => console.log(JSON.stringify(response)))
    //         .catch(error => console.error('Error:', error))

    // }
    return (
      <div>
        <button class="download" id="download" >Download</button>

        <button class="radom" id="radom" >Radom</button>
        <button class="saveImage" id="saveImage" >SaveImage</button>

        {/* <form id="submit" action="javascript:void(0);">
        Enter number: <input id="fname" type="number" size="20">
        <input type="submit" value="Submit">
        </form> */}

        <div id="background" class="background"></div>

        <div class="attachment attachment-color" id="attachment-color" >
            <div class="attachment__button-content">
            <div class="add-sign">
                <div class="add-sign-color">
                Color
                </div>
            </div>
            </div>
        </div>

        <div class="attachment attachment-BG" id="attachment-BG" >
        <div class="attachment__button-content">
            <div class="add-sign">
            <div class="add-sign-color">
                BG
            </div>
            </div>
        </div>
        </div>


        <div class="wrap">
            <div class="half">
            <div class="colorPicker"></div>
            </div>
            <div class="half readout">
            <span class="title">Selected Color:</span>
            <div id="values"></div>
            <input id="hexInput"></input>
            </div>
        </div>
      </div>
    );
  };

  class CreativeComp extends React.Component {
    render() {
      return (
          <div>
            <Content/>
          </div>
      );
    }
  }
export default CreativeComp;