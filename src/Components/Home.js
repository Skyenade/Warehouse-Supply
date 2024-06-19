import React from "react";
import './Style.css';
import Header from "./Header";
import logo from './logo.jpg';

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
                    <button className="home-buttons">SignIn</button>
                    <p>Don't have an account?</p>
                    <button className="home-buttons">SignUp</button>
                </div>
            }

        </div>
    );
};

export default Home;
