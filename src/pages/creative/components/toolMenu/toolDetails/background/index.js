import React, { useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip';
import reactStringReplace from 'react-string-replace';
import JPG1 from './image/1.jpg';
import JPG2 from './image/2.jpg';
import JPG3 from './image/3.jpg'
import JPG4 from './image/4.jpg'
import JPG5 from './image/5.jpg'
import JPG6 from './image/6.jpg'
import custom from './image/custom.jpg'
import def from './image/default.jpg'



import './style.scss'


export const MyBackground = props => {

    const [listObject, setListObject] = useState([
        {
            image: <img src={def} />,
            state: null,
            name: "default"
        },
        {
            image: <img src={JPG1} />,
            state: true,
            name: '1'
        },
        {
            image: <img src={JPG2} />,
            state: true,
            name: '2'
        },
        {
            image: <img src={JPG3} />,
            state: true,
            name: '3'
        },
        {
            image: <img src={JPG4} />,
            state: true,
            name: '4'
        },
        {
            image: <img src={JPG5} />,
            state: true,
            name: '5'
        },
        {
            image: <img src={JPG6} />,
            state: true,
            name: '6'
        },
        {
            image: <img src={custom} />,
            state: false,
            name: 'custom'
        }
    ]);
    const [mode, setMode] = useState()
    function toggleListorGrid() {
        setIsGrid(!isGrid);
        setActive(true);
    }

    const [isGrid, setIsGrid] = useState(true);
    const [isActive, setActive] = useState(false);
    const [isSelected, setSelected] = useState();
    const [isCustom, setIsCustom] = useState(false);
    const [isChanging, setIsChanging] = useState(false);


    function handleSelect(item) {
        if (item.state == null) {
            if (isChanging == false) {
                props.setData({
                    background: null
                })
                setIsChanging(true)
                setTimeout(() => {
                    setIsChanging(false)
                }, 2000)
            }
        }
        if (item.state == true) {
            if (isChanging == false) {
                props.setData({
                    background: item.image
                })
                setIsChanging(true)
                setTimeout(() => {
                    setIsChanging(false)
                }, 2000)
            }
        }
        if (item.state == false) {
            setIsCustom(true)
        }
    }

    let xhr = new XMLHttpRequest();
    const [data, setData] = useState(null);
    const [file, setFile] = useState(null);

    const [msg, setMsg] = useState('');
    const [isGood, setIsGood] = useState(false);
    const [isGltf, setIsGltf] = useState(false);
    const [isImg, setIsImg] = useState(false);


    const [progress, setProgress] = useState({
        max: 0,
        value: 0,
    });

    function Restart() {
        setData(null);
        setFile(null);
        setMsg('');
        setIsGood(false);
        setIsGltf(false);
        setProgress({
            max: 0,
            value: 0,
        })
    }


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
        var isImg = (/\.(?=jpg|png|jpeg)/gi).test(imageName);
        setIsGood(isGood);
        setIsGltf(isGltf);
        setIsImg(isImg)
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

    function handleUpload(){
        if(isImg){
            props.setData({
                background: <img src={URL.createObjectURL(file)}/>
            })
        }
    }

    return (
        <div className='objectComp' data-theme={mode}>
            {!isCustom ?
                <button className={`grid-list ${isActive ? (isGrid ? 'animation' : 'animation active') : ''}`} onClick={toggleListorGrid}>
                    <div className="icon">
                        <div className="dots">
                            <i></i><i></i><i></i><i></i>
                        </div>
                        <div className="lines">
                            <i></i><i></i><i></i><i></i>
                        </div>
                    </div>
                    <div className="text">
                        <span>Grid</span>
                        <span>List</span>
                    </div>
                </button>
                :
                <button className="leftArrow" onClick={() => setIsCustom(false)}><i className="fa fa-3x fa-arrow-circle-left"></i></button>
            }

            <div className='objectBg' id='style-1'>
                {!isCustom ?
                    <div className={`${isGrid ? 'object-grid' : 'object-list'}`} >
                        {listObject.map((item, index) => (
                            <div key={index} className={`object object--${index}`} onClick={() => { handleSelect(item) }}>
                                <div className="object-image">
                                    {item.image}
                                </div>
                                <h3 className="object-name">
                                    {item.name}
                                </h3>

                            </div>
                        ))}
                    </div>
                    :
                    <div className='setting'>
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
                                <div id="start" className={`${isImg ? 'hidden' : ''}`}>
                                    <i className="fa fa-download" aria-hidden="true"></i>
                                    <div>Select a file or drag here</div>
                                    <div id="notimage" className={`${isImg ? 'hidden' : ''}`}></div>
                                    <span id="file-upload-btn" className="btn btn-primary" >Select a file</span>
                                </div>
                                <div id="response" className={`${isImg ? '' : 'hidden'}`}>
                                    <div id="messages">{msg}</div>
                                    <progress className="progress" id="file-progress" value={(progress.value).toString()} max={progress.max} >
                                        <span>0</span>%
                                    </progress>
                                </div>

                            </label>
                        </div>

                        <div className='addObjectBtn' onClick={handleUpload}>
                            <span className="btn" data-tip={file ? ('Add to Object') : 'You upload nothing!'} >Submit</span>
                            <ReactTooltip />
                        </div>
                        {isImg ?
                            <div className="note-box success">
                                <div className="note-icon"><span><i className="fa fa-check" aria-hidden="true"></i>
                                </span></div>
                                <div className="note-text">
                                    <h2>Success!</h2>
                                    <p>You have successfully uploaded the file.</p>
                                </div>
                            </div>
                            :
                            <div className="note-box idea">
                                <div className="note-icon"><span><i className="fa fa-lightbulb-o" aria-hidden="true"></i>
                                </span></div>
                                <div className="note-text">
                                    <h2>Note:</h2>
                                    <p>You may want to upload a 360 degree photo for the best experience.</p>
                                </div>
                            </div>
                        }
                    </div>
                }


            </div>
        </div>

    )
}