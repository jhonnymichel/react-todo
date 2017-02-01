import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export default class XexeuFlip extends React.Component {
  constructor() {
    super();
    this.willTransform = false;
  }

  componentWillUpdate() {
    if (this.willTransform) {
      return;
    }
    this.willTransform = true;
    this.listItems = [];
    React.Children.forEach(this.props.children, (child) => {
      const key = child.key;
      const domElement = ReactDOM.findDOMNode(this.refs[key]);
      const rect = domElement.getBoundingClientRect();
      if (domElement) {
        this.listItems.push({
          positionY: rect.top,
          positionX: rect.left,
          element: domElement
        });
      }
    });
  }

  componentDidUpdate() {
    if (!this.willTransform) {
      return;
    }
    const length = this.listItems.length;
    for (let i = 0; i < length; i++) {
      const listItem = this.listItems[i];
      const rect = listItem.element.getBoundingClientRect();
      listItem.element.style.transitionDuration = "0ms";
      listItem.element.style.transitionDelay = "0ms";
      listItem.element
        .style
        .transform = `translate(${listItem.positionX - rect.left}px, ${listItem.positionY - rect.top}px)`;
      requestAnimationFrame(() => {
        listItem.element
          .style
          .transitionTimingFunction = `${this.props.reorderTimingFunction || 'ease-in-out'}`;
        listItem.element
          .style
          .transitionDuration = `${this.props.reorderTransitionDuration || 200}ms`;
        listItem.element
          .style
          .transitionDelay = `${this.props.reorderIncreasingDelay * i || 0}ms`;
        listItem.element.style.transform = "";
      });
    }
    this.willTransform = false;
  }

  cloneChildrenWithRefs(children) {
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        ref: child.key
      });
    });
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        style={{width: "100%"}}
        transitionName={this.props.reactTransitionName}
        transitionEnterTimeout={this.props.transitionEnterTimeout}
        transitionLeaveTimeout={this.props.transitionLeaveTimeout}
      >
        {this.cloneChildrenWithRefs(this.props.children)}
      </ReactCSSTransitionGroup>
    );
  }
}
