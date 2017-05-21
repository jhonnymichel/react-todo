import React from 'react';
import ReactDOM from 'react-dom';

export default class XexeuFlip extends React.Component {

  constructor() {
    super();
    this.willTransform = false;
    this.amountOfChildren = 0;
    this.clonedElements = null;
    this.newChildKey = "";
  }

  componentWillReceiveProps(props) {
    this.propertyToAnimate =
      props.propertyToAnimate ||
      'all';

    this.reorderTimingFunction =
      props.reorderTimingFunction ||
      props.timingFunction ||
      'ease-in-out';

    this.reorderTransitionDuration =
      props.reorderTransitionDuration ||
      props.transitionDuration ||
      200;

    this.reorderIncreasingDelay =
      props.reorderIncreasingDelay ||
      0;

    this.enterTimingFunction =
      props.enterTimingFunction ||
      props.timingFunction ||
      'ease-in-out';

    this.enterTransitionDuration =
      props.enterTransitionDuration ||
      props.transitionDuration ||
      200;

    this.enterTransformOrigin =
      props.enterTransformOrigin ||
      props.transformOrigin ||
      'center center';

    this.enterInitialStyle =
      props.enterInitialStyle ||
      props.initialAndFinalStyle ||
      { transform: "scale(0)" };
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
      if (this.shouldChildAnimate(rect, listItem)) {
        this.applySwapAnimation(rect, listItem, i);
      }
    }
    if (this.newChildKey) {
      this.applyEnterAnimation();
    }
    this.willTransform = false;
  }

  shouldChildAnimate(rect, listItem) {
    return rect.top !== listItem.positionY || rect.left !== listItem.positionX;
  }

  applySwapAnimation(rect, listItem, i) {
    listItem.element.style.transitionDuration = "0ms";
    listItem.element.style.transitionDelay = "0ms";
    listItem.element
      .style
      .transform = `translate(${listItem.positionX - rect.left}px, ${listItem.positionY - rect.top}px)`;
    requestAnimationFrame(() => {
      listItem.element
        .style
        .transitionProperty = this.propertyToAnimate;
      listItem.element
        .style
        .transitionTimingFunction = `${this.reorderTimingFunction}`;
      listItem.element
        .style
        .transitionDuration = `${this.reorderTransitionDuration}ms`;
      listItem.element
        .style
        .transitionDelay = `${this.reorderIncreasingDelay * i}ms`;
      listItem.element.style.transform = "";
    });
  }

  applyEnterAnimation() {
    const newChild = ReactDOM.findDOMNode(this.refs[this.newChildKey]);
    for (let property in this.enterInitialStyle) {
      newChild.style[property] = this.enterInitialStyle[property];
    };
    newChild.style.transformOrigin = this.enterTransformOrigin;
    requestAnimationFrame(() => { 
      for (let property in this.enterInitialStyle) {
        newChild.style[property] = "";
      };
      newChild.style.transitionProperty = this.propertyToAnimate;
      newChild.style.transitionTimingFunction = this.enterTimingFunction;
      newChild.style.transitionDuration = `${this.enterTransitionDuration}ms`;
    });
    this.newChildKey = "";
  }

  cloneChildrenWithRefs(children) {
    return React.Children.map(children, (child) => {
      if (!this.refs[child.key]) {
        this.newChildKey = child.key;
      }
      return React.cloneElement(child, {
        ref: child.key
      });
    });
  }

  render() {
    return (
      <div
        style={this.props.style}
      >
        {this.cloneChildrenWithRefs(this.props.children)}
      </div>
    );
  }
}
