import React from "react";

export default class ToDo extends React.Component {

  constructor(props) {
    super(props);
    this.transitionCss = "todo todo--initial-state";
    this.defaultCss = "todo";
    this.state = {
      css: this.transitionCss,
      details: [],
      expandCallback: this.expand.bind(this)
    };
  }

  expand() {
    let { details, expandCallback } = this.state;
    details = [
      { title: 'created: ', value: '20/09/2016' }
    ];
    expandCallback = this.contract.bind(this);
    this.setState({
      details, expandCallback
    });
  }

  contract() {
    let { details, expandCallback } = this.state;
    details = [];
    expandCallback = this.expand.bind(this);
    this.setState({
      details, expandCallback
    });
  }

  fadeOut() {
    let css = { ...this.state.css };
    css = this.transitionCss;
    this.setState({
      css
    });
    this.DOMElement.addEventListener('transitionend',
                                      this.setAsDone.bind(this));
  }

  setAsDone() {
    this.DOMElement.removeEventListener('transitionend',
                                        this.setAsDone.bind(this));
    this.props.deleteToDo(this.props.objId);
  }

  componentDidMount() {
    this.DOMElement = this.refs.thisDOMElement;
    setTimeout(() => {
      let css = { ...this.state.css };
      css = this.defaultCss;
      this.setState({
        css
      });
    }, 10);
  }

  renderToDoDetails() {
    return this.state.details.map((info, i) =>
      <div>
          <h5>{info.title}</h5>
          <p>{info.value}</p>
      </div>
    );
  }

  renderButtons() {
    let action = this.state.expandCallback;
    const deleteToDo = this.fadeOut.bind(this);
    return (
      <div className = "todo__actions">
        <button onClick={action} className="todo__actions__button">
          <i className="todo__actions__icon fa fa-plus"></i>
        </button>
        <button className="todo__actions__button">
          <i className="todo__actions__icon fa fa-pencil"></i>
        </button>
        <button onClick={deleteToDo} className="todo__actions__button">
          <i className="todo__actions__icon fa fa-trash-o"></i>
        </button>
      </div>
    );
  }

  render() {
    let { css } = this.state;
    let { value } = this.props;
    let infos = this.renderToDoDetails();
    let buttons = this.renderButtons();
    const clickCallback = this.fadeOut.bind(this);

    return (
      <div className = {css} ref="thisDOMElement"
        onDoubleClick={clickCallback}>
        <h4 className = "todo__text">{value}</h4>
        {buttons}
        {infos}
      </div>
    );
  }

}
