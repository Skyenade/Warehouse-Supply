import React from "react";
import './Style.css';
import Header from "./Header";
import logo from './logo.jpg';
import { useNavigate } from "react-router-dom";



const generateRows = (inventoryItems, onDelete, onEdit) => {
    const rows = [];
    for (let id in inventoryItems) {
        rows.push(
            <tr key={id}>
                <td>{inventoryItems[id].id}</td>
                <td>{inventoryItems[id].products}</td> {/* Ensure this matches the key in inventoryItems */}
                <td>{inventoryItems[id].description}</td> {/* Ensure this matches the key in inventoryItems */}
                <td>{inventoryItems[id].quantity}</td>
                <td>
                    <button className="edit" onClick={() => onEdit(id)}>Edit</button>
                    <button className="delete" onClick={() => onDelete(id)}>Delete</button>
                </td>
            </tr>
        );
    }
    return rows;
};

const Home = ({ inventoryItems, onDelete, onEdit, email }) => {

    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('/signup');
    };

    const handleSignIn = () => {
        navigate('/signin');
    };

    return (
        <div className="home-container">
            {email ?
                <div>
                    <Header email={email} />
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Product</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {generateRows(inventoryItems, onDelete, onEdit)}
                        </tbody>
                    </table>
                </div>
                :
                <div>
                    <img src={logo} alt="Logo" className="logo-home" />
                    <button onClick={handleSignIn} className="home-buttons">Sign In</button>
                    <p onClick={handleSignUp} className="home-text">Don't have an account?</p>
                    <button onClick={handleSignUp} className="home-buttons">Sign Up</button>
                </div>
            }

        </div>
    );
};

export default Home;
