import React, { useState , useEffect, useContext } from 'react';
import { Context } from '../store/appContext';

const Login = () => {
    const { store, actions } = useContext(Context);
    const [inputValue, setInputValue] = useState("");
    const [contactList, setContactList] = useState("");


    useEffect(() => {
        console.log(store.contactListName);
        if (store.contactListName !== "") {
            
            setContactList(store.contactListName);
        }
    }, [store.contactListName]);

    return (
        <div className="container-fluid">
            <div className="container">

                <div className="row login-title">
                    <h1 className="text-center mt-5">
                        Bienvenidos al sistema de agendas
                    </h1>
                </div>

                <div className="mt-8">

                    <div className="form-floating mb-3">
                        
                        <input className="form-control"
                            id="floatingInput"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) =>
                            e.key == "Enter" ? actions.login(inputValue) : null
                            }
                            placeholder="Agenda"/>
                        <label htmlFor="floatingInput">Ingrese el nombre de su Agenda</label>
                    </div>

                    <div id="emailHelp" className="form-text">
                        {contactList === "" ? 
                        <div className="alert alert-primary d-flex align-items-center" role="alert">
                            <div className="me-2 d-flex justify-content-center">
                                <i className="bi bi-info-circle-fill"></i>
                            </div>
                            <div>
                                Bienvenido al Sistema de Agendas, este sistema le permite crear y gestionar sus contactos de manera sencilla y eficiente.
                                cree una agenda con el nombre que desee y comience a agregar contactos.
                            </div>
                        </div> 
                        : contactList === "no existe" ?
                        <div className="alert alert-warning d-flex align-items-center row" role="alert">
                            <div className="col-1 d-flex justify-content-center">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                            </div>
                            <div className="col-8">
                                La agenda que busca no existe, desea crear una nueva agenda con el nombre <strong>"{inputValue}"</strong>?
                            </div>
                            <div className="col-3 container-fluid d-flex align-items-end">
                                <div className="col">
                                    <button
                                    className="btn btn-outline-success"
                                    onClick={() => {
                                        actions.signup(inputValue);
                                    }}
                                    >
                                    CREAR
                                    </button>
                                </div>
                                <div className="col">
                                    <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => {
                                        setContactList("");
                                    }}
                                    >
                                    CANCELAR
                                    </button>
                                </div>
                            </div>
                        </div>
                        :""
                        }   
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;