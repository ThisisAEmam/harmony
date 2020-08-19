import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
// import "bootstrap/dist/css/bootstrap.min.css";
import "tui-image-editor/dist/tui-image-editor.css";
import "./Editor.css";
import classes from "./Editor.module.css";
import ImageEditor from "@toast-ui/react-image-editor";
import Axios from "axios";
import Loader from "react-loader-spinner";
import { useSpring, animated, config } from "react-spring";
// import { Button, Modal } from "react-bootstrap";

const icona = require("tui-image-editor/dist/svg/icon-a.svg");
const iconb = require("tui-image-editor/dist/svg/icon-b.svg");
const iconc = require("tui-image-editor/dist/svg/icon-c.svg");
const icond = require("tui-image-editor/dist/svg/icon-d.svg");
const download = require("downloadjs");

const myTheme = {
  "common.border": "0px",
  "common.bisize.height": "0px",
  "common.backgroundColor": "#2b2d30",
  "downloadButton.backgroundColor": "white",
  "downloadButton.borderColor": "white",
  "downloadButton.color": "black",
  "menu.normalIcon.path": icond,
  "menu.activeIcon.path": iconb,
  "menu.disabledIcon.path": icona,
  "menu.hoverIcon.path": iconc,
  "menu.normalIcon.color": "#d25a46",
  "menu.activeIcon.color": "#eb5f4b",
  "menu.disabledIcon.color": "#dbbdb9",
  "menu.hoverIcon.color": "#e6887b",
  "submenu.normalIcon.color": "#8a8a8a",
  "submenu.activeIcon.color": "#e9e9e9",
  "menu.iconSize.width": "20px",
  "menu.iconSize.height": "20px",
  "loadButton.backgroundColor": "#eb5f4b",
  "loadButton.color": "#fff",
  "loadButton.fontSize": "20px",
};

