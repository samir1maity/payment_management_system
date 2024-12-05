const mongoose = require('mongoose')

const { model, Schema, Types } = mongoose

const orgSchema = new Schema({
    organization_name: { type: String, required: true, unique: true },
    admin: { type: Types.ObjectId, required: true, ref: 'User' }, // Foreign Key to User
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
},
    { timestamps: true })

const orgModel = model('organization', orgSchema)

module.exports = {
    orgModel
}