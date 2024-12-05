const mongoose = require('mongoose')

const { model, Schema, Types } = mongoose

const api_status = ['active', 'revoked']

const apiKeySchema = new Schema({
    api_key: { type: String, required: true, unique: true },
    organization_id: { type: Types.ObjectId, required: true, ref: 'Organization' }, //Foreign Key
    created_at: { type: Date, default: Date.now }, 
    updated_at: { type: Date, default: Date.now },
    status: { type: String, enum: api_status, required: true }
})

const orgModel = model('api_key', apiKeySchema)

module.exports = {
    orgModel
}