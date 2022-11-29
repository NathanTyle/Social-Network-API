const { Thought, User } = require('../models');

module.exports = {
    getRoutes(req, res) {
        Routes.find()
        .then((routes) => res.json(routes))
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
        ? res.status(404).json({ message: 'Sorry but there is no Thought with this ID'})
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
            ? res.status(404).json({ message: 'Sorry but there is no Thought with this ID'})
            : res.json(thought))
            .catch((err) => res.status(500).json(err));
    }
};

// WHEN I open API GET routes in Insomnia for users and thoughts

// THEN the data for each of these routes is displayed in a formatted JSON

// WHEN I test API POST, PUT, and DELETE routes in Insomnia

// THEN I am able to successfully create, update, and delete users and thoughts in my database

// WHEN I test API POST and DELETE routes in Insomnia

// THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list