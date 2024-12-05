const mongoose = require('mongoose')

const { model, Schema, Types } = mongoose

const orgSchema = new Schema({
    organization_name: { type: String, required: true, unique: true },
    admin: { type: Types.ObjectId, required: true, ref: 'User' },
    created_at: { type: Date, default: Date.now }, 
    updated_at: { type: Date, default: Date.now },
})

const orgModel = model('organization', orgSchema)

module.exports = {
    orgModel
}