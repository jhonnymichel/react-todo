import React from "react";

export default function DoneToggle ({ status, clickHandler }) {
  let css = `material-icons ${status ? 'checked' : 'unchecked'}`;
  let icon = `${status ? 'check_circle' : 'radio_button_unchecked'}`;
  return (
    <button
      className="todo__toggle-button"
      onClick={clickHandler}
    >
      <i className = {css}>{icon}</i>
    </button>
  );
}
