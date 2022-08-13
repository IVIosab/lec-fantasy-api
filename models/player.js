const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    days: {
        type: [String],
        required: true
    },
    scores: {
        type: [String],
        required: true
    },
    items: {
        type: [{}],
        required: true
    }
})

module.exports = mongoose.model('player', playerSchema)