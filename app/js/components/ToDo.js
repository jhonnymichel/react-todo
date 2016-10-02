import React from "react";

export default class ToDo extends React.Component {

  constructor(props) {
    super(props);
    this.modalEvent = new Event('modalEvent', {
      bubbles: true,
      cancelable: false }
    );
    console.log(this.modalEvent.bubbles);
    this.transitionCss = "todo todo--initial-state";
    this.defaultCss = "todo";
    this.expandedCss = "todo todo--expanded-state";
    this.state = {
      css: this.transitionCss,
      details: [],
      expandCallback: this.expand.bind(this)
    };
  }

  expand() {
    this.initialY = this.DOMElement.getBoundingClientRect().top +
    this.DOMElement.getBoundingClientRect().height * 0.5;
    this.finalY = 0;
    this.DOMElement.dispatchEvent(this.modalEvent);
    let { details, expandCallback, css } = this.state;
    let styles = {
      transform: 'translateY(' + (this.finalY - this.initialY) + 'px)'
    };
    console.log("styles are ", styles, this.finalY, this.initialY);
    details = [
      { title: 'created: ', value: '20/09/2016' }
    ];
    expandCallback = this.contract.bind(this);
    css = this.expandedCss;
    this.setState({
      details, expandCallback, css, styles
    });
  }

  contract() {
    this.DOMElement.dispatchEvent(this.modalEvent);
    let { details, expandCallback, css } = this.state;
    details = [];
    expandCallback = this.expand.bind(this);
    css = this.defaultCss;
    this.setState({
      details, expandCallback, css, styles: {}
    });
  }

  fadeOut(e) {
    e.stopPropagation();
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
      <div key="i">
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

  render() {
    let { css, styles } = this.state;
    let { value } = this.props;
    let infos = this.renderToDoDetails();
    let buttons = this.renderButtons();
    const clickCallback = this.state.expandCallback;

    return (
      <div className = {css} style={styles} ref="thisDOMElement"
        onClick={clickCallback}>
        <h4 className = "todo__text">{value}</h4>
        {buttons}
        {infos}
      </div>
    );
  }

}
