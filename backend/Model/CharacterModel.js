const mongoose = require('mongoose')
const { Schema } = mongoose

const charSchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true
    },
    gender: String,
    img: String,
    powers: [String],
})

const Characters = mongoose.model('Characters', charSchema)

module.exports = Characters;