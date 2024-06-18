import './App.css';
import './Components/Style.css'
import React, {useState} from 'react';
import Header from './Components/Header';
import SignIn from './Components/SignIn';

function App() {

  const [email,setEmail] = useState("maina");
  return (
    <div className="App">
      <Header email={email}/>
      <SignIn/>

    </div>

    
  );
}

export default App;
