const { Router } = require('express')
const authMiddleware = require('../middlewares/auth.middleware')

const orgGatewaysRouter = Router()

orgGatewaysRouter.post('/', authMiddleware, createOrgGateways)
orgGatewaysRouter.put('/:id',authMiddleware,  updateOrgGateways)
orgGatewaysRouter.get('/:id',authMiddleware,  getOrgGateways)

module.exports = {
    orgGatewaysRouter
}