import React from 'react';

export default class TodoAnimator extends React.Component {

  constructor(DOMElement, closeCallback) {
    super();
    this.DOMElement = DOMElement;
    this.isExpanded = false;
    this.modalEvent = new CustomEvent('modalEvent', {
      bubbles: true,
      cancelable: false,
      detail: {
        closeCallback: closeCallback
      }
    });
  }

  setBounds() {
    this.bounds = this.DOMElement.getBoundingClientRect();
    this.initialY = this.bounds.top + this.bounds.height * 0.5;
    this.finalY = window.innerHeight * 0.5;
    console.log("bounds are", this.bounds, this.initialY);
  }

  expand() {
    this.setBounds();
    this.DOMElement.dispatchEvent(this.modalEvent);
    this.isExpanded = true;
    return {
      transform: 'translateY(' + (this.finalY - this.initialY) + 'px)',
      top: (this.initialY -
      this.DOMElement.getBoundingClientRect().height * .5) + 'px'
    };
  }

  contract() {
    this.DOMElement.dispatchEvent(this.modalEvent);
    this.isExpanded = false;
  }

}
