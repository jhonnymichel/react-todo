import React from "react";

export default class Header extends React.Component {

  render() {
    return (
      <header className="header">
        <h1 className="header__title">
          <i className="fa fa-sticky-note-o"></i>{this.props.title}</h1>
        <p className="header__description">{this.props.description}</p>
      </header>
    );
  }

}
