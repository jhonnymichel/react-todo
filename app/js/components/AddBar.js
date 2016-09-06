import React from "react";

export default class AddBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inputValue: ""};
  }
  onInputChangeHandler(e) {
    const inputValue = e.target.value;
    this.setState({inputValue});
  }
  onAddTodoClickHandler() {
    const todo = this.state.inputValue;
    if (todo === "") {
      alert ("conteúdo não pode estar vazio");
    } else {
      this.props.callBack(todo);
      this.setState({inputValue: ""});
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
