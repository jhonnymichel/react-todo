import React from "react";
import TodoAnimator from "./animation/TodoAnimator.js";
import TodoText from "./TodoText.js";
import TodoActionButtons from "./TodoActionButtons.js";

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
    let { details, expandCallback, css } = this.state;
    let styles = this.expandAnimator.expand();

    details = [
      { title: 'created: ', value: '20/09/2016' }
    ];

    expandCallback = this.contract.bind(this);
    css = this.expandedCss;

    this.setState({
      details,
      expandCallback,
      css,
      styles
    });
  }

  contract() {
    this.expandAnimator.contract();
    let state = { ...this.state };
    let { details, expandCallback, css } = state;
    details = [];
    expandCallback = this.expand.bind(this);
    css = this.defaultCss;

    this.setState({
      details, expandCallback, css, styles: {}
    });
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
      this.DOMElement,
      this.contract.bind(this));
  }

  renderToDoDetails() {
    return this.state.details.map((info, i) =>
      <div className = "todo__detail" key={i}>
          <h5 className = "todo__detail__title">{info.title}</h5>
          <p className = "todo__detail__text">{info.value}</p>
      </div>
    );
  }

  getTextMode() {
    return (this.expandAnimator ?
            this.expandAnimator.isExpanded :
            false);
  }

  render() {
    let state = { ...this.state };
    let { css, styles } = state;
    let { value, todoId } = this.props;
    let infos = this.renderToDoDetails();
    let deteleTodo = this.deleteToDo.bind(this);
    let isEditMode = this.getTextMode();
    const onUpdateTodoValue = this.props.updateTodoValue;
    const clickCallback = this.state.expandCallback;

    return (
      <div
        className = {css}
        style={styles}
        ref="thisDOMElement"
        onClick={clickCallback}>
        <TodoText
          isEditMode={isEditMode}
          todoId={todoId}
          updateTodoValue={onUpdateTodoValue}
          value={value}/>
      <TodoActionButtons
        deleteTodo={deteleTodo}/>
        {infos}
      </div>
    );
  }

}
