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
    this.hashIdCounter = 0;
  }
  receiveNewTodo(todo) {
    let todoList = this.state.todoList.slice();
    todoList.push({
      text: todo,
      id: "todo"+this.hashIdCounter++
    });
    this.setState({todoList});
  }
  deleteToDo(key) {
    let todoList = this.state.todoList.filter((todo) => todo.id != key);
    this.setState({todoList});
  }
  render() {
    const title = this.state.title;
    const description = this.state.description;
    let TodoList = this.state.todoList.map((todo, i) =>
      <ToDo key={todo.id}
      objId={todo.id}
      value={todo.text}
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
