import React from 'react';

export default function OrderByList({options, selected, changeCallback}) {
  const icons = {
    date: 'date_range',
    undone: 'check_box_outline_blank',
    done: 'check_box'
  };
  const buttons = options.map(option => {
    let className = "btn-list__btn";
    if (option === selected) {
      className += "--selected";
    }
    return (
      <li className={className} key={option}>
        <button value={option}
          onClick={changeCallback}
        >
          <i className="material-icons">{icons[option]}</i> {option}
        </button>
      </li>
    );
  });
  return (
    <div className="order-bar">
      <p className="order-bar__hint-text">hint: you can click a todo to edit it.</p>
      <ul className="order-bar__btn-list">
        {buttons}
      </ul>
    </div>
  );
}
