import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeUser from './Components/HomeUser';
import { ref, onValue, push, update, remove } from 'firebase/database';
import { database } from "./firebase";
import InventoryUser from './Components/InventoryUser';
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import UserManagement from "./Components/UserManagement";
import InventoryAdmin from "./Components/InventoryAdmin";
import HomeAdmin from "./Components/HomeAdmin";
import Home from "./Components/Home";

function App() {
  const [inventoryItems, setInventoryItems] = useState({});
  const [currentId, setCurrentId] = useState("");
  const [email, setEmail] = useState("");

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

  const setUserEmail = (userEmail) => {
    setEmail(userEmail);
  };

 

  const addorEditItems = (obj) => {
    if (!obj.id) {
      // If obj does not have an id, generate a new one.
      const newItemRef = push(ref(database, 'Inventory'));
      update(newItemRef, obj)
        .then(() => {
          console.log("data added");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // If obj has an id, update the existing item.
      update(ref(database, 'Inventory/' + obj.id), obj)
        .then(() => {
          console.log("data updated");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setCurrentId("");
  };

  const onEdit = (id, updatedItem) => {
    if (updatedItem) {
      update(ref(database, 'Inventory/' + id), updatedItem)
        .then(() => {
          console.log("data updated");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setCurrentId(id);
    }
  };

  const onDelete = id => {
    if (window.confirm("Are you sure you want to delete?")) {
      remove(ref(database, 'Inventory/' + id))
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
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                inventoryItems={inventoryItems}
                onDelete={onDelete}
                onEdit={onEdit}
                email={email}
              />
            }
          />
          <Route 
            path="/homeuser" 
            element={
              <HomeUser
                inventoryItems={inventoryItems}
                onDelete={onDelete}
                onEdit={onEdit}
                email={email}
              />
            } 
          />
          <Route
            path="/homeadmin"
            element={
              <HomeAdmin
                inventoryItems={inventoryItems}
                onDelete={onDelete}
                onEdit={onEdit}
                email={email}
              />
            }
          />
          <Route 
            path="/inventoryuser" 
            element={
              <InventoryUser
                addorEditItems={addorEditItems}
                currentId={currentId}
                inventoryItems={inventoryItems}
                email={email}
              /> 
             } 
             />
            
            <Route
            path="/InventoryAdmin"
            element={
              <InventoryAdmin
                addorEditItems={addorEditItems}
                currentId={currentId}
                inventoryItems={inventoryItems}
                email={email}
              />
            } 

          />
          <Route 
            path="/signup" 
            element={
              <SignUp setUserEmail={setUserEmail} />
            } 
          />
          <Route
            path="/signin"
            element={
              <SignIn setUserEmail={setUserEmail} />
            }
          />
             <Route
            path="/usermanagement"
            element={
              <UserManagement setUserEmail={setUserEmail} />
            }
          />
         
        </Routes>
      </Router>      
    </div>
  );
}

export default App;
