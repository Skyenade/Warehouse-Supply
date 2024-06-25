import React, { useState } from "react";
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
                <td>{inventoryItems[id].picture}</td>
                <td>{inventoryItems[id].products}</td>
                <td>{inventoryItems[id].description}</td>
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

const HomeAdmin = ({ inventoryItems, onDelete, onEdit, email, handleSignOut }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);

    const handleSignUp = () => {
        navigate('/signup');
    };

    const handleSignIn = () => {
        navigate('/signin');
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
            const filtered = Object.values(inventoryItems).filter(item =>
                item.products.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredItems(filtered);
        } else {
            setFilteredItems([]);
        }
    };

    const clearSearch = () => {
        setSearchQuery("");
        setFilteredItems([]);
    };

    const goToInventoryUser = () => {
        navigate('/InventoryAdmin');
    };

    const itemsToDisplay = searchQuery.trim() !== "" ? filteredItems : inventoryItems;

    return (
        <div className="home-container">
            {email && <Header email={email} handleSignOut={handleSignOut} />}
            <div>
                {email ? (
                    <div className="content-container">
                        <div className="search-inventory-container">
                            <div className="search-container">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="search-input"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                                <button className="search-button" onClick={handleSearch}>Search</button>
                                <button className="clear-button" onClick={clearSearch}>Clear</button>
                            </div>

                            <button className="go-to-inventory" onClick={goToInventoryUser}>Go to Inventory Admin</button>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Picture</th>
                                    <th>Product</th>
                                    <th>Description</th>
                                    <th>Quantity</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {generateRows(itemsToDisplay, onDelete, onEdit)}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>
                        <img src={logo} alt="Logo" className="logo-home" />
                        <button onClick={handleSignIn} className="home-buttons">Sign In</button>
                        <p onClick={handleSignUp} className="home-text">Don't have an account?</p>
                        <button onClick={handleSignUp} className="home-buttons">Sign Up</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomeAdmin;
