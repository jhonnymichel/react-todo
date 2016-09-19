import React from "react";
import ToDo from "./ToDo";

export default class ToDoList extends React.Component {

  constructor() {
    super();
    this.idIncrementer = 0;
    this.state = {
      todoList: []
    };
  }

  receiveNewTodo(todo) {
    let todoList = [...this.state.todoList];
    todoList.push({
      text: todo,
      id: this.idIncrementer++
    });
    this.setState({ todoList });
  }

  deleteToDo(key) {
    let todoList = this.state.todoList.filter(todo => todo.id !== key);
    this.setState({ todoList });
  }

  render() {
    let TodoList = this.state.todoList.map((todo, i) =>
      <ToDo key={todo.id}
      objId={todo.id}
      value={todo.text}
      deleteToDo={this.deleteToDo.bind(this)}/>
    ).reverse();
    return (
      <div className="todo-list">
        {TodoList}
      </div>
    );
  }

}
