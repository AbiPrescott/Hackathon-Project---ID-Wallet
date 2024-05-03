import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Popup from './popup.js';
import Main from './createWallet';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='createWallet' element="Main"/>
        </Routes>
      </BrowserRouter>
      <Popup/>
      <p>hello world</p>
    </div>


  );
}

export default App;
