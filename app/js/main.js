import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header"

console.log("oi");

class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "Naruto"
    }
  }
  render() {
    setTimeout(()=> {
      this.setState({
        text: "everything is changing"
      });
    }, 1500)
    return (
     <Header title={this.state.text}/>
    );
  }
}

document.addEventListener('DOMContentLoaded', onLoadHandler);

function onLoadHandler() {
  ReactDOM.render(<Layout/>, document.getElementById('app'))
}
