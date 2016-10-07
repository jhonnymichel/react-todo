import React from "react";
import TextAreaAutoSize from "react-autosize-textarea";

export default class TodoText extends React.Component {

  onChange(e) {
    const { updateTodoValue, todoId } = this.props;
    updateTodoValue(todoId, e.target.value);
  }

  componentDidUpdate() {
    if (this.props.isEditMode) {
      const textArea = this.refs.editTodoInput.getTextareaDOMNode();
      textArea.focus();
    }
  }

  render() {
    const { value, isEditMode } = this.props;
    const onChange = this.onChange.bind(this);
    if (isEditMode) {
      return (
        <TextAreaAutoSize
          ref="editTodoInput"
          className="todo__textarea"
          onClick={
            e => e.stopPropagation()
          }
          ref="editTodoInput"
          defaultValue={value}
          onChange={onChange}/>
      );
    }
    let multiLineText = value.split("\n");
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
