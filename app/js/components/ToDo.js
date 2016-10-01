import React from "react";

export default class ToDo extends React.Component {

  constructor(props) {
    super(props);
    this.transitionCss = "todo-list__todo todo-list__todo--initial-state";
    this.defaultCss = "todo-list__todo";
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

  render() {
    let { css, details, expandCallback } = this.state;
    const clickCallback = this.fadeOut.bind(this);
    let { value } = this.props;
    let infos = details.map((info, i) =>
              <div>
                  <h5>{info.title}</h5>
                  <p>{info.value}</p>
              </div>
            );
    return (
      <div className = {css} ref="thisDOMElement"
        onDoubleClick={clickCallback} onClick={expandCallback}>
        <h4 className = "todo-list__todo--text">{value}</h4>
        {infos}
      </div>
    );
  }

}
