import React from "react";
import TextAreaAutoSize from "react-autosize-textarea";

export default class TodoText extends React.Component {

  onChange(e) {
    const { updateTodoValue, todoId } = this.props;
    updateTodoValue(todoId, e.target.value);
  }

  componentDidUpdate() {
    if (this.props.isEditMode) {
      const textArea = this.refs.editTodoInput.textarea;
      textArea.focus();
    }
  }

  render() {
    const onChange = this.onChange.bind(this);
    if (this.props.isEditMode) {
      return (
        <TextAreaAutoSize
          ref="editTodoInput"
          className="todo__textarea"
          onClick={
            e => e.stopPropagation()
          }
          onKeyPress={this.props.handleLineBreak}
          ref="editTodoInput"
          defaultValue={this.props.value}
          onChange={onChange}/>
      );
    }
    let multiLineText = this.props.value.split("\n");
    multiLineText = multiLineText.map((item, i) =>
      <span key={i}>
        {item}
        <br/>
      </span>
    );

    return (
      <h4 className = "todo__text">
        {multiLineText}
      </h4>
    );
  }
}
