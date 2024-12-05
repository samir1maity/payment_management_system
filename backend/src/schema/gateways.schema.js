const mongoose = require('mongoose')

const { model, Schema, Types } = mongoose

const gatewaysSchema = new Schema({
    gateway_name: { type: String, required: true, unique: true },
    description: { type: String }, // Optional: A brief about the gateway
}, { timestamps: true })

const gatewaysModel = model('gateway', gatewaysSchema)

module.exports = {
    gatewaysModel
}