import React, { useState } from "react";
import './Style.css';
import Header from "./Header";
// import logo from './logo.jpg';
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
            </tr>
        );
    }
    return rows;
};

const HomeUser = ({ inventoryItems, onDelete, onEdit, email, setEmail }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredItems, setFilteredItems] = useState(inventoryItems);


    const handleSignOut = () => {
        setEmail("");
        navigate('/');
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
            const filtered = Object.values(inventoryItems).filter(item =>
                item.products.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.id.includes(searchQuery)
            );
            setFilteredItems(filtered);
        } else {
            setFilteredItems(inventoryItems);
        }
    };


    const goToInventoryUser = () => {
        navigate('/inventoryuser');
    };

    const itemsToDisplay = searchQuery.trim() !== "" ? filteredItems : inventoryItems;

    return (
        <div className="home-container">
            <Header email={email} handleSignOut={handleSignOut} />
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
                    </div>

                    <button className="go-to-inventory" onClick={goToInventoryUser}>Go to Inventory User</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Picture</th>
                            <th>Product</th>
                            <th>Description</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {generateRows(itemsToDisplay, onDelete, onEdit)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HomeUser;