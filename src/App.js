import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Editorpage from "./pages/Editorpage/EditorPage";
import Profilepage from "./pages/Profilepage/Profilepage";
import Docspage from "./pages/Docspage/Docspage";
import { setScreen } from "./features/screenSlice";
import { useDispatch } from "react-redux";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";

function App() {
  const screenDispatch = useDispatch(setScreen);

  useEffect(() => {
    if (window.outerWidth < 1000) {
      screenDispatch(setScreen("Mobile"));
    } else if (window.outerWidth < 1367) {
      screenDispatch(setScreen("HD"));
    } else {
      screenDispatch(setScreen("Full HD"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/editor" exact component={Editorpage} />
          <Route path="/profile" exact component={Profilepage} />
          <Route path="/docs" exact component={Docspage} />
          <Route path="/forget" exact component={ForgetPassword} />
          <Route path="/reset/:id/:token" exact component={ResetPassword} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
