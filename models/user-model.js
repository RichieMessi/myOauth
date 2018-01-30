const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    user_id: String,
    thumbnail: String
})

const User = mongoose.model('user', userSchema)

module.exports = User