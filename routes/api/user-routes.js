// Importing requirements
const router = require('express').Router();
const userController = require('../../controllers/user-controller');
// All of the Operations in user-controller.js
router.get('/:userId', userController.getUserById);
router.get('/', userController.getAllUsers);

router.post('/:userId/friends/:friendId', userController.addFriend);
router.post('/', userController.createUser);

router.put('/:userId', userController.updateUser);

router.delete('/:userId', userController.deleteUser);
router.delete('/:userId/friends/:friendId', userController.removeFriend);

module.exports = router;