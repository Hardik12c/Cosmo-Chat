require('dotenv').config()
const connectToMongo = require('./db');
const express = require('express');
const auth = require('./routes/auth');
var cors = require('cors');

connectToMongo();

const app = express();
const port = 5000;

app.use(cors())
app.use(express.json());

// Available Routes
app.use('/api/auth',auth);

app.listen(port, () => {
  console.log(`Shoppers Club backend listening on port ${port}`)
})