const Editor = (props) => {
  let imageSrc = "";
  const [secImageSrc, setSecImageSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [secondaryImage, setSecondaryImage] = useState(false);
  const [btnActivate, setBtnActivate] = useState(false);
  const [secondaryObj, setSecondaryObj] = useState(null);
  const [vSign, setVSign] = useState(1);
  const [hSign, setHSign] = useState(1);
  const [secLeft, setSecLeft] = useState(0);
  const [secTop, setSecTop] = useState(0);
  const [secWidth, setSecWidth] = useState(0);
  const [secHeight, setSecHeight] = useState(0);

  useEffect(() => {
    const fileInput = document.getElementsByClassName("tui-image-editor-load-btn")[1];
    fileInput.addEventListener("change", () => {
      setBtnActivate(true);
    });
  }, []);

  const fileSrc = useRef();
  const imageEditor = useRef();

  const modalContainerRef = useRef();

  const modalSpring = useSpring({
    transform: showModal ? "translateY(0)" : "translateY(-3rem)",
    opacity: showModal ? 1 : 0,
    config: config.default,
  });

  const preHarmonization = () => {
    const imageEditorInst = imageEditor.current.imageEditorInst;
    const data = imageEditorInst.toDataURL();

    let width = imageEditorInst._graphics.canvasImage.width;
    let height = imageEditorInst._graphics.canvasImage.height;
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    let startX = secLeft - secWidth / 2;
    let startY = secTop - secHeight / 2;
    let img = new Image();
    console.log(img, startX, startY, secWidth, secHeight);
    img.onload = () => {
      ctx.fillStyle = "black";

      ctx.drawImage(img, startX, startY, secWidth, secHeight);
      ctx.globalCompositeOperation = "source-in";
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "destination-atop";
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      let data1 = canvas.toDataURL();

      let canvas2 = document.createElement("canvas");
      let ctx2 = canvas2.getContext("2d");
      canvas2.width = width;
      canvas2.height = height;
      ctx2.drawImage(imageEditorInst._graphics.canvasImage._element, 0, 0, width, height);
      let data2 = canvas2.toDataURL();
      harmonizePost(data, data1, data2);
      const mimeType = data.split(";")[0];
      const extension = data.split(";")[0].split("/")[1];
      download(data, `image.${extension}`, mimeType);
      const mimeType1 = data1.split(";")[0];
      const extension1 = data1.split(";")[0].split("/")[1];
      download(data1, `image.${extension1}`, mimeType1);
      const mimeType2 = data2.split(";")[0];
      const extension2 = data2.split(";")[0].split("/")[1];
      download(data2, `image.${extension2}`, mimeType2);
    };
    img.src = secImageSrc;
  };

  const harmonizePost = (bgImg, maskImg, composedImg) => {
    const imageEditorInst = imageEditor.current.imageEditorInst;
    setLoading(true);
    Axios.post("https://colorer.azurewebsites.net/color", { img: bgImg })
      .then((response) => {
        imageEditorInst.loadImageFromFile(dataURLtoFile(response.data.res, "lena")).then(() => {
          setLoading(false);
        });
      })
      .catch((err) => console.log(err));
  };

  const saveImageToDisk = () => {
    const imageEditorInst = imageEditor.current.imageEditorInst;
    const data = imageEditorInst.toDataURL();
    if (data) {
      const mimeType = data.split(";")[0];
      const extension = data.split(";")[0].split("/")[1];
      download(data, `image.${extension}`, mimeType);
    }
  };

  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const segmentPost = () => {
    const imageEditorInst = imageEditor.current.imageEditorInst;
    const data = imageEditorInst.toDataURL();
    setLoading(true);
    Axios.post("https://colorer.azurewebsites.net/segment", { img: data }).then((response) => {
      imageEditorInst.loadImageFromFile(dataURLtoFile(response.data.res, "lena")).then(() => {
        setLoading(false);
      });
    });
  };

  const colorizePost = () => {
    const imageEditorInst = imageEditor.current.imageEditorInst;
    const data = imageEditorInst.toDataURL();
    setLoading(true);
    Axios.post("https://colorer.azurewebsites.net/color", { img: data })
      .then((response) => {
        imageEditorInst.loadImageFromFile(dataURLtoFile(response.data.res, "lena")).then(() => {
          setLoading(false);
        });
      })
      .catch((err) => console.log(err));
  };

  const launchModal = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const uploadSecondImage = () => {
    let file = fileSrc.current.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      setSecImageSrc(reader.result);
      const imageEditorInst = imageEditor.current.imageEditorInst;
      imageEditorInst.addImageObject(reader.result).then((object) => {
        setSecondaryImage(true);
        setSecondaryObj(object);
        setSecLeft(object.left);
        setSecTop(object.top);
        setSecWidth(object.width);
        setSecHeight(object.height);
      });
      imageEditorInst.on("mousedown", (event, originPointer) => {
        if (originPointer.x > secLeft) setHSign(1);
        else setHSign(-1);
        if (originPointer.y > secTop) setVSign(1);
        else setVSign(-1);
      });
      imageEditorInst.on("objectScaled", (props) => {
        setSecWidth(secWidth - (secLeft - props.left) * 2 * hSign);
        setSecHeight(secHeight - (secTop - props.top) * 2 * vSign);
        setSecLeft(props.left);
        setSecTop(props.top);
        // console.log(secWidth,secHeight);
      });
      imageEditorInst.on("objectMoved", (props) => {
        // console.log(secondaryObj);
        // TODO: make sure that the moving object is the right one the problem that state isnot lesining well
        // if(props.id == secondaryObj.id){
        setSecLeft(props.left);
        setSecTop(props.top);
        // }
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      secondaryImage.current.src = "";
    }
    handleClose();
  };

  const modalContainerHandler = (e) => {
    if (e.target === modalContainerRef.current) {
      setShowModal(false);
    }
  };

  return (
    <div className={classes.EditorPage}>
      <Navbar dark />
      <div className={classes.page}>
        <div ref={modalContainerRef} className={[classes.modalContainer, showModal ? classes.showModal : null].join(" ")} onClick={modalContainerHandler}>
          <animated.div style={modalSpring} className={classes.modal}>
            <p className={classes.modalTitle}>Choose your secodary Image</p>
            <input className={classes.modalBody} type="file" ref={fileSrc} />
            <div className={classes.modalBottom}>
              <div onClick={handleClose} className={classes.modalBtnClose}>
                Close
              </div>
              <div className={classes.modalBtnSubmitContainer}>
                <div onClick={uploadSecondImage} className={classes.modalBtnSubmit}>
                  Open Image
                </div>
              </div>
            </div>
          </animated.div>
        </div>
        {!loading ? (
          <div className={classes.buttons}>
            <div className={[classes.mainButton, btnActivate ? classes.active : null].join(" ")} onClick={btnActivate ? saveImageToDisk : null}>
              Save Image to Disk
            </div>
            <div className={[classes.mainButton, btnActivate ? classes.active : null].join(" ")} onClick={btnActivate ? segmentPost : null}>
              Segment
            </div>
            <div className={[classes.mainButton, btnActivate ? classes.active : null].join(" ")} onClick={btnActivate ? colorizePost : null}>
              Colorization
            </div>
            <div type="file" className={[classes.mainButton, btnActivate ? classes.active : null].join(" ")} onClick={btnActivate ? launchModal : null}>
              Upload Secondary Image
            </div>
            <div className={[classes.mainButton, secondaryImage ? classes.active : null].join(" ")} onClick={secondaryImage ? preHarmonization : null}>
              Harmonize
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div className={classes.tuiEditor} style={{ display: loading === false ? "flex" : "none", justifyContent: "center", alignItems: "center" }}>
          <ImageEditor
            includeUI={{
              loadImage: {
                path: imageSrc,
                name: "image",
              },
              theme: myTheme,
              menu: ["crop", "flip", "rotate", "draw", "shape", "text", "filter"],
              initMenu: "",
              uiSize: {
                height: `calc(100vh - 10rem)`,
                width: `calc(100vw)`,
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
            ref={imageEditor}
          />
        </div>
        <div>
          <div style={{ display: loading === true ? "flex" : "none", justifyContent: "center", alignItems: "center" }}>
            <img src="images/116377706_309252197105621_1912855432024662643_n.png" height="300px" alt="" />
          </div>
          <div className={[classes.loaderContainer, loading ? classes.show : null].join(" ")}>
            <Loader type="Grid" color="#d25a46" height="100" width="100" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
