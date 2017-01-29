import React from "react";

export default function TodoDetails({ details }) {
  const getTitle = (title) => {
    if (title) {
      return (
        <h5 className = "todo__detail__title">{title}</h5>
      );
    }
  };
  const list = details.map((info, i) =>
    <div className = "todo__detail" key={i}>
        {getTitle(info.title)}
        <p className = "todo__detail__text">{info.value}</p>
    </div>
  );
  return (
    <div className="todo__details">
      {list}
    </div>
  );
}
