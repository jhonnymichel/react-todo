import React from "react";

export default function DoneToggle ({ status, clickHandler }) {
  let icon = `material-icons ${status ? 'checked' : 'unchecked'}`;
  return (
    <button
      className="todo__toggle-button"
      onClick={clickHandler}
    >
      <i className = {icon}>check_circle</i>
    </button>
  );
}
