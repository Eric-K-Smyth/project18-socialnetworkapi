// Importing requirements
const router = require('express').Router();
const reactionController = require('../../controllers/reaction-controller');


// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/thoughts/:thoughtId/reactions/:reactionId', reactionController.deleteReaction);
// POST to create a reaction stored in a single thought's reactions array field
router.post('/thoughts/:thoughtId/reactions', reactionController.createReaction);



module.exports = router;
