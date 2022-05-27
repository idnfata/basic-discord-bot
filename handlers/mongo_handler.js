const mongoose = require("mongoose")
const config = require('../config.json');
const mongoDBURL = `${config.MONGODBURL}`
console.log(mongoDBURL)

module.exports = () => {

    if (!mongoDBURL) return

    mongoose.connect(mongoDBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(console.log("Connected to MongoDB Database!"))
}