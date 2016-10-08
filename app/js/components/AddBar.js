import React from "react";

export default class AddBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
  }

  onInputChangeHandler(e) {
    let inputValue = e.target.value;
    this.setState({
      inputValue
    });
  }

  onAddTodoClickHandler(e) {
    e.preventDefault();
    let todo = this.state.inputValue;

    if (todo === "") {
      alert("conteúdo não pode estar vazio");
    } else {
      this.props.callBack(todo);
      this.setState({
        inputValue: ""
      });
    }
  }

  render() {
    const onChangeHandler = this.onInputChangeHandler.bind(this);
    const onClickHandler = this.onAddTodoClickHandler.bind(this);
    const ph = "What todo?";
    let value = this.state.inputValue;

    return (
      <form className="add-bar" onSubmit={onClickHandler}>
        <input className="add-bar__text-field"
          placeholder={ ph } onChange={ onChangeHandler } value={ value }>
        </input>
        <button className="add-bar__send-button">
          Add ToDo
        </button>
      </form>
    );
  }
}
