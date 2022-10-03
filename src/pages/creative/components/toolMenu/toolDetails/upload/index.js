import React, { useEffect, useState } from 'react'
import reactStringReplace from 'react-string-replace';
import ReactTooltip from 'react-tooltip';
import './style.scss'
import * as THREE from 'three';
import { useDrag } from "@use-gesture/react";

export const Upload = props => {


  let xhr = new XMLHttpRequest();
  const [data, setData] = useState(null);
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');
  const [isGood, setIsGood] = useState(false);
  const [isGltf, setIsGltf] = useState(false);
  const [progress, setProgress] = useState({
    max: 0,
    value: 0,
  });
  

  function fileDragHover(e) {
    if (xhr.upload) {
      e.stopPropagation();
      e.preventDefault();
      setData(e);
    }

  }

  function fileSelectHandler(e) {
    if (xhr.upload) {
      var files = e.target.files || e.dataTransfer.files;

      // Cancel event and hover styling
      fileDragHover(e);

      // Process all File objects
      for (var i = 0, f; f = files[i]; i++) {
        parseFile(f);
        uploadFile(f);
      }
    }
    // Fetch FileList object

  }

  function output(msg) {
    setMsg(msg);
  }

  function parseFile(file) {

    setFile(file);
    var place = encodeURI(file.name).toString();
    place = reactStringReplace(place, '%20', match => ' ');
    output(
      place
    );
    var imageName = file.name;

    var isGood = (/\.(?=gif|jpg|png|jpeg|gltf|glb)/gi).test(imageName);
    var isGltf = (/\.(?=gltf|glb)/gi).test(imageName)
    setIsGood(isGood);
    setIsGltf(isGltf);

  }

  function setProgressMaxValue(e) {
    
    if (e.lengthComputable) {
      setProgress({
        max: e.total
      }, console.log(progress))
    }
  }

  function updateFileProgress(e) {
    if (e.lengthComputable) {
      setProgress({
        value: e.loaded
      })
    }
  }


  function uploadFile(file) {
    let fileSizeLimit = 1024; // In MB
    if (xhr.upload) {
      // Check if file is less than x MB

      if (file.size <= fileSizeLimit * 1024 * 1024) {
        // Progress bar


        xhr.addEventListener('loadstart', setProgressMaxValue, true);
        xhr.addEventListener('progress', updateFileProgress, true);

        // File received / failed
        xhr.onreadystatechange = function (e) {
          if (xhr.readyState == 4) {

          }
        };

        // Start upload
        xhr.open('GET', window.URL.createObjectURL(file));
        xhr.setRequestHeader('X-File-Name', file.name);
        xhr.setRequestHeader('X-File-Size', file.size);
        xhr.setRequestHeader('Content-Type', 'multipart/form-data');
        xhr.send(file);
      } else {
        output('Please upload a smaller file (< ' + fileSizeLimit + ' MB).');
      }
    }
  }

  function addFileToObject(){
    if(isGood){
      let listFiles = [];
      listFiles = props.data.fileInputs;
      listFiles.push([file]);
      props.setData({
        fileInputs:listFiles,
        isSearching:true
      })
      // props.switchChanel(1);
    } 
    
  }
  

  
  
  return (
    <div>
      <div className='uploader'>
        <input id="file-upload"
          onChange={fileSelectHandler}
          type="file" name="fileUpload" accept="image/*" />

        <label htmlFor="file-upload" id={`file-drag ${data?.type === 'dragover' ? 'hover' : 'modal-body file-upload'}`}
          onDragOver={(e) => fileDragHover(e)}
          onDragLeave={(e) => fileDragHover(e)}
          onDrop={(e) => fileSelectHandler(e)}

          

        >
          <img id="file-image" src={file ? window.URL.createObjectURL(file) : ""} alt="Preview" className={`${isGltf ? 'hidden' : (isGood ? '' : 'hidden')}`}></img>
          <div id="start" className={`${isGood ? 'hidden' : ''}`}>
            <i className="fa fa-download" aria-hidden="true"></i>
            <div>Select a file or drag here</div>
            <div id="notimage" className={`${isGood ? 'hidden' : ''}`}></div>
            <span id="file-upload-btn" className="btn btn-primary" >Select a file</span>
          </div>
          <div id="response" className={`${isGood ? '' : 'hidden'}`}>
            <div id="messages">{msg}</div>
            <progress className="progress" id="file-progress" value={progress.value} max={progress.max} >
              <span>0</span>%
            </progress>
          </div>
        </label>
      </div>

      <div className='addObjectBtn' onClick={addFileToObject}>
        <span className="btn" data-tip={file?'Add to Object':'You upload nothing!'} >Add</span>
        <ReactTooltip/>
      </div>
      {/* note */}
      {isGood?
        <div className="note-box success">
        <div className="note-icon"><span><i className="fa fa-check" aria-hidden="true"></i>
        </span></div>
        <div className="note-text">
          <h2>Success!</h2>
          <p>You have successfully uploaded the file. Now, you can now add objects at a location you specify.</p>
        </div>
      </div>
      :
        <div className="note-box idea">
        <div className="note-icon"><span><i className="fa fa-lightbulb-o" aria-hidden="true"></i>
        </span></div>
        <div className="note-text">
          <h2>Note:</h2>
          <p>You can upload image files or 3D files as GLFB or GBL. We currently only support those 2 formats. Sorry for about thats, we will improve it in the future.</p>
        </div>
      </div>
      }
      

    </div>

  )
};