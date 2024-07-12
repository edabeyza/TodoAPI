// "use strict"
// /* ------------------------------------------- *
//     EXPRESS - TODO Project with Sequelize
// ---------------------------------------------- */

// // ROUTES:

// const router = require('express').Router()

// const Todo  = require('../models/todo.model')

// // LIST TODOS:

// router.get('/', async (req, res) => {

//     const data = await Todo.findAndCountAll()
//     res.status(200).send({
//         error: false,
//         result: data,
//     })
// })

// // CRUD: Create, Read, Update, Delete

// // CREATE TODO:
// router.post('/', async (req, res) => {
    
//     const receivedData = req.body // Data from client
//     // console.log(receivedData)

//     // const data = await Todo.create({
//     //     title: receivedData.title,
//     //     description: receivedData.description,
//     //     priority: receivedData.priority,
//     //     isDone: receivedData.isDone,
//     // })
//     // console.log(data)

//     const data = await Todo.create(req.body)
//     // console.log(data)

//     res.status(201).send({
//         error: false,
//         result: data.dataValues,
//     })
// })

// // READ TODO:
// router.get('/:id', async (req, res) => {
    
//         // const data = await Todo.findOne({where:   { id: req.params.id }})
//         const data = await Todo.findByPk(req.params.id)

//         res.status(200).send({
//             error: false,
//             result: data,
//         })
// })

// // UPDATE TODO:
// router.put('/:id', async (req, res) => {
    
//     // const data = await Todo.update({ ...newData }, { ...filter} )
//     const data = await Todo.update(req.body, { where: { id: req.params.id } })

//     res.status(202).send({
//         error: false,
//         result: data,
//         message: (data[0]>=1 ? 'Updated.' : 'Not Updated.'),
//         new: await Todo.findByPk(req.params.id) // Güncelleniş datayı gönder.
//     })
//     console.log(data)
// })

// // DELETE TODO:
// router.delete('/:id', async (req, res) => {
    
//     // const data = await Todo.destroy({ ...filter })
//     const data = await Todo.destroy({ where: { id: req.params.id } })
//     // console.log(data)

//     // res.status(204).send({
//     //     error: false,
//     //     result: data,
//     //     message: (data>=1 ? 'Deleted.' : 'Not Deleted.'),
//     // })

//     if(data >= 1) {

//         // Sadece status code çıktısı verir.
//         res.sendStatus(204)

//     } else {

//         // res.status(404).send({
//         //     error: false,
//         //     result: data,
//         //     message: 'Not Deleted.',
//         // })

//         // send to ErrorHandler:
//         res.errorStatusCode = 404
//         throw new Error('Not Deleted.') 
// 7

//     }
// })

// module.exports = router
