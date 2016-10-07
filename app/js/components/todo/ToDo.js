import React from "react";
import TodoAnimator from "./animation/TodoAnimator.js";
import TodoText from "./TodoText.js";
import TodoActionButtons from "./TodoActionButtons.js";
import TodoDetails from "./TodoDetails.js";

export default class ToDo extends React.Component {

  constructor(props) {
    super(props);
    this.defaultCss = "todo";
    this.expandedCss = "todo todo--expanded-state";
    this.state = {
      css: this.defaultCss,
      details: [],
      expandCallback: this.expand.bind(this)
    };
  }

  expand() {
    let state = { ...this.state };

    state.styles = this.expandAnimator.expand();
    state.details = [
      { title: 'created: ', value: '20/09/2016' }
    ];
    state.expandCallback = this.contract.bind(this);
    state.css = this.expandedCss;

    this.setState(state);
  }

  contract() {
    this.expandAnimator.contract();
    let state = { ...this.state };

    state.details = [];
    state.expandCallback = this.expand.bind(this);
    state.css = this.defaultCss;

    this.setState(state);
  }

  deleteToDo(e) {
    e.stopPropagation();

    if (this.expandAnimator.isExpanded) {
      this.expandAnimator.contract();
      this.contract();
    }

    this.props.deleteToDo(this.props.todoId);
  }

  componentDidMount() {
    this.DOMElement = this.refs.thisDOMElement;

    this.expandAnimator = new TodoAnimator(
      this.DOMElement
    );
  }

  getTextMode() {
    return (this.expandAnimator ?
            this.expandAnimator.isExpanded :
            false);
  }

  render() {
    let state = { ...this.state };
    let { css, styles, details } = state;
    let deleteTodo = this.deleteToDo.bind(this);
    let isEditMode = this.getTextMode();
    const clickCallback = state.expandCallback;

    return (
      <div
        className = {css}
        style={styles}
        ref="thisDOMElement"
        onClick={clickCallback}>
        <TodoText
          isEditMode={isEditMode}
          todoId={this.props.todoId}
          updateTodoValue={this.props.updateTodoValue}
          value={this.props.value}/>
        <TodoActionButtons
          deleteTodo={deleteTodo}/>
        <TodoDetails
          details={details}/>
      </div>
    );
  }
}
