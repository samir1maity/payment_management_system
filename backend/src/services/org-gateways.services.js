const { orgGatewaysModel } = require('../schema/organization-gateways.schema')

const create = async (data) => {
    try {
        console.log('data', data)
        //TODO: validate data
        const { organization_id, userId } = data

        const org = await orgGatewaysModel.create({
            organization_name,
            admin: userId
        })

        return org;
    } catch (error) {
        console.log('error occurs at org services', error)
    }
}

const update = async (data) => {
    try {
        //TODO: validate data
        const { id, organization_name } = data
        console.log('id', id, 'organization_name', organization_name)


        const updatedOrgDetails = await orgGatewaysModel.findByIdAndUpdate(
            id, // The ID of the document to update
            { organization_name }, // The fields to update
            { new: true } // Options: `new: true` returns the updated document
        );
        return updatedOrgDetails

    } catch (error) {
        console.log('error occurs at org services', error)
    }
}

const get = async (id) => {

}

module.exports = { create, update };