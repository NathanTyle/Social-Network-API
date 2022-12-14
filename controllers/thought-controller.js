const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-_V')
        .then((thought) =>
        !thought
        ?res.status(404).json({ message: 'Sorry but there is no Thought with this ID'})
        :res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $set: req.body },
            { runValidators: true, new: true}
        )
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'Sorry but there is no Thought with this ID'})
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId})
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'Sorry but there is no Thought with this ID'})
        : User.deleteMany({ _id: { $in: thought.user}})
        )
        .then(() => res.json({ message: 'thought has been deleted'}))
        .catch((err) => res.status(500).json(err));
    },

    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body }},
            {runValidators: true, new: true}
        )
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'Sorry but there is no Reaction with this ID'})
        : res.json(thought))
        .catch((err) => res.status(500).json(err));
    },

    deleteReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: body.reactionId }}},
            { runValidators: true, new: true }
        )
        .then(thought =>
            !thought
            ? res.status(404).json({ message: 'Sorry but there is no Reaction with this ID'})
            : res.json(thought))
            .catch((err) => res.status(500).json(err));
    }
};
