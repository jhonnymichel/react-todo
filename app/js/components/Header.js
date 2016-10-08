import React from "react";

export default function Header ({title, description}) {
  return (
    <header className="header">
      <h1 className="header__title">
        <i className="fa fa-sticky-note-o"></i>{title}</h1>
      <p className="header__description">{description}</p>
    </header>
  );
}
