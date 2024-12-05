const mongoose = require('mongoose')

const { model, Schema, Types } = mongoose

const gatewaysSchema = new Schema({
    gateway_name: { type: String, required: true, unique: true },
    created_at: { type: Date, default: Date.now }, 
    updated_at: { type: Date, default: Date.now },
})

const gatewaysModel = model('gateway', gatewaysSchema)

module.exports = {
    gatewaysModel
}