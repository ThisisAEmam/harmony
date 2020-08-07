<<<<<<< HEAD
import React, { useEffect, Component} from "react";
// import classes from "./Editorpage.module.css";
// import { useDispatch } from "react-redux";
// import { setCurrentPage } from "../../features/currentPageSlice";
import Navbar from "../../containers/Navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

import "tui-image-editor/dist/tui-image-editor.css";
import "./EditorPage.css";
import ImageEditor from "@toast-ui/react-image-editor";
import Button from "react-bootstrap/Button";
import { withRouter } from 'react-router';
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
=======
import React, { useEffect, useState } from "react";
import classes from "./Editorpage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../features/currentPageSlice";
import EditorModal from "../../components/EditorModal/EditorModal";
import Editor from "../../containers/Editor/Editor";

const Editorpage = (props) => {
  const { isLoggedIn } = useSelector((state) => state);
  const dispatch = useDispatch(setCurrentPage);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(setCurrentPage("Editor"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      // history.push("/");
      setShowModal(true);
    } else {
      setShowModal(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return <div className={classes.Editorpage}>{showModal ? <EditorModal /> : <Editor />}</div>;
>>>>>>> 76acbd0774a7b7f5badd971c6e74aa6d63fae7a0
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
    setImageSrc:"",
    loading:false
  }
  
  componentDidMount = () => {
    console.log();
  }

  imageEditor = React.createRef();
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
    this.props.updateImage(data);
    this.props.history.push('magic');
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

  render(){
    return (
      <div>
        <Navbar />
        <div className="page">
        
        {this.state.loading===false?
          <div className="center">
            <Button className='button' onClick={this.saveImageToDisk}>Save Image to Disk</Button>
            <Button style={{marginLeft:'50px'}} className='button' onClick={this.segmentPost}>Segment</Button>
            <Button style={{marginLeft:'50px'}} className='button' onClick={this.colorizePost}>Colorization</Button>
            <Button style={{marginLeft:'50px'}} className='button' onClick={this.magicLoad}>Harmonize</Button>
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

export default withRouter(EditorPage);