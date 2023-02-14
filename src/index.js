import * as $ from "jquery";
import Post from "@models/Post";
import json from "./assets/json";
import WebpackLogo from "./assets/webpack-logo";
import xml from "./assets/data.xml";
import csv from "./assets/data.csv";
import "./styles/styles.css";

const post = new Post("webpack post title", WebpackLogo);

$("pre").addClass("code").html(post.toString());

// console.log("CSV:", csv);
// console.log("JSON:", json);
// console.log("XML:", xml);
