import React from "react";

export default class Header extends React.Component {
  constructor (props) {
    super(props);
  }
  render() {
    return (
      <header>
        <h1>{this.props.title}</h1>
        <p>{this.props.description}</p>
      </header>
    );
  }
}
