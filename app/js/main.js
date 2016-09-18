import React from "react"; // eslint-disable-line no-unused-vars
import ReactDOM from "react-dom";
import Layout from "./components/Layout";

document.addEventListener('DOMContentLoaded', onLoadHandler);

function onLoadHandler() { //eslint-disable-line
  ReactDOM.render(
    <Layout/>,
    document.getElementById('app')
  );
}
