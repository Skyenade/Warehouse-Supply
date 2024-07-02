import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const initializeFieldsValues = {
    products: "",
    id: "", // Keep id as string to handle auto-increment correctly
    quantity: "",
    description: "",
    picture: ""
};
const InventoryAdmin = ({ addorEditItems, currentId, inventoryItems, email, handleSignOut  }) => {

    const [values, setValues] = useState(initializeFieldsValues);
    const [maxId, setMaxId] = useState(0);

    useEffect(() => {
        // Calculate the maximum id currently in inventoryItems
        let currentMaxId = 0;
        for (const key in inventoryItems) {
            if (parseInt(inventoryItems[key].id) > currentMaxId) {
                currentMaxId = parseInt(inventoryItems[key].id);
            }
        }
        setMaxId(currentMaxId);

        if (currentId === "" || !inventoryItems[currentId]) {
            // Setting id for new entry (auto-increment)
            setValues({ ...initializeFieldsValues, id: (currentMaxId + 1).toString() });
        } else {
            setValues(inventoryItems[currentId]);
        }
    }, [currentId, inventoryItems]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addorEditItems(values);
        setValues({ ...initializeFieldsValues, id: (maxId + 1).toString() }); // Reset id for next new entry
        navigate('/homeadmin');
    };

    return (
        <div className="form-group">
            <Header email={email} handleSignOut={handleSignOut} />
            <h1>Report Changes</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="products"
                    placeholder="Enter the product"
                    value={values.products}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="id"
                    placeholder="Enter the Id of the product"
                    value={values.id}
                    onChange={handleChange}
                    disabled // Disable manual editing of ID
                    required
                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="Enter the quantity"
                    value={values.quantity}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Enter the description"
                    value={values.description}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="picture"
                    placeholder="Enter the image url"
                    value={values.picture}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default InventoryAdmin;
