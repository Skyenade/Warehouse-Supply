import React from "react";

import './Style.css';

const generateRows = (inventoryItems, onDelete, onEdit) => {
    const rows = [];
    for (let id in inventoryItems) {
        rows.push(
            <tr key={id}>
                <td>{inventoryItems[id].id}</td>
                <td>{inventoryItems[id].Product}</td>
                <td>{inventoryItems[id].Description}</td>
                <td>{inventoryItems[id].Quantity}</td>
                <td>
                    <button className="edit" onClick={() => onEdit(id)}>Edit</button>
                    <button className="delete" onClick={() => onDelete(id)}>Delete</button>
                </td>
            </tr>
        );
    }
    return rows; // Add this line to return the rows
};




const Home = ({ inventoryItems, onDelete, onEdit }) => {


return(
    <div>
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
)
}

export default Home;