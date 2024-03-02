import './App.css';
import CustomerTable from './components/customertabel';
import React, { useState, useEffect } from 'react';

function App() {

  //Customers Data 
  const [customers, setCustomers] = useState([]);

  const API_URL = 'http://localhost:3001/getcustomerdetails'
  //API Call For Customers Data
  useEffect(() => {

    // Fetch customer data from the API
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error('Error fetching customer data:', error));

  }, []);

  console.log("Customers Data:",customers)

  return (
    //Customers Table UI
    <CustomerTable customers={customers} />
  );
}

export default App;
