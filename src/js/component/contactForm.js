import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";

const ContactForm = ({ callby }) => {
    const params = useParams();
    const { store, actions } = useContext(Context);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(callby);
        const selectedcontact = store.contacts.filter(contact => {
            if (contact.id == params.id) {
                return contact;
            }
        })
        console.log(selectedcontact);
        if (callby === "card" && selectedcontact.length > 0) {
            setName(selectedcontact[0].name || '');
            setEmail(selectedcontact[0].email || '');
            setPhone(selectedcontact[0].phone || '');
            setAddress(selectedcontact[0].address || '');
        } else {
            setName('');
            setEmail('');
            setPhone('');
            setAddress('');
        }
    }, [params.id,callby]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        if (callby === "contactList") {
            actions.addContact(store.contactListName, { name, email, phone, address })
                .then(response => {
                    setLoading(false);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setAddress('');
                });
        } else if (callby === "card") {
            actions.updateContact(params.id, { name, email, phone, address })
                .then(response => {
                    setLoading(false);
                });
        }
    };

    return (
        <div>
            <h1>{callby === "card" ? "Edit Contact" : "Add Contact"}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Saving..." : callby === "card" ? "Update Contact" : "Add Contact"}
                </button>
            </form>
            <Link to="/">Back</Link>
        </div>
    );
};

export default ContactForm;