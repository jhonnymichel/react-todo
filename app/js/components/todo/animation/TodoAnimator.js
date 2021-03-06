import isMobile from "../../../utils/checkMobile";

export default class TodoAnimator {

  constructor(DOMElement, closeCallback) {
    this.DOMElement = DOMElement;
    this.isExpanded = false;
    this.modalEvent = new CustomEvent('modalEvent', {
      bubbles: true,
      cancelable: false,
      detail: {
        closeCallback
      }
    });
  }

  setBounds() {
    this.bounds = this.DOMElement.getBoundingClientRect();
    this.initialY = this.bounds.top + this.bounds.height * 0.5;
    this.finalY = window.innerHeight * (isMobile() ? 0.2 : 0.5);
  }

  expand() {
    this.setBounds();
    this.DOMElement.dispatchEvent(this.modalEvent);
    this.isExpanded = true;
    return {
      transform: `translateY(${this.finalY - this.initialY}px)`,
      top: `${this.initialY - this.bounds.height * .5}px`
    };
  }

  contract() {
    this.DOMElement.dispatchEvent(this.modalEvent);
    this.isExpanded = false;
  }

}
