import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Demo = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container">
      <ul className="list-group">
        {store.contacts.map((item, index) => {
          return (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between"
            >
              {item.name}
              <br />
              {item.email}
              <button onClick={() => actions.deleteContact(index)}>
                borrar
              </button>
            </li>
          );
        })}
      </ul>
      <br />
      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
    </div>
  );
};
