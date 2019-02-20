import "../css/popup.css";
import Setting from "./popup/setting.jsx";
import React from "react";
import { render } from "react-dom";
import "antd/dist/antd.css";

render(
  <Setting/>,
  window.document.getElementById("app-container")
);
