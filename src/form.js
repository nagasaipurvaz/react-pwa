import React, { useEffect,useState} from 'react';
import './form.css';
import axios from 'axios';

const Forms = () => {
    const [inputString, setInputString] = useState('');
  const [savedInput, setSavedInput] = useState(null);

  useEffect(()=>{
    fetchConnectionCount();
  },[]);
  
  const fetchConnectionCount = () =>{
    axios.post('http://localhost:5000/api/log-frontend-connection')
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error('Error logging frontend connection:', error);
      });
  }



  const handleInputChange = (event) => {
    setInputString(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputString.trim() === '') {
      return;
    }

    axios.post('http://localhost:5000/api/input', { inputString })
      .then((response) => {
        setSavedInput(response.data);
        setInputString('');
      })
      .catch((error) => console.error('Error saving input:', error));
  };

 
  return (
    <div>
    <form className="glass-morphism-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputString}
        onChange={handleInputChange}
        className="glass-morphism-input"
        placeholder="Enter your text..."
      />
      <button type="submit" className="glass-morphism-button">
        Submit
      </button>
    </form>

    {savedInput && (
        <div>
          <h2>Input Saved:</h2>
          <p>{savedInput.inputString}</p>
          <p>Created At: {new Date(savedInput.createdAt).toLocaleString()}</p>
        </div>
      )}


      </div>
  );
};

export default Forms;