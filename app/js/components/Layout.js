import React from "react";
import Header from "./Header";
import AddBar from "./AddBar";
import ToDoList from "./ToDoList";
import OrderByList from "./OrderByList";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.orderByOptions = ['date', 'undone', 'done'];
    this.state = {
      title: "Xexeu's todo",
      description: "Add a todo and try to accomplish 'em!'",
      modalBackground: false,
      orderBy: 'date'
    };
  }

  receiveNewTodo(todo) {
    this.refs.todoList.receiveNewTodo(todo);
  }

  orderBy(e) {
    console.log(e.target);
    const state = { ...this.state };
    state.orderBy = e.target.value;
    this.setState(state);
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
          ref="modalBackground"
          onClick = {this.closeModalCallback}
          className="modal-background">
        </div>
      );
    }
  }

  componentDidMount() {
    this.refs.mainNode.addEventListener(
      "modalEvent",
      this.onModalStateChanged.bind(this)
    );
  }

  render() {
    const state = { ...this.state };
    const callBack = this.receiveNewTodo.bind(this);
    const orderCallback = this.orderBy.bind(this);
    let modalBackground = this.renderModalBackground();

    return (
      <div ref="mainNode">
        <div className="header-wrapper">
          <Header
            title={state.title}
            description={state.description}
          />
          <OrderByList
            options={this.orderByOptions}
            selected={state.orderBy}
            changeCallback={orderCallback}
          />
          <AddBar callBack={callBack}/>
        </div>
        <ToDoList 
          ref="todoList" 
          orderBy={state.orderBy}
        />
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
