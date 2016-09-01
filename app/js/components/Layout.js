import React from "react";
import Header from "./Header";
import AddBar from "./AddBar";
import ToDo from "./ToDo";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Xexeu's todo",
      description: "Add a todo and try to accomplish 'em!'",
      todoList: []
    }
  }
  receiveNewTodo(todo) {
    let todoList = this.state.todoList.slice();
    todoList.push(todo);
    this.setState({todoList});
  }
  deleteToDo(key) {
    let todoList = this.state.todoList.slice();
    todoList.splice(key, 1);
    this.setState({todoList});
  }
  render() {
    const title = this.state.title;
    const description = this.state.description;
    let TodoList = this.state.todoList.map((todo, i) =>
      <ToDo key={i}
      objId={i}
      value={todo}
      deleteToDo={this.deleteToDo.bind(this)}/>
    ).reverse();
    return (
      <div>
        <Header title={title} description={description}/>
        <AddBar callBack={this.receiveNewTodo.bind(this)}/>
        {TodoList}
      </div>
    );
  }
}
