const {User, Thought} = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-_V')
        .then((user) =>
        !user
        ?res.status(404).json({ message: 'Sorry but there is no User with this ID'})
        :res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    }, 

    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { $set: req.body },
            { runValidators: true, new: true}
        )
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'Sorry but there is no User with this ID'})
        :res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId})
        .then((user) =>
        !user
        ?res.status(404).json({ message: 'Sorry but there is no User with this ID'})
        :Thought.deleteMany({ _id: { $in: user.thought}})
        )
        .then(() => res.json({ message: 'User has been deleted'}))
        .catch((err) => res.status(500).json(err));
    },

    createFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: {friends: params.friendId}},
            { runValidators: true, new: true}
        )
        .then((user) =>
        !user
        ?res.status(404).json({ message: 'Sorry but there is no Friend with this ID'})
        : res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    deleteFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId},
            { $pull: { friends: { friendId: body.friendId}}},
            { runValidators: true, new: true }
        )
        .then(user => 
            !user
            ?res.status(404).json({ message: 'Sorry but there is no Friend with this ID'})
            : res.json(user))
            .catch((err) => res.status(500).json(err));
    }
};