const asyncHandler = require('express-async-handler')

const Contact = require('../models/Contact')
const User = require('../models/User')


const contactList = asyncHandler(
    async (req, res) => {
        // const contactList = await Contact.find()
        const contactList = await Contact.find({ user: req.user.id })

        res.status(200).json(contactList)
    }
)

const contactGetById = asyncHandler(
    async (req, res) => {
        const contact = await Contact.findById(req.params.id)

        if(!contact) {
            res.status(400)
            throw new Error('Contact not found')
        }

        const user = await User.findById(req.user.id)
        if(!user){
            res.status(404)
            throw new Error('User not found')
        }

        if(contact.user.toString() !== user.id){
            res.status(401)
            throw new Error('You are not authorized')
        }

        res.status(200).json(contact)
    }
)

const contactCreate = asyncHandler(
    async (req, res) => {
        const { name, email, mobile } = req.body

        if (!name || !email || !mobile) {
            res.status(400)
            throw new Error('Please fill all fields')
        }
        const contact = await Contact.create({
            user: req.user.id,
            name: name,
            email: email,
            mobile: mobile
        })

        res.status(201).json({
            message:'Contact created successfully',
            contact: contact
        })
    }
)

const contactUpdate = asyncHandler(
    async (req, res) => {
        const contact = await Contact.findById(req.params.id)

        if(!contact) {
            res.status(400)
            throw new Error('Contact not found')
        }
        
        const user = await User.findById(req.user.id)
        if(!user){
            res.status(401)
            throw new Error('User not found')
        }

        if(contact.user.toString() !== user.id){
            res.status(401)
            throw new Error('You are not authorized')
        }

        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new:true})
        
        res.status(200).json({
            message:'Contact updated successfully',
            contact:updatedContact
        })
    }
)

const contactDelete = asyncHandler(
    async (req, res) => {
        const contact = await Contact.findById(req.params.id)
        
        if(!contact) {
            res.status(400)
            throw new Error('Contact not found')
        }

        const user = await User.findById(req.user.id)
        if(!user){
            res.status(401)
            throw new Error('User not found')
        }

        if(contact.user.toString() !== user.id){
            res.status(401)
            throw new Error('You are not authorized')
        }

        await contact.remove()
        
        res.status(200).json({
            message:'Contact deleted successfully'
        })
    }
)

module.exports = {
    contactList,
    contactGetById,
    contactCreate,
    contactUpdate,
    contactDelete
}