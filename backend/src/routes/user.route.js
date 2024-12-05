const { Router } = require('express')
const { userModel } = require('../schema/user.schema')
const bcypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userRouter = Router()

userRouter.post('/signin', async function (req, res) {
    console.log('flow reached here')
    try {
        const { username, password } = req.body

        if (!username || !password) {
            res.status(401).json({
                error: true,
                success: false,
                message: "inputs are wrong"
            })
            return
        }

        const user = await userModel.findOne({
            username
        })

        console.log('first', user.password)

        const isMatch = await bcypt.compare(password, user.password)

        console.log('isMatch', isMatch)

        if (!isMatch) {
            res.status(404).json({
                error: true,
                success: false,
                message: "password is wrong"
            })
            return
        }

        const token = jwt.sign({ id: user._id }, process.env.USER_JWT_SECRET)
        console.log('token', token)

        res.status(201).json({
            success: true,
            error: false,
            jwt: token
        })

    } catch (error) {
        console.log('error in signin route', error)
    }
})

userRouter.post('/signup', async function (req, res) {

    try {
        const { username, password, firstName, lastName } = req.body

        if (!username || !password) {
            res.status(401).json({
                error: true,
                success: false,
                message: "inputs are wrong"
            })
            return
        }

        const hashedPassword = await bcypt.hash(password, 10)

        const data = await userModel.create({
            username,
            password: hashedPassword,
            firstName,
            lastName
        })

        res.status(201).json({
            success: true,
            error: false,
            data
        })
    } catch (error) {
        console.log('error in signup route', error)
    }
})

module.exports = {
    userRouter
}

