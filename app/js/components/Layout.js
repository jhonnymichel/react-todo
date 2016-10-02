import React from "react";
import Header from "./Header";
import AddBar from "./AddBar";
import ToDoList from "./ToDoList";

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

  onModalStateChanged() {
    this.setState({
      modalBackground: !this.state.modalBackground
    });
  }

  renderModalBackground() {
    if (this.state.modalBackground) {
      return (
        <div className="modal-background">
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
        {modalBackground}
      </div>
    );
  }

}
