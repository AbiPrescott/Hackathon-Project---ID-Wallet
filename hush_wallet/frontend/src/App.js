import logo from './logo.svg';
import './App.css';
import Index from './index';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import CreateWallet from './pages/createWallet';
import Popup from './pages/popup';
import ImportWallet from './pages/importWallet';

function App() {
  const [message, setMessage] = useState("");

  useEffect (() => {
    fetch('http://localhost:8000/')
    .then((res) => res.json())
    .then((data) => setMessage(data.message));
  }, []);


  return (
    <div className='app'>
      <h1>{message}</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Popup/>}/>
          <Route path="/createWallet" element={<CreateWallet />}/>
          <Route path="/importWallet" element={<ImportWallet/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
