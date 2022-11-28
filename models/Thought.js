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
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thoughts = model('Thoughts', thoughtSchema);

// Array of nested documents created with the reactionSchema
// Schema Settings

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

module.exports = Thoughts;