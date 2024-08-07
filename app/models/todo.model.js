"use strict"
/* ------------------------------------------- *
    EXPRESS - TODO Project with Sequelize
---------------------------------------------- */
// SEQUELIZE: 
// npm i sequelize sqlite3

const { Sequelize, DataTypes, where} = require('sequelize')

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

// EXPORTS:
module.exports = Todo