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
// SEQUELIZE: 
// npm i sequelize sqlite3

const { Sequelize, DataTypes} = require('sequelize')

// Connection Object:
const sequelize = new Sequelize('sqlite:' + (process.env.SQLITE || '.db.sqlite3')) 

// Sequelize Model:
// Her bir model, veritabanındaki bir tabloya karşılık gelir.
// sequelize.define('table_name', { ...columns })
const Todo = sequelize.define('todos', {
    
    // ID sütunun belirtmeye gerek yoktur. Sequelize, her tablo için otomatik olarak bir ID sütunu oluşturur.
    // id: {
    //     type: DataTypes.INTEGER, // Data type // sütun veri tipi
    //     allowNull: false, // default: true // sütun verisi boş olablir mi?
    //     unique: true, // default: false // benzersiz kayıt mı?
    //     // comment: 'yorum ekleyebiliriz',
    //     // primaryKey: true, // default: false // tabonun her bir kaydını ifade eden benzersiz numara.
    //     // autoIncrement: true, // default: false // Sütun değeri her bir kayıtta otomatik olarak +1 artsın mı?
    //     // field: 'custom_field_name', // default: undefined // sütunun veritabanındaki adı
    //     defaultValue: 0, // default: undefined // Kayıt eklendiğinde default olarak ne yazılsın?
    // },

    
    title: {
        type: DataTypes.STRING(256), // varchar(256)
        allowNull: false, // default: true
    },

    description: DataTypes.TEXT, // ShortHand 

    priority: { // 1: High, 0: Normal, -1: Low 
        type: DataTypes.TINYINT, // default: true
        allowNull: false,
        defaultValue: 0,
    },

    isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },

    // createdAt ve updatedAt sütunları, her tablo için otomatik olarak oluşturulur. Tanımlamaya gerek yoktur.

})

    // Syncronization:
    // Modelleri veritabanına uygula:
    // sequelize.sync() // CREATE TABLE // Sadece tablo yeni oluşturulacaksa kullanılır.
    // sequelize.sync({ force: true }) // DROP TABLE & CREATE TABLE // Tablo varsa silip tekrar oluşturur.
    // sequelize.sync({ alter: true }) // TO BACKUP DATA & DROP TABLE & CREATE TABLE // Data kaybetmeden tabloyu günceller.

    // Sequelize bir kez çalıştıktan sonra yoruma alınmalı.

    // Connect yo DB:
    sequelize.authenticate()
        .then(() => console.log('* DB Connected. *'))
        .catch(() => console.log('* DB Not Connected: *'))

/* ------------------------------------------- */
// ROUTES:

const router = express.Router()

// LIST TODOS:

router.get('/', async (req, res) => {

    const data = await Todo.findAndCountAll()
    res.status(200).send({
        error: false,
        result: data,
    })
})

// CRUD: Create, Read, Update, Delete

// CREATE TODO:
router.post('/', async (req, res) => {
    
    const receivedData = req.body // Data from client
    // console.log(receivedData)

    // const data = await Todo.create({
    //     title: receivedData.title,
    //     description: receivedData.description,
    //     priority: receivedData.priority,
    //     isDone: receivedData.isDone,
    // })
    // console.log(data)

    const data = await Todo.create(req.body)
    // console.log(data)

    res.status(201).send({
        error: false,
        result: data.dataValues,
    })
})

app.use(router)
/* ------------------------------------------- */
/* ------------------------------------------- */
/* ------------------------------------------- */

const errorHandler = (err, req, res, next) => {
    const errorStatusCode = res.errorStatusCode ?? 500
    console.log('ErrorHandler worked.')
    res.status(errorStatusCode).send({
        error: true, // special data
        message: err.message, // error string message
        cause: err.cause, // error option cause
        // stack: err.stack // error details
    })
}
app.use(errorHandler)
/* ------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
