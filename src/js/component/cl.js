import React ,{ useEffect , useState , useContext} from 'react';
import Card from './card';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

const Cl = () => {
    const { store, actions } = useContext(Context);
    const [contacts , setContacts] = useState([]);
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(`/add-contact`);
    };

    useEffect(() => {
        if (store.contacts.length >= 0) {
            setContacts(store.contacts);
        }
    }   , [store.contacts]);


    return (
        <div className='container-fluid'>
            <div className="container header">
                <button type="button" className="btn btn-secondary" onClick={handleEditClick}>
                    Add Contact
                </button>
            </div>
            <div className="container d-flex flex-column contact-container border border-warning-subtle">
                {contacts.map((contact) => (
                    <Card key={contact.id} contact={contact} />
                ))}
            </div>
        </div>
    );
};

export default Cl;