"use strict"
/* ------------------------------------------- *
    EXPRESS - TODO Project with Sequelize
---------------------------------------------- */

const express = require('express'); // express'i çağırdık
const app = express(); // express'i çalıştırıp app'e atadık

require('dotenv').config(); // .env dosyasını okumak için
const PORT = process.env.PORT || 8000; // port numarasını okumak için

/* ------------------------------------------- */
// Accept json data convert to object:
app.use(express.json()); // json veri kabul etmek için 

// app.all('/', (req, res) => {
//     res.send('WELCOME TO TODO API')
// })

// Async errors to ErrorHandler:
require('express-async-errors')
/* ------------------------------------------- */
//MODELS:
// Model controller'da kullanılacağı için orada tanımlanmalıdır.
// const Todo  = require('./app/models/todo.model')
/* ------------------------------------------- */
app.use(require('./app/routes/todo.router'))
/* ------------------------------------------- */
/* ------------------------------------------- */
/* ------------------------------------------- */

// ERROR HANDLER:
app.use(require('./app/middlewares/errorHandler'))
/* ------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
