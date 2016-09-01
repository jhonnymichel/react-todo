import React from "react";

export default class ToDo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      objStyle: {
        transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
      }
    };
  }
  fadeOut(onEndCallBack) {
    let objStyle = {...this.state.objStyle};
    objStyle.opacity = "0";
    objStyle.transform = "translateX(50%)";
    this.setState({
      objStyle
    });
    setTimeout(this.setAsDone.bind(this), 400);
  }
  setAsDone() {
    this.props.deleteToDo(this.props.objId);
  }
  render() {
    const objStyle = this.state.objStyle;
    const clickCallback = this.fadeOut.bind(this);
    const todoMessage = this.props.value;
    return (
      <div style={objStyle} onClick={clickCallback}>
        <p>{todoMessage}</p>
      </div>
    );
  }
}
