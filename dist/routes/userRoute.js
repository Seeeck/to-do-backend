"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const userRoute = express.Router();
userRoute.get('/', (req, res) => {
    res.send('Birds home page');
});
userRoute.get('/about', (req, res) => {
    res.send('About birds');
});
module.exports = userRoute;
