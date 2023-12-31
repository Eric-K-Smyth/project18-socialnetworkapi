// Importing requirements
const router = require('express').Router();
const thoughtController = require('../../controllers/thought-controller');
// All of the Operations in thought-controller.js
router.get('/:thoughtId', thoughtController.getThoughtById);
router.get('/', thoughtController.getAllThoughts);

router.post('/', thoughtController.createThought);

router.put('/:thoughtId', thoughtController.updateThought);

router.delete('/:thoughtId', thoughtController.deleteThought);

module.exports = router;
