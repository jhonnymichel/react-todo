import React from "react";
import Header from "./Header";
import AddBar from "./AddBar";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Xexeu's todo",
      description: "Add a todo and try to accomplish 'em!'"
    }
  }
  onAddToDoClickHandler() {
    alert("deu certo");
  }
  render() {
    let title = this.state.title;
    let description = this.state.description;
    return (
      <div>
        <Header title={title} description={description}/>
        <AddBar callBack={this.onAddToDoClickHandler.bind(this)}/>
      </div>
    );
  }
}
