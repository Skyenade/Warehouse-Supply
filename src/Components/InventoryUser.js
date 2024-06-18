import React, { useState, useEffect } from "react";


const InventoryUser = ({ addorEditItems, currentId, ItemsObjects = {} }) => {

    const initializeFieldsValues = {
        products: "",
        id: "",
        quantity: ""
    }

    const [values, setValues] = useState(initializeFieldsValues);


    useEffect(() => {
        if (currentId === "" || !ItemsObjects[currentId]) {
            setValues(initializeFieldsValues);
        } else {
            setValues(ItemsObjects[currentId]);
        }
    }, [currentId, ItemsObjects]);

    const handleChange = (event) => {
        const { name, value } = event.target
        setValues({
            ...values, [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addorEditItems(values);
        setValues(initializeFieldsValues);
    }

return(
    <div>
        <h1>Report Changes</h1>
        <form onSubmit={handleSubmit}>
            <input type="text"
                name="product"
                placeholder="Enter the product"
                value={values.products}
                onChange={handleChange}
                required
            />
            <input type="number"
                name="id"
                placeholder="Enter the Id of the product"
                value={values.id}
                onChange={handleChange}
                required
            />

            <input type="number"
                name="quantity"
                placeholder="Enter the quantity"
                value={values.quantity}
                onChange={handleChange}
                required           />
             <button type="submit">Submit</button>
        </form>
    </div>
)
}

export default InventoryUser;