const { Router } = require('express')
const { createOrg, updateOrg } = require('../controllers/org.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const orgRouter = Router()

orgRouter.post('/', authMiddleware, createOrg)
orgRouter.put('/:id',authMiddleware,  updateOrg)

module.exports = {
    orgRouter
}