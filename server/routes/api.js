const express = require('express')
const router = express.Router()

//Middleware
const { protect } = require('../app/middleware/AuthMiddleware')

const { contactList, contactGetById, contactCreate, contactUpdate, contactDelete } = require('../app/Controllers/ContactController')
const { register, login, authUser } = require('../app/Controllers/AuthController')

//Auth apis
router.post('/register', register)
router.post('/login', login)
router.get('/authUser', protect, authUser)

//Contact apis
router.get('/contactList', protect, contactList)

router.get('/contactGetById/:id', protect, contactGetById)

router.post('/contactCreate', protect, contactCreate)

router.put('/contactUpdate/:id', protect, contactUpdate)

router.delete('/contactDelete/:id', protect, contactDelete)

module.exports = router