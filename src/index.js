import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import axios from "axios";

axios.defaults.baseURL = "https://cors-anywhere.herokuapp.com/http://harmony.eu-central-1.elasticbeanstalk.com";
// axios.defaults.headers.common["Authorization"] = "Token 86a9c8b8c5b25fd6a31cd4a2f1d210e7f27b3771";
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
