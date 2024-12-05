const mongoose = require('mongoose')

const { model, Schema, Types } = mongoose

const api_status = ['active', 'revoked']

const apiKeySchema = new Schema({
    api_key: { type: String, required: true, unique: true },
    organization_id: { type: Types.ObjectId, required: true, ref: 'Organization' }, //Foreign Key
    status: { type: String, enum: api_status, default: 'active'},
    expiration: { type: Date }, // Optional: When the API key will expire
}, { timestamps: true })

const orgModel = model('api_key', apiKeySchema)

module.exports = {
    orgModel
}