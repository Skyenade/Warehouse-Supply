import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import { ref, onValue, push, update, remove } from 'firebase/database';
import { database } from "./Components/Firebase";
import InventoryUser from './Components/InventoryUser';



function App() {

  const [inventoryItems, setInventoryItems] = useState({});
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    const ItemsRef = ref(database, 'Inventory');
    onValue(ItemsRef, (snapshot) => {
      if (snapshot.exists()) {
        setInventoryItems(snapshot.val());
      } else {
        setInventoryItems({});
      }
    });
  }, []);

  const addorEditItems = (obj) => {
    if (currentId === "") {
      const newItemRef = push(ref(database, 'Inventory'));
      update(newItemRef, obj)
        .then(() => {
          console.log("data added");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      update(ref(database, 'inventory/' + currentId), obj)
        .then(() => {
          console.log("data updated");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setCurrentId("");
  };

  const onEdit = id => {
    setCurrentId(id);
  };

  const onDelete = id => {
    if (window.confirm("Are you sure you want to delete?")) {
      remove(ref(database, 'inventory/' + id))
        .then(() => {
          console.log("data deleted");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };




  return (
    <div className="App">
      <InventoryUser
        addorEditItems={addorEditItems}
        currentId={currentId}
        setCurrentId={setCurrentId}
        inventoryItems={inventoryItems}
      />
      <Home
        inventoryItems={inventoryItems}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>

    
  );
}

export default App;
