import React, { useState, useEffect } from "react";
import Header from "./Header";

const initializeFieldsValues = {
    products: "",
    id: "",
    quantity: ""
};
const InventoryUser = ({ addorEditItems, currentId, inventoryItems,email, handleSignOut  }) => {   

    const [values, setValues] = useState(initializeFieldsValues);

    useEffect(() => {
        if (currentId === "" || !inventoryItems[currentId]) {
            setValues(initializeFieldsValues);
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
        setValues(initializeFieldsValues);
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
                    type="number"
                    name="id"
                    placeholder="Enter the Id of the product"
                    value={values.id}
                    onChange={handleChange}
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default InventoryUser;
