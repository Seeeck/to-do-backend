import { Response } from "express"

const express = require('express')
const userRoute = express.Router()


userRoute.get('/', (req: Request, res: Response) => {
    res.send('Birds home page')
})

userRoute.get('/about', (req: Request, res: Response) => {
    res.send('About birds')
})

module.exports=userRoute;