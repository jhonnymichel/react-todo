import React from "react";
import Header from "./Header";
import AddBar from "./AddBar";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Xexeu's todo",
      description: "Add a todo and try to accomplish 'em!'",
      todoList: []
    }
    this.todoList = [];
  }
  onAddToDoClickHandler(todo) {
    this.todoList.push(todo);
    this.setState({todoList: this.todoList});
  }
  render() {
    const title = this.state.title;
    const description = this.state.description;
    let TodoList = this.state.todoList.map((todo, i) => <p key={i}>{todo}</p>).reverse();
    console.log(TodoList);
    return (
      <div>
        <Header title={title} description={description}/>
        <AddBar callBack={this.onAddToDoClickHandler.bind(this)}/>
        {TodoList}
      </div>
    );
  }
}
