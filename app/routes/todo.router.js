"use strict"
/* ------------------------------------------- *
    EXPRESS - TODO Project with Sequelize
---------------------------------------------- */

// ROUTES:

const router = require('express').Router()

// Controller:
const todo  = require('../controllers/todo.controller')

// // LIST TODOS:
// router.get('/', todo.list)

// // CRUD: Create, Read, Update, Delete

// // CREATE TODO:
// router.post('/', todo.create)


// // READ TODO:
// router.get('/:id', todo.read)

// // UPDATE TODO:
// router.put('/:id', todo.update)

// // DELETE TODO:
// router.delete('/:id', todo.delete)

/* ------------------------------------------- */

router.route('/')
    .get(todo.list)
    .post(todo.create)

router.route('/:id')
    .get(todo.read)
    .put(todo.update)
    .delete(todo.delete)


module.exports = router
