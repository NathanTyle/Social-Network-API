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
        :User.deleteMany({ _id: { $in: user.thought}})
        )
        .then(() => res.json({ message: 'User has been deleted'}))
        .catch((err) => res.status(500).json(err));
    }

    // AS A social media startup
    // I WANT an API for my social network that uses a NoSQL database
    // SO THAT my website can handle large amounts of unstructured data
    // Acceptance Criteria
    // GIVEN a social network API
    // WHEN I enter the command to invoke the application
    // THEN my server is started and the Mongoose models are synced to the MongoDB database
    // WHEN I open API GET routes in Insomnia for users and thoughts
    // THEN the data for each of these routes is displayed in a formatted JSON
    // WHEN I test API POST, PUT, and DELETE routes in Insomnia
    // THEN I am able to successfully create, update, and delete users and thoughts in my database
    // WHEN I test API POST and DELETE routes in Insomnia
    // THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
}