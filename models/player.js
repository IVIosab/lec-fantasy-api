const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    days: {
        type: [Number],
        required: true
    },
    scores: {
        type: [Number],
        required: true
    },
    items: {
        type: [[Number]],
        required: true
    }
})

module.exports = mongoose.model('player', playerSchema)