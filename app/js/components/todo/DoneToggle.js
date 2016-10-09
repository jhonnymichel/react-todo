import React from "react";

export default function DoneToggle ({ status, clickHandler }) {
  let icon = `fa fa-${status ?
    'check-square-o' :
    'square-o'}`;
  return (
    <button
      className="todo__toggle-button"
      onClick={clickHandler}
    >
      <i className = {icon}></i>
    </button>
  );
}
