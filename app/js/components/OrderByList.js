import React from 'react';

export default function OrderByList({options, selected, changeCallback}) {
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
          {option}
        </button>
      </li>
    );
  });
  return (
    <div className="order-bar">
      <ul className="order-bar__btn-list">
        {buttons}
      </ul>
    </div>
  );
}
