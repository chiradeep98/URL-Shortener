const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },

    redirectUrl: {
        type: String,
    },

    visitHistory: [
        {
            timestamp: {type: Number},
        },
    ],
});

const urlModel = mongoose.model('urlmodels', urlSchema);

module.exports = urlModel;