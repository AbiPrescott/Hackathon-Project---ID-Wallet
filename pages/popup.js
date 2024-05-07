import React from 'react';
import {Link} from 'react-router-dom';


function Popup() {
    return (
      <div className="logo">
        <Logo/>
        <Password/>
        <Options/>
      </div>
  
    );
  }
  
function Logo () {
  return (
    <>
      <img 
        src="/images/logo128.png"
        alt="logo"
      />
    </>
  )
}

function Password () {
  return (
    <input 
      type="text" 
      placeholder="Password"
    />
  );
}

function Options () {
  return (
    <div className="options">
      <Link to="createWallet">createWallet</Link>
    </div>

  );
}
  
  export default Popup;
  