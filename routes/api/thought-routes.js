const router = require('express').Router();
const thoughtController = require('../../controllers/thought-controller');

router.get('/thoughts', thoughtController.getAllThoughts);
router.get('/thoughts/:thoughtId', thoughtController.getThoughtById);
router.post('/thoughts', thoughtController.createThought);
router.put('/thoughts/:thoughtId', thoughtController.updateThought);
router.delete('/thoughts/:thoughtId', thoughtController.deleteThought);

module.exports = router;
