const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter a email'],
        unique: true,
        lowercase: true,
    },
    mobile: {
        type: Number,
        required: [true, 'Please enter a mobile'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: 8,
    },
    name: {
        type: String,
        minlength: 3
    },
    address: {
        type: String,
        minlength: 4
    },
    phoneNumber: {
        type: Number
    },
        addedDate: {
        type: Date
    },
    updatedDate: {
        type: Date
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const userModel = mongoose.model('userModel', userSchema, 'user')
const validateUser = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().min(5).max(500).required(),
        password: Joi.string().min(8).max(1024).required(),
        mobile: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        name: Joi.string().min(3).max(500),
        address: Joi.string().min(4).max(500),
        phoneNumber: Joi.string(),
        addedDate : Joi.date(),
        updatedDate : Joi.date(),
        isDeleted : Joi.boolean().default(false)
    });
    return schema.validate(user)
}

module.exports = {
    userModel,
    validateUser,
}
