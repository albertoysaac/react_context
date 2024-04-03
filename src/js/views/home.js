import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/home.css";
/*ToDos: 
|	1. crear un componente que muestre tarjetas con los datos de contacto de mis contactos desde la API
|	2. crear un modal con el formulario de agregar contacto, y poner los datos de nombre, telefono, 
|	email y direccion en el contexto y posteriormente persistir los datos en la API.
|	3. agregar 2 botones en las tarjetas de contacto para editar y eliminar el contacto
|	4. antes de eliminar el contacto, mostrar una alerta para confirmacion del usurio
*/

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [contactList, setContactList] = useState("");
  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <h1 className="text-center mt-5">
            Bienvenidos al sistema de agendas
          </h1>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Ingrese el nombre de su Agenda personalizada
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              value={contactList}
              onChange={(e) => setContactList(e.target.value)}
              onKeyDown={(e) =>
                e.key == "Enter" ? actions.slugNameCheck(contactList) : null
              }
            />
            <div id="emailHelp" className="form-text">
              {store.slugNameCheck.message}
            </div>
            {(() => {
              console.log(store.slugNameCheck.message);
              if (store.slugMode == "404" && store.slugMode !== "") {
                return (
                  <Link to="/demo">
                    <span
                      className="btn btn-primary btn-lg"
                      href="#"
                      role="button"
                      onClick={() => actions.setSlug(contactList)}
                    >
                      Crear Agenda
                    </span>
                  </Link>
                );
              }
              if (store.slugMode !== "404" && store.slugMode !== "") {
                return (
                  <Link to="/demo">
                    <span
                      className="btn btn-primary btn-lg"
                      href="#"
                      role="button"
                      onClick={() => actions.setSlug(contactList)}
                    >
                      Ver Agenda
                    </span>
                  </Link>
                );
              }
            })()}
          </div>
        </div>
      </div>
    </>
  );
};
