const express = require('express');
const { json, urlencoded } = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');
const { tasks } = require('./routers');

const PORT = process.env.PORT ?? 5000;

const app = express();
connectDB(process.env.DATABASE_URI);

app.use(cors());
app.use(json(), urlencoded({ extended: false }));

app.use('/api/task', tasks);

app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`))