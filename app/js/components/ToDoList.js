import React from "react";
import ToDo from "./todo/ToDo";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

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
      id: this.idIncrementer++,
      isComplete: false,
      dateOfCreation: Date.now()
    });
    this.setState({ todoList });
  }

  updateTodoStatus(key) {
    let todoList = [...this.state.todoList];
    let todoToUpdate = todoList.find(
      todo => todo.id === key
    );
    todoToUpdate.isComplete = !todoToUpdate.isComplete;
    this.setState({
      todoList
    });
  }

  updateTodoValue(key, value) {
    let todoList = [...this.state.todoList];
    let todoToUpdate = todoList.find(
      todo => todo.id === key
    );
    todoToUpdate.text = value;
    this.setState({
      todoList
    });
  }

  deleteToDo(key) {
    let todoList = this.state.todoList.filter(
      todo => todo.id !== key
    );
    this.setState({ todoList });
  }

  renderEmptyMessage(todoAmount) {
    if (todoAmount === 0) {
      return (
        <h4 className="todo-list__empty-message">
          Are you sure you don't have anything to do?
        </h4>
      );
    }
  }

  mapToDom(list) {
    return list.map((todo, i) =>
      <ToDo
        key={todo.id}
        todoId={todo.id}
        value={todo.text}
        isComplete={todo.isComplete}
        dateOfCreation={todo.dateOfCreation}
        updateTodoStatus={this.updateTodoStatus.bind(this)}
        updateTodoValue={this.updateTodoValue.bind(this)}
        deleteToDo={this.deleteToDo.bind(this)}
      />
    );
  }

  renderTodos(list, conditions) {
    if (!conditions) {
      return this.mapToDom(list);
    }
    list = list.filter(listItem => {
      const conditionKeys = Object.keys(conditions);
      if (conditionKeys.length <= 1) {
        return conditions[conditionKeys[0]] === listItem[conditionKeys[0]];
      }
      return conditionKeys.reduce((result, condition) => {
        if (result === false) {
          return false;
        }
        return listItem[condition] === conditions[condition];
      });
    });

    return this.mapToDom(list);
  }

  render() {
    const TodoList = this.renderTodos(
      [...this.state.todoList]
    ).reverse();
    return (
      <div className="todo-list">
        {this.renderEmptyMessage(TodoList.length)}
        <ReactCSSTransitionGroup
          style={{
            width: '100%'
          }}
          transitionName="todo__animation"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}>
          {TodoList}
        </ReactCSSTransitionGroup>
      </div>
    );
  }

}
