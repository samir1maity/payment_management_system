const mongoose = require('mongoose')

const { model, Schema } = mongoose

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    token: { type: String, unique: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
})

const userModel = model('user', userSchema)

module.exports = {
    userModel
}