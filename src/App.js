import React from 'react';
import Forms from './form';
import axios from 'axios';
import { useState,useEffect } from 'react';
import './App.css'

const App = () => {
  const [connectionCount, setConnectionCount] = useState(0);
  useEffect(() => {
    logFrontendConnection();
  }, []);

  const logFrontendConnection = () => {
    axios.post('http://localhost:5000/api/connection', { connectionCount: 1 })
      .then((response) => {
        console.log(response.data.message);
        setConnectionCount((prevCount) => prevCount + 1);
      })
      .catch((error) => {
        console.error('Error logging frontend connection:', error);
      });
  };

  return (

    <div className="app">
      <h1>Glass Morphism Form</h1>
      <h1>Frontend Connection Count: {connectionCount}</h1>
      <Forms/>
    </div>
  );
};

export default App;