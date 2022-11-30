const router = require('express').Router();
const {
    getRoutes,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,   
} = require('../../controllers/thought-controller')

router.route('/').get(getRoutes).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction);
