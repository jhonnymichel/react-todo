import React from "react";
import Header from "./Header";
import AddBar from "./AddBar";
import ToDoList from "./ToDoList";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Xexeu's todo",
      description: "Add a todo and try to accomplish 'em!'"
    };
  }
  receiveNewTodo(todo) {
    this.refs.todoList.receiveNewTodo(todo);
  }
  render() {
    let { title, description } = this.state;
    const callBack = this.receiveNewTodo.bind(this);

    return (
      <div>
        <Header title={title} description={description}/>
        <AddBar callBack={callBack}/>
        <ToDoList ref="todoList" />
      </div>
    );
  }
}
