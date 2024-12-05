const { gatewaysModel } = require('../schema/gateways.schema')

const create = async (data) => {
    try {
        console.log('data', data)
        //TODO: validate data
        const { gateway_name, description } = data

        const response = await gatewaysModel.create({
            gateway_name,
            description
        })

        return response;

    } catch (error) {
        console.log('error occurs at gateways services', error)
    }
}

const update = async (data) => {
    try {
        //TODO: validate data
        const { id, gateway_name, description } = data

        const updatedGatewayDetails = await gatewaysModel.findByIdAndUpdate(
            id, // The ID of the document to update
            { gateway_name, description  }, // The fields to update
            { new: true } // Options: `new: true` returns the updated document
        );
        return updatedGatewayDetails

    } catch (error) {
        console.log('error occurs at org services', error)
    }
}

const get = async (id) => {

}

module.exports = { create, update };