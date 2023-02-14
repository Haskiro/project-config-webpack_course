import Post from "./Post";
import json from "./assets/json";
import WebpackLogo from "./assets/webpack-logo.png";
import xml from "./assets/data.xml";
import csv from "./assets/data.csv";
import "./styles/styles.css";

const post = new Post("webpack post title", WebpackLogo);

console.log(post.toString());
console.log("CSV:", csv);
// console.log("JSON:", json);
// console.log("XML:", xml);
