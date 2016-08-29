import React from "react";

export default class AddBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inputValue: ""};
  }
  onInputChangeHandler(e) {
    this.setState({inputValue: e.target.value});
  }
  onAddTodoClickHandler() {
    const todo = this.state.inputValue;
    if (todo != "") {
      this.props.callBack(todo);
      this.setState({inputValue: ""});
    } else {
      alert ("conteúdo não pode estar vazio");
    }
  }
  render() {
    return (
      <div>
        <input onChange={this.onInputChangeHandler.bind(this)} value={this.state.inputValue}></input>
        <button onClick={this.onAddTodoClickHandler.bind(this)} type="button">Add ToDo</button>
      </div>
    );
  }
}
