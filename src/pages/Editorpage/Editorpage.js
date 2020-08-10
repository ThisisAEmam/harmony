import React, { useEffect, Component} from "react";
// import classes from "./Editorpage.module.css";
// import { useDispatch } from "react-redux";
// import { setCurrentPage } from "../../features/currentPageSlice";
import Navbar from "../../containers/Navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

import "tui-image-editor/dist/tui-image-editor.css";
import "./EditorPage.css";
import ImageEditor from "@toast-ui/react-image-editor";
import {Button,Modal} from "react-bootstrap";
// import { withRouter } from 'react-router';
import Axios from 'axios';
import Loader from 'react-loader-spinner';

const icona = require("tui-image-editor/dist/svg/icon-a.svg");
const iconb = require("tui-image-editor/dist/svg/icon-b.svg");
const iconc = require("tui-image-editor/dist/svg/icon-c.svg");
const icond = require("tui-image-editor/dist/svg/icon-d.svg");
const download = require("downloadjs");
const myTheme = {
  // 'common.bi.image': '',
  'common.border': '0px',
  'common.bisize.height': '0px',
  "common.backgroundColor": "#414551",
  "downloadButton.backgroundColor": "white",
  "downloadButton.borderColor": "white",
  "downloadButton.color": "black",
  "menu.normalIcon.path": icond,
  "menu.activeIcon.path": iconb,
  "menu.disabledIcon.path": icona,
  "menu.hoverIcon.path": iconc,
  'menu.normalIcon.color': '#d25a46',
  'menu.activeIcon.color': '#eb5f4b',
  'menu.disabledIcon.color': '#dbbdb9',
  'menu.hoverIcon.color': '#e6887b',
  'submenu.normalIcon.color': '#8a8a8a',
  'submenu.activeIcon.color': '#e9e9e9',
  'menu.iconSize.width': '20px',
  'menu.iconSize.height': '20px',
  'loadButton.backgroundColor': '#eb5f4b',
  'loadButton.color': '#414551',
  'loadButton.fontSize': '20px',
};

class EditorPage extends Component {
  // const dispatch = useDispatch(setCurrentPage);
  // useEffect(() => {
  //   dispatch(setCurrentPage("Editor"));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // return (
  //   <div className={classes.Editorpage}>
  //     <Navbar />
  //     </div>
  // );
  
  state={
    imageSrc:'',
    secImageSrc:'', 
    setImageSrc:"",
    loading:false,
    showModal:false,
    secondaryImage:false,
    secondaryObj:null,
    btnActivate:false
  }
  fileSrc = React.createRef();
  imageEditor = React.createRef();
  componentDidMount(){
    const fileInput = document.getElementsByClassName("tui-image-editor-load-btn")[1]
    const that = this
    fileInput.addEventListener('change',function() {
        that.setState({btnActivate:true})
    })
  }
  saveImageToDisk = () => {
    const imageEditorInst = this.imageEditor.current.imageEditorInst;
    const data = imageEditorInst.toDataURL();
    if (data) {
      const mimeType = data.split(";")[0];
      const extension = data.split(";")[0].split("/")[1];
      download(data, `image.${extension}`, mimeType);
    }
  }

   magicLoad =()=>{
    const imageEditorInst = this.imageEditor.current.imageEditorInst;
    const data = imageEditorInst.toDataURL();
    var data1='';
    var width = imageEditorInst._graphics.canvasImage.width;
    var height = imageEditorInst._graphics.canvasImage.height;   
    var canvas = document.createElement('canvas');
    var img = new Image();
    var that = this
    img.onload = function(){
      var ctx = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      var props = imageEditorInst.getObjectProperties(that.state.secondaryObj.id, ['left', 'top', 'width', 'height']); 
      var width1 = props.width;
      var height1 = props.height;
      var startX = props.left-(width1/2);
      var startY= props.top-(height1/2);
      ctx.fillStyle = "black";
      ctx.drawImage(this,startX,startY,width1,height1);
      ctx.globalCompositeOperation="source-in";
      ctx.fillStyle="white";
      ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.globalCompositeOperation="destination-atop";
      ctx.fillStyle="black";
      ctx.fillRect(0,0,canvas.width,canvas.height);
      data1 = canvas.toDataURL();
      var canvas2 = document.createElement('canvas');
      var ctx2 = canvas2.getContext('2d');
      canvas2.width = width;
      canvas2.height = height;
      ctx2.drawImage(imageEditorInst._graphics.canvasImage._element, 0, 0,width,height);
      
      var data2 = canvas2.toDataURL();
      // console.log(data);
      // console.log(data1);
      // console.log(data2)
      const mimeType = data.split(";")[0];
      const extension = data.split(";")[0].split("/")[1];
      download(data, `image.${extension}`, mimeType);
      const mimeType1 = data1.split(";")[0];
      const extension1 = data1.split(";")[0].split("/")[1];
      download(data1, `image.${extension1}`, mimeType1);
      const mimeType2 = data2.split(";")[0];
      const extension2 = data2.split(";")[0].split("/")[1];
      download(data2, `image.${extension2}`, mimeType2);
    }
    img.src = this.state.secImageSrc;
    // this.props.updateImage(data);
    // this.props.history.push('magic');
   }

   dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {type:mime});
   }

  segmentPost= ()=>{
    const imageEditorInst = this.imageEditor.current.imageEditorInst;
    const data = imageEditorInst.toDataURL();
    // this.imageEditor.current.addIcon('arrow'); 
    this.setState({loading:true},()=>{
      Axios.post('https://segmentor.azurewebsites.net', {img:data}).then(response=>{
        imageEditorInst.loadImageFromFile(this.dataURLtoFile(response.data.res, 'lena')).then(()=>{
          this.setState({loading:false});
        });
      });
    });
  }

  colorizePost= ()=>{
    const imageEditorInst = this.imageEditor.current.imageEditorInst;
    const data = imageEditorInst.toDataURL(); 
    this.setState({loading:true},()=>{
      Axios.post('https://colorer.azurewebsites.net', {input:data}).then(response=>{
        imageEditorInst.loadImageFromFile(this.dataURLtoFile(response.data.res, 'lena')).then(()=>{
          this.setState({loading:false});
        });
      });
    });
  }

  launchModal = () => {
    this.setState({showModal:true});
  }
  handleClose = () => {
      this.setState({showModal:false})
  }
  uploadSecondImage=()=>{
    var file = this.fileSrc.current.files[0];
    var reader  = new FileReader();
    const that = this;
    reader.onloadend = function () {
      that.setState({secImageSrc:reader.result})
      const imageEditorInst = that.imageEditor.current.imageEditorInst;
      imageEditorInst.addImageObject(reader.result).then(object => {
        that.setState({secondaryImage:true})
        that.setState({secondaryObj:object})
      });
    }
    if (file) {
      reader.readAsDataURL(file);
    } 
    else {
      that.secondaryImage.current.src  = '';
    }
    this.handleClose();
  }

  render(){
    return (
      <div>
        <Navbar />
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
          <Modal.Title>Choose your secodary Image</Modal.Title>
          </Modal.Header>
          <Modal.Body><input type='file' ref={this.fileSrc}/></Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
              Close
          </Button>
          <Button variant="primary" onClick={this.uploadSecondImage} style={{backgroundColor:"#eb5f4b"}} className='button'>
              Open Image
          </Button>
          </Modal.Footer>
        </Modal>
        <div className="page">
        
        {this.state.loading===false?
          <div className="center"style={{minHeight:'50px'}}>
            <Button style={{display:this.state.btnActivate===true?"inline-block":"none"}} className='button' onClick={this.saveImageToDisk}>Save Image to Disk</Button>
            <Button style={{display:this.state.btnActivate===true?"inline-block":"none",marginLeft:'50px'}} className='button' onClick={this.segmentPost}>Segment</Button>
            <Button style={{display:this.state.btnActivate===true?"inline-block":"none",marginLeft:'50px'}} className='button' onClick={this.colorizePost}>Colorization</Button>          
            <Button type ='file' style={{display:this.state.btnActivate===true?"inline-block":"none",marginLeft:'50px'}} className='button' onClick={this.launchModal} >Upload Secondary Image</Button>
            <Button style={{display:this.state.secondaryImage===true?"inline-block":"none",marginLeft:'50px'}} className='button' onClick={this.magicLoad}>Harmonize</Button>
          </div>
          :<div></div>
        }
        <div style={{display:this.state.loading===false? "flex":"none", justifyContent: "center", alignItems: "center"}} >
          <ImageEditor
            includeUI={{
              loadImage: {
                path: this.state.imageSrc,
                name: "image",
              },
              theme: myTheme,
              menu: ["crop", "flip", "rotate", "draw", "shape", "text", "filter"],
              initMenu: "",
              uiSize: {
                height: `calc(77vh)`,
                width: `calc(150vh)`
              },
              menuBarPosition: "left",
            }}
            cssMaxHeight={window.innerHeight}
            cssMaxWidth={window.innerWidth}
            selectionStyle={{
              cornerSize: 20,
              rotatingPointOffset: 70,
            }}
            usageStatistics={true}
            ref={this.imageEditor}
          />
        </div>
        <div>
          <div style={{display:this.state.loading===true?"flex":"none", justifyContent: "center", alignItems: "center"}}>
            <img src="images/116377706_309252197105621_1912855432024662643_n.png" height='300px' alt='' />
          </div>
          <div style={{width: "100%", height: "100", display:this.state.loading===true?"flex":"none", justifyContent: "center", alignItems: "center" }}>
            <Loader type="Grid" color="#d25a46" height="100" width="100" />
          </div>
        </div>
      </div>
      </div>
    );
  }
}

// export default Editorpage;

export default EditorPage;