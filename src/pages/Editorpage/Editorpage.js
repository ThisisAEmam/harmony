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
};

export default Editorpage;
