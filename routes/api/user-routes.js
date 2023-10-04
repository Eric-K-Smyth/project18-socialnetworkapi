console.log('Reached user-routes.js');

const router = require('express').Router();
const userController = require('../../controllers/user-controller');

router.get('/users', userController.getAllUsers);
router.get('/users/:userId', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);
router.post('/users/:userId/friends/:friendId', userController.addFriend);
router.delete('/users/:userId/friends/:friendId', userController.removeFriend);

module.exports = router;