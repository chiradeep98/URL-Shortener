const mongoose = require('mongoose');
const express = require('express');
const { nanoid } = require('nanoid');
const urlModel = require('../models/model');

const router = express.Router();

router.post('/', async (req, res) => {
    const url = req.body.url;
    if(!url){
        return res.status(400).json({status: 'Failed, URL is required'});
    }
    const shortId = nanoid(8);
    await urlModel.create({
        shortId: shortId,
        redirectUrl: url,
        visitHistory: [],
    })

    const allUrls = await urlModel.find({});
    res.render('home', {
        id: shortId,
        urls: allUrls,
    });

});

router.get('/:shortId', async(req, res) => {
    const shortId = req.params.shortId;
    const result = await urlModel.findOneAndUpdate({
        shortId
    },{
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            }
        }
    });
    return res.redirect(result.redirectUrl);

});


router.get('/analytics/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await urlModel.findOne({shortId});
    res.json({'No of Clicks': entry.visitHistory.length});
})




module.exports = {router};