import React from "react";

export default class AddBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inputValue: ""};
  }
  changeInputValue(e) {
    this.setState({inputValue: e.target.value});
  }
  addBtnClickHandler() {
    if (this.state.inputValue != "") {
      this.props.callBack();
    } else {
      alert ("conteúdo não pode estar vazio");
    }
  }
  render() {
    return (
      <div>
        <input onChange={this.changeInputValue.bind(this)} value={this.state.inputValue}></input>
        <button onClick={this.addBtnClickHandler.bind(this)} type="button">Add ToDo</button>
      </div>
    );
  }
}
