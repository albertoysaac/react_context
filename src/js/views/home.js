import React, { useState, useEffect, useContext } from "react";
import Login from "../component/login";

import { Context } from "../store/appContext";
import Cl from "../component/cl";

import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  

  function content(){
    if (store.contactListName !== "" && store.contactListName !== undefined && store.contactListName !== "no existe"&& store.contacts.length >= 0) {
      return <Cl />
    }
    else{
      return <Login />
    }
}

  
  return (
    <>
      {content()}
    </>
  );
};
