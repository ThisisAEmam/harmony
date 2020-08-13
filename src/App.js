import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import EditorPage from "./pages/Editorpage/EditorPage";
import Profilepage from "./pages/ProfilePage/Profilepage";
import NotAvailable from "./pages/NotAvailablepage/NotAvailablepage";
import { setScreen } from "./features/screenSlice";
import { useDispatch } from "react-redux";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";

function App() {
  const screenDispatch = useDispatch(setScreen);

  useEffect(() => {
    if (window.outerWidth < 1000) {
      screenDispatch(setScreen("Mobile"));
    } else if (window.outerWidth < 1367 && window.outerWidth > 1000) {
      screenDispatch(setScreen("HD"));
    } else if (window.outerWidth > 1367) {
      screenDispatch(setScreen("Full HD"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/editor" exact component={EditorPage} />
          <Route path="/profile" exact component={Profilepage} />
          <Route path="/forget" exact component={ForgetPassword} />
          <Route path="/reset/:id/:token" exact component={ResetPassword} />
          <Route path="/notAvailable" exact component={NotAvailable} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
