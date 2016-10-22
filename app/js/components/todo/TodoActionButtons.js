import React from "react";

export default function TodoActionButtons({ deleteTodo }) {
  return (
    <div className = "todo__actions">
      <button key="1" onClick={deleteTodo} className="todo__actions__button">
        <i className="todo__actions__icon material-icons">delete_forever</i>
      </button>
    </div>
  );
}
