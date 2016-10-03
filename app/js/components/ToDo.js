import React from "react";
import TodoAnimator from "../animation/TodoAnimator.js";

export default class ToDo extends React.Component {

  constructor(props) {
    super(props);
    this.defaultCss = "todo";
    this.expandedCss = "todo todo--expanded-state";
    this.state = {
      css: this.defaultCss,
      details: [],
      expandCallback: this.expand.bind(this)
    };
  }

  expand() {
    let { details, expandCallback, css } = this.state;
    let styles = this.expandAnimator.expand();

    details = [
      { title: 'created: ', value: '20/09/2016' }
    ];

    expandCallback = this.contract.bind(this);
    css = this.expandedCss;

    this.setState({
      details,
      expandCallback,
      css,
      styles
    });
  }

  contract() {
    this.expandAnimator.contract();
    let { details, expandCallback, css } = this.state;
    details = [];
    expandCallback = this.expand.bind(this);
    css = this.defaultCss;

    this.setState({
      details, expandCallback, css, styles: {}
    });
  }

  setAsDone(e) {
    e.stopPropagation();
    if (this.expandAnimator.isExpanded) {
      this.expandAnimator.contract();
      this.contract();
    }
    this.props.deleteToDo(this.props.objId);
  }

  componentDidMount() {
    this.DOMElement = this.refs.thisDOMElement;
    this.expandAnimator = new TodoAnimator(
      this.DOMElement,
      this.contract.bind(this));
  }

  componentDidUpdate() {
    if (this.expandAnimator) {
      if (this.expandAnimator.isExpanded) {
        this.refs.editTodoInput.focus();
      }
    }
  }

  renderToDoDetails() {
    return this.state.details.map((info, i) =>
      <div className = "todo__detail" key="i">
          <h5 className = "todo__detail__title">{info.title}</h5>
          <p className = "todo__detail__text">{info.value}</p>
      </div>
    );
  }

  renderButtons() {
    let action = this.state.expandCallback;
    const deleteToDo = this.setAsDone.bind(this);
    return (
      <div className = "todo__actions">
        <button key="1" onClick={action} className="todo__actions__button">
          <i className="todo__actions__icon fa fa-plus"></i>
        </button>
        <button key="2" className="todo__actions__button">
          <i className="todo__actions__icon fa fa-pencil"></i>
        </button>
        <button key="3" onClick={deleteToDo} className="todo__actions__button">
          <i className="todo__actions__icon fa fa-trash-o"></i>
        </button>
      </div>
    );
  }

  updateTodoValue(e) {
    this.props.updateTodoValue(this.props.objId, e.target.value);
  }

  renderTodoText(value) {
    if (this.expandAnimator) {
      if (this.expandAnimator.isExpanded) {
        return (
          <input
            ref="editTodoInput"
            defaultValue={value}
            onChange={this.updateTodoValue.bind(this)}>
          </input>
        );
      }
    }
    return (
      <h4 className = "todo__text">{value}</h4>
    );
  }

  render() {
    let { css, styles } = this.state;
    let { value } = this.props;
    let infos = this.renderToDoDetails();
    let buttons = this.renderButtons();
    let todoText = this.renderTodoText(value);
    const clickCallback = this.state.expandCallback;

    return (
      <div className = {css} style={styles} ref="thisDOMElement"
        onClick={clickCallback}>
        {todoText}
        {buttons}
        {infos}
      </div>
    );
  }

}
