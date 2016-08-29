import React from "react";

export default class Header extends React.Component {
  constructor () {
    super();
    this.state = {
      title: "league of legends"
    };
    setTimeout(() => {
      this.setState({
        title: "Dotka"
      });
    }, 1000);
  }

  render() {
    return (
      <header>
        <h1>Welcome to {this.state.title}</h1>
        <p>{this.props.title}</p>
      </header>
    );
  }
}
