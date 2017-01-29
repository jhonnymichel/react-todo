import React from "react";
import TodoAnimator from "./animation/TodoAnimator.js";
import TodoText from "./TodoText.js";
import TodoActionButtons from "./TodoActionButtons.js";
import TodoDetails from "./TodoDetails.js";
import DoneToggle from "./DoneToggle.js";
import isMobile from "../../utils/checkMobile";

export default class ToDo extends React.Component {

  constructor(props) {
    super(props);
    this.defaultCss = "todo";
    this.expandedCss = "todo todo--expanded-state";
    this.creationTimeStamp = this.getTimeStamp(this.props.dateOfCreation);
    this.state = {
      isExpanded: false,
      details: [],
      expandCallback: this.expand.bind(this)
    };
  }

  getLineBreakMessage() {
    const mobile = 'Press out of the todo card to dismiss';
    const desktop = 'Press ENTER to finish, SHIFT + ENTER to break line';

    if (isMobile()) {
      return mobile;
    }
    return desktop;
  }

  expand() {
    let state = { ...this.state };

    state.styles = this.expandAnimator.expand();
    state.details = [
      {
        title: "Created: ",
        value: this.creationTimeStamp
      },
      {
        value: this.getLineBreakMessage()
      }
    ];
    state.expandCallback = this.contract.bind(this);
    state.isExpanded = true;

    this.setState(state);
  }

  contract() {
    this.expandAnimator.contract();
    let state = { ...this.state };
    state.details = [];
    state.expandCallback = this.expand.bind(this);
    state.isExpanded = false;
    state.styles = {};

    this.setState(state);
  }

  getTimeStamp(time) {
    const date = new Date(time);
    return date.toLocaleString();
  }

  updateStatus(e) {
    e.stopPropagation();
    this.props.updateTodoStatus(this.props.todoId);
  }

  deleteToDo(e) {
    e.stopPropagation();

    if (this.state.isExpanded) {
      this.expandAnimator.contract();
      this.contract();
    }

    this.props.deleteToDo(this.props.todoId);
  }

  handleLineBreak(e) {
    if (isMobile()) {
      return;
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      this.contract();
    }
  }

  componentDidMount() {
    this.DOMElement = this.refs.thisDOMElement;

    this.expandAnimator = new TodoAnimator(
      this.DOMElement,
      this.contract.bind(this)
    );
  }

  render() {
    const state = { ...this.state };
    const deleteTodo = this.deleteToDo.bind(this);
    const updateStatus = this.updateStatus.bind(this);
    const handleLineBreak = this.handleLineBreak.bind(this);
    let css = state.isExpanded ?
      this.expandedCss :
      this.defaultCss;

    return (
      <div
        className = {css}
        style={state.styles}
        ref="thisDOMElement"
        onClick={state.expandCallback}>
        <DoneToggle
          status={this.props.isComplete}
          clickHandler={updateStatus}/>
        <TodoText
          isComplete={this.props.isComplete}
          isEditMode={state.isExpanded}
          todoId={this.props.todoId}
          updateTodoValue={this.props.updateTodoValue}
          value={this.props.value}
          handleLineBreak={handleLineBreak}
        />
        <TodoActionButtons
          deleteTodo={deleteTodo}/>
        <TodoDetails
          details={state.details}/>
      </div>
    );
  }
}
