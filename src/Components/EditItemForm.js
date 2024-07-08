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

    const handleSave = (e) => {
        e.preventDefault();
        onSave(editedItem);
    };

    useEffect(() => {
        setEditedItem({ ...item });
    }, [item]);

    return (
        <div className="edit-container">
            <h3>Edit Item</h3>
            <form className='edit-form-container' onSubmit={handleSave}>
                <label>Product:</label>
                <input type="text" name="products" value={editedItem.products} onChange={handleChange} />
                <label>ID:</label>
                <input type="text" name="id" value={editedItem.id} onChange={handleChange} readOnly disabled/>
                <label>Quantity:</label>
                <input type="number" name="quantity" value={editedItem.quantity} onChange={handleChange} />
                <label>Description:</label>
                <input type="text" name="description" value={editedItem.description} onChange={handleChange} />
                <label>Picture:</label>
                <input type="text" name="picture" value={editedItem.picture} onChange={handleChange} />   
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default EditItemForm;
