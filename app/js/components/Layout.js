import React from "react";
import Header from "./Header";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Xexeu's todo",
      description: "Add a todo and try to accomplish 'em!'"
    }
  }
  render() {
    let title = this.state.title;
    let description = this.state.description;
    return (
     <Header title={title} description={description}/>
    );
  }
}
