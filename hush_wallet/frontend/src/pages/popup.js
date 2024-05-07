import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function Popup() {
  // const [message, setMessage] = useState("");

  // useEffect (() => {
  //   fetch('http://localhost:8000/')
  //   .then((res) => res.json())
  //   .then((data) => setMessage(data.message));
  // }, []);

  const [message, setMessage] = useState("");

  useEffect(() => {
      fetch("http://localhost:8000/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

    return (
      <div className="logo">
        <h1>hello {message}</h1>
        <h2>{data}</h2>
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
      <Link to="/createWallet">create wallet</Link>
      <p>●</p>
      <Link to="/importWallet">import wallet</Link> 
    </div>

  );
}
  
  export default Popup;
  