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

const post = new Post("webpack post title", WebpackLogo);

$("pre").addClass("code").html(post.toString());

// console.log("CSV:", csv);
// console.log("JSON:", json);
// console.log("XML:", xml);
