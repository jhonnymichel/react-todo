import React from "react";
import ToDo from "./todo/ToDo";
import XexeuFlip from "./todo/animation/xexeu-flip-transitions";

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

  getSortFormula(orderBy) {
    const properties = {
      date: 'dateOfCreation',
      done: 'isComplete',
      undone: 'isComplete'
    };
    return (todoA, todoB) => {
      const criteria = properties[orderBy];
      let todoACriteria = todoA[criteria];
      let todobCriteria = todoB[criteria];
      if (orderBy === 'undone') {
        todoACriteria = !todoACriteria;
        todobCriteria = !todobCriteria;
      }
      if (todoACriteria > todobCriteria) {
        return 1;
      } else if (todoACriteria < todobCriteria) {
        return -1;
      }
      return 0;
    };
  }

  renderTodos(list, orderBy = 'date') {
    list = list.sort(this.getSortFormula(orderBy));
    return this.mapToDom(list);
  }

  render() {
    const TodoList = this.renderTodos(
      [...this.state.todoList],
      this.props.orderBy
    ).reverse();
    return (
      <div className="todo-list">
        {this.renderEmptyMessage(TodoList.length)}
        <XexeuFlip
          style={ {width: "100%"} }
          propertyToAnimate="transform"
          enterInitialStyle={ {transform: "scaleY(0)"} }
          reorderTransitionDuration={300}
          reorderIncreasingDuration={30}
          transformOrigin="center top"
        >
          {TodoList}
        </XexeuFlip>
      </div>
    );
  }
}
