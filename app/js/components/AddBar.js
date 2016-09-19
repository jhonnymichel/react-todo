import React from "react";

export default class AddBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: "" };
  }
  onInputChangeHandler(e) {
    const inputValue = e.target.value;
    this.setState({ inputValue });
  }
  onAddTodoClickHandler() {
    const todo = this.state.inputValue;
    if (todo === "") {
      alert("conteúdo não pode estar vazio");
    } else {
      this.props.callBack(todo);
      this.setState({ inputValue: "" });
    }
  }
  render() {
    const onChangeHandler = this.onInputChangeHandler.bind(this);
    const onClickHandler = this.onAddTodoClickHandler.bind(this);
    let value = this.state.inputValue;
    let ph = "What todo?";
    return (
      <div className="add-bar">
        <input className="add-bar__text-field"
          placeholder={ ph } onChange={ onChangeHandler } value={ value }>
        </input>
        <button className="add-bar__send-button"
          onClick={ onClickHandler } type="button">
          Add ToDo
        </button>
      </div>
    );
  }
}
