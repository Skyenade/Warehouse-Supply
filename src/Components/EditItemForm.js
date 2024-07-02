import React, { useState, useEffect } from 'react';

const EditItemForm = ({ item, onSave, onCancel }) => {
    const [editedItem, setEditedItem] = useState({ ...item });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedItem(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = () => {
        onSave(editedItem);
    };

    useEffect(() => {
        setEditedItem({ ...item });
    }, [item]);

    return (
        <div className="edit-form-container">
            <h3>Edit Item</h3>
            <label>ID:</label>
            <input type="text" name="id" value={editedItem.id} onChange={handleChange} disabled />
            <label>Picture:</label>
            <input type="text" name="picture" value={editedItem.picture} onChange={handleChange} />
            <label>Product:</label>
            <input type="text" name="products" value={editedItem.products} onChange={handleChange} />
            <label>Description:</label>
            <input type="text" name="description" value={editedItem.description} onChange={handleChange} />
            <label>Quantity:</label>
            <input type="number" name="quantity" value={editedItem.quantity} onChange={handleChange} />
            <button onClick={handleSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default EditItemForm;
