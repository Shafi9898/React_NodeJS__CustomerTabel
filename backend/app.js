const express = require('express');
const app = express();
const cors = require("cors");
const { Client } = require('pg');

app.use(cors());

// PostgreSQL database connection configuration
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '123456',
});

// Connect to the PostgreSQL database
client.connect()
  .then(() => {
    console.log('Connected to the PostgreSQL database');
  })
  .catch(err => {
    console.error('Error connecting to the PostgreSQL database', err);
  });

// API endpoint to fetch customer details from the PostgreSQL database
app.get('/getcustomerdetails', (req, res) => {
  const query = 'SELECT * FROM customersdetails'; // Assuming your table name is "customers"
  client.query(query)
    .then(result => {
      const customers = result.rows;

      //returning customers details
      res.json(customers);
    })
    .catch(err => {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
