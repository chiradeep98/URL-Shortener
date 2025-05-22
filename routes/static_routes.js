const express = require('express');
const urlModel = require('../models/model');

const staticRouter = express.Router();

staticRouter.get('/', async (req, res) => {
    const allUrls = await urlModel.find({});
    return res.render('home', {
        urls: allUrls,
    });
})

module.exports = {
    staticRouter
}