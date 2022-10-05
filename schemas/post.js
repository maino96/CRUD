const mongoose = require("mongoose");

const postsSchema = mongoose.Schema({
        user: {
            type: String,
            required: true,
            unique: true
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        password: {
   
            type: Number && String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
 
    });

module.exports = mongoose.model("Posts", postsSchema);