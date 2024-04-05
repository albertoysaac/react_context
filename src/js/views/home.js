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
                e.key == "Enter" ? actions.clNameCheck(contactList) : null
              }
            />
            <div id="emailHelp" className="form-text">
              {(() => {
                console.log(store.cLNameMod);
                let status = store.cLNameMod.status;
                console.log(status);
                if (status == "404") {
                  return (
                    <div className="alert alert-danger" role="alert">
                      La agenda no existe, desea crearla?
                    </div>
                  );
                }
                if (status == "200") {
                  return (
                    <div className="alert alert-success" role="alert">
                      La agenda existe, desea ingresar?
                    </div>
                  );
                }
                if (status == "") {
                  return (
                    <div className="alert" role="alert">
                      Ingrese el nombre de la agenda
                    </div>
                  );
                }
              })()}
            </div>
            {(() => {
              if (
                store.cLNameMod.cListName !== undefined &&
                store.cLNameMod.status == "404"
              ) {
                return (
                  <Link to="/demo">
                    <span
                      className="btn btn-primary btn-lg"
                      href="#"
                      role="button"
                      onClick={() => {
                        actions.myContacts();
                        console.log("-----home to demo-----");
                      }}
                    >
                      Crear Agenda
                    </span>
                  </Link>
                );
              }
              if (
                store.cLNameMod.cListName !== undefined &&
                store.cLNameMod.status == "200"
              ) {
                return (
                  <Link to="/demo">
                    <span
                      className="btn btn-primary btn-lg"
                      href="#"
                      role="button"
                      onClick={() => {
                        console.log("-----home to demo-----");
                      }}
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
