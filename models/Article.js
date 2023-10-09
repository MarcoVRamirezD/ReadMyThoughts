const { Schema, model } = require("mongoose");

const ArticleSchema = new Schema({
    author: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        default: "default.png"
    }
});

module.exports = model("Article", ArticleSchema, "articles");