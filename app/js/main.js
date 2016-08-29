import React from "react";
import ReactDOM from "react-dom";
import Layout from "./components/Layout";

document.addEventListener('DOMContentLoaded', onLoadHandler);

function onLoadHandler() {
  ReactDOM.render(
    <Layout/>,
    document.getElementById('app')
  );
}
