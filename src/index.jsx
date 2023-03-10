import * as $ from "jquery";
import Post from "@models/Post";
import "./babel";
import json from "./assets/json";
import WebpackLogo from "./assets/webpack-logo";
import xml from "./assets/data.xml";
import csv from "./assets/data.csv";
import "./styles/styles.css";
import "./styles/less.less";
import "./styles/scss.scss";
import React from "react";
import { createRoot } from "react-dom/client";

const post = new Post("webpack post title", WebpackLogo);

$("pre").addClass("code").html(post.toString());

const App = () => {
  return (
    <div className="container">
      <h1>Webpack course</h1>
      <hr />
      <div className="logo"></div>
      <hr />
      <pre></pre>

      <div className="box">
        <h2>Less</h2>
      </div>

      <div className="card">
        <h2>Card</h2>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("app"));
root.render(<App />);

// console.log("CSV:", csv);
// console.log("JSON:", json);
// console.log("XML:", xml);
