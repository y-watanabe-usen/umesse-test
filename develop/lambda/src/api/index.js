const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    res.json({message:'root'})
})

// auth
const authRouter = require('./auth')
router.use('/auth',authRouter)

// TODO: auth用のmiddleware必要

// token
const tokenRouter = require('./token')
router.use('/token',tokenRouter)
//素材
const materialRouter = require('./material')
router.use('/material',materialRouter)
//project
const projectRouter = require('./project')
router.use('/project',projectRouter)
//CM生成
const cmRouter = require('./cm')
router.use('/cm',cmRouter)

module.exports = router