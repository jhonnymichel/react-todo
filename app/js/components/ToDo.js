import React from "react";

export default class ToDo extends React.Component {

  constructor(props) {
    super(props);
    this.transitionCss = "todo-container todo-container-initial-state";
    this.defaultCss = "todo-container";
    this.state = {
      css: this.transitionCss
    };
  }

  fadeOut() {
    let css = { ...this.state.css };
    css = this.transitionCss;
    this.setState({
      css
    });
    this.DOMElement.addEventListener('transitionend',
                                      this.setAsDone.bind(this));
  }

  setAsDone() {
    this.DOMElement.removeEventListener('transitionend',
                                        this.setAsDone.bind(this));
    this.props.deleteToDo(this.props.objId);
  }

  componentDidMount() {
    this.DOMElement = this.refs.thisDOMElement;
    setTimeout(() => {
      let css = { ...this.state.css };
      css = this.defaultCss;
      this.setState({
        css
      });
    }, 10);
  }

  render() {
    let { css } = this.state;
    let clickCallback = this.fadeOut.bind(this);
    let { value } = this.props;
    return (
      <div className = {css} ref="thisDOMElement"onClick={clickCallback}>
        <p className = "todo-text">{value}</p>
      </div>
    );
  }

}
