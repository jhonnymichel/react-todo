import React from "react";

export default class Header extends React.Component {

  render() {
    return (
      <header className="app-header">
        <h1>{this.props.title}</h1>
        <p>{this.props.description}</p>
      </header>
    );
  }

}
