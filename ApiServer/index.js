require('dotenv').config()
const express = require('express');
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 3000;
const cors = require('cors')
const route = require('./Route/index.js');
const db = require('./config/db')
app.use(morgan('combined'));
app.use(express.urlencoded());
app.use(express.json())
app.use(cors())
db.connect();
route(app)


app.listen(port, () => {
  console.log(`Example app listening on port localhost:${port}`)
})