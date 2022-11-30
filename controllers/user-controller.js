const {User, Thought} = require('../models');

module.exports = {
    getUser(req, res) {
        User.find()
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-_V')
        .then((user) =>
        !user
        ?res.status(404).json({'Sorry but there is no User with this ID'})
        :res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    
}