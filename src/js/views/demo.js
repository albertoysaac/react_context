import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Demo = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container">
      <ul className="list-group">
        {store.contacts && store.contacts.length > 0 ? (
          store.contacts.map((item, index) => {
            return (
              <li
                key={index}
                className="list-group-item card mb-3 d-flex justify-content-between"
              >
                <div className="row g-0">
                  <div className="col-md-4 img-container">
                    <img
                      src={"https://picsum.photos/200/20" + index}
                      className="img-fluid img-contact"
                      alt="imagen de contacto"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h2 className="card-title">{item.name}</h2>
                      <h4 className="card-text">
                        <i className="bi bi-geo-alt-fill"></i>
                        {item.address}
                      </h4>
                      <h5 className="card-text">
                        <i class="bi bi-telephone-fill"></i>
                        {item.phone}
                      </h5>
                      <h6 className="card-text">
                        <i class="bi bi-envelope-at-fill"></i>
                        {item.email}
                      </h6>
                    </div>
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <li className="list-group-item">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title placeholder-glow">
                  <i className="bi bi-person-fill"></i>
                  <span className="placeholder col-6"></span>
                </h2>
                <h4 className="card-text placeholder-glow">
                  <i className="bi bi-geo-alt-fill"></i>
                  <span className="placeholder col-3"></span>
                </h4>
                <h5 className="card-text placeholder-glow">
                  <i className="bi bi-telephone-fill"></i>
                  <span className="placeholder col-3"></span>
                </h5>
                <h6 className="card-text placeholder-glow">
                  <i className="bi bi-envelope-fill"></i>
                  <span className="placeholder col-3"></span>
                </h6>
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};
