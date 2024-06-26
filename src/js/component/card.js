import React, { useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';

const Card = ({ contact }) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(`/edit-contact/${contact.id}`);
    };

    return (
        <div className="card mb-3 col-11" >
            <div className="row g-0">
                <div className="col-md-4">
                <img src="https://picsum.photos/300/200" className="img-fluid rounded-start" alt="..."/>
                </div>
                <div className="col-md-7">
                    <div className="card-body">
                        <h5 className="card-title">Contact Name: {contact.name}</h5>
                        <p className="card-text">Phone: {contact.phone}</p>
                        <p className="card-text">Email: {contact.email}</p>
                        <p className="card-text">Address: {contact.address}</p>
                    </div>                    
                </div>
                <div className="col-md-1 card-footer flex-column justify-content-start">
                    <button type="button" className="btn-edit" onClick={handleEditClick}>
                        <i type="button" className="bi bi-pencil-fill modal-edit"></i>
                    </button>
                    <button className="btn btn-close"
                    onClick={() => {
                        actions.deleteContact(contact.id);
                    }}
                    ></button>
                </div>
            </div>
        </div>
    );
};

export default Card;