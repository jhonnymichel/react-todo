import React from "react";
import Header from "./Header";
import AddBar from "./AddBar";
import ToDoList from "./ToDoList";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Xexeu's todo",
      description: "Add a todo and try to accomplish 'em!'",
      modalBackground: false
    };
  }

  receiveNewTodo(todo) {
    this.refs.todoList.receiveNewTodo(todo);
  }

  onModalStateChanged(e) {
    this.closeModalCallback = e.detail.closeCallback;
    this.setState({
      modalBackground: !this.state.modalBackground
    });
  }

  renderModalBackground() {
    if (this.state.modalBackground) {
      return (
        <div
          onClick = {this.closeModalCallback}
          className="modal-background">
        </div>
      );
    }
  }

  componentDidMount() {
    this.refs.mainNode.addEventListener("modalEvent",
                                        this.onModalStateChanged.bind(this));
  }

  render() {
    let { title, description } = this.state;
    const callBack = this.receiveNewTodo.bind(this);
    let modalBackground = this.renderModalBackground();

    return (
      <div ref="mainNode">
        <div className="header-wrapper">
          <Header title={title} description={description}/>
          <AddBar callBack={callBack}/>
        </div>
        <ToDoList ref="todoList" />
        <ReactCSSTransitionGroup
        transitionName="modal-bg__animation"
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}>
          {modalBackground}
        </ReactCSSTransitionGroup>
      </div>
    );
  }

}
