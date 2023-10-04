const router = require('express').Router();
const thoughtController = require('../../controllers/thought-controller');

router.get('/:thoughtId', thoughtController.getThoughtById);
router.get('/', thoughtController.getAllThoughts);

router.post('/', thoughtController.createThought);

router.put('/:thoughtId', thoughtController.updateThought);

router.delete('/:thoughtId', thoughtController.deleteThought);

module.exports = router;
