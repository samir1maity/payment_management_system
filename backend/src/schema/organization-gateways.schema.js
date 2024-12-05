const mongoose = require('mongoose')

const { model, Schema, Types } = mongoose

const orgGatewaysSchema = new Schema({
    organization_id: { type: Types.ObjectId, required: true, ref: 'Organization' }, //Foreign Key to Organizations
    gateway_id: { type: Types.ObjectId, required: true, ref: 'Gateway' }, //Foreign Key to PaymentGateways
    key: { type: String, required: true, unique: true },
    secret: { type: String, required: true, unique: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
})

const orgGatewaysModel = model('organizations_gateway', orgGatewaysSchema)

module.exports = {
    orgGatewaysModel
}