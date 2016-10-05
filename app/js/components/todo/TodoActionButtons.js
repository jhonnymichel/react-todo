import React from "react";

export default function TodoActionButtons({ deleteToDo }) {
  return (
    <div className = "todo__actions">
      <button key="1" onClick={deleteToDo} className="todo__actions__button">
        <i className="todo__actions__icon fa fa-trash-o"></i>
      </button>
    </div>
  );
}
