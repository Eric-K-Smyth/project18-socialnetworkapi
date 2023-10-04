const router = require('express').Router();
const { Thought, User } = require('../../models');

// 1. GET all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. GET a single user by its _id
router.get('/users/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. POST a new user
router.post('/users', async (req, res) => {
  try {
    console.log('POST new user route accessed');
    console.log('Request body:', req.body);

    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// 4. PUT to update a user by its _id
router.put('/users/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. DELETE to remove user by its _id
router.delete('/users/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // BONUS: Remove a user's associated thoughts when deleted
    await Thought.deleteMany({ username: user.username });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. POST to add a new friend to a user's friend list
router.post('/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure the friendId is not already in the user's friends list
    if (!user.friends.includes(req.params.friendId)) {
      user.friends.push(req.params.friendId);
      await user.save();
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7. DELETE to remove a friend from a user's friend list
router.delete('/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Filter out the friendId from the user's friends list
    user.friends = user.friends.filter((friend) => friend.toString() !== req.params.friendId);
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
