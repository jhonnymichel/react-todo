import React from "react";

export default function TodoDetails({ details }) {
  let list = details.map((info, i) =>
    <div className = "todo__detail" key={i}>
        <h5 className = "todo__detail__title">{info.title}</h5>
        <p className = "todo__detail__text">{info.value}</p>
    </div>
  );
  return (
    <div>
      {list}
    </div>
  );
}
