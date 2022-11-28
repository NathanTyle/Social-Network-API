const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: []
        },
    }
)

// thoughts

// Array of _id values referencing the Thought model

// friends

// Array of _id values referencing the User model (self-reference)

// Schema Settings

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
module.exports = User;