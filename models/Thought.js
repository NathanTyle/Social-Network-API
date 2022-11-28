const { Schema, model } = require('mongoose');
const reactionSchema =require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLenght: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    }
)

// username (The user that created this thought)

// String
// Required
// reactions (These are like replies)

// Array of nested documents created with the reactionSchema
// Schema Settings

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

module.exports = Thought;