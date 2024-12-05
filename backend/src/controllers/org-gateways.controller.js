const { create, update } = require('../services/org.services')
//create
const createOrg = async (req, res) => {
    console.log('flow reached here')
    try {
        req.body.userId = req.userId
        const response = await create(req.body)
        return res.status(201).json({
            success: true,
            data: response,
            message: 'A org successfully created',
            error: {}
        })
    } catch (error) {
        console.log('error occurs at org controller layer', error)
        return res.status(500).json({
            data: {},
            success: false,
            error: {},
            message: 'Not able to create an org'
        })
    }
}

//update
const updateOrg = async (req, res) => {
    try {
        const data = {id : req.params.id , organization_name: req.body.organization_name }
        const response = await update(data)
        return res.status(201).json({
            success: true,
            data: response,
            message: 'A org successfully updated',
            error: {}
        })
    } catch (error) {
        console.log('error occurs at org controller', error)
        return res.status(500).json({
            data: {},
            success: false,
            error: {},
            message: 'Not able to update an org'
        })
    }
}

//get

module.exports = { createOrg, updateOrg };