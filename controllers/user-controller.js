const { User, Thought } = require('../models');

const userController = {
  getAllUsers: async (req, res) => { //Gets all users
    try {
      const users = await User.find().populate('thoughts').populate('friends');
      users.forEach((user) => {
        user.friendCount = user.friends.length;
      }); //Shows how many friends a user has
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserById: async (req, res) => { //Gets users by id
    try {
      console.log('getUserById function called');
      const user = await User.findById(req.params.userId)
        .populate('thoughts')
        .populate('friends');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.friendCount = user.friends.length; //Shows how many friends a specific user has
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createUser: async (req, res) => { //Creates User
    console.log('createUser function called');
    try {
      console.log('Request body:', req.body); // Log the request body
      const user = await User.create(req.body);
      console.log('New user:', user); // Log the newly created user
      res.json(user);
    } catch (error) {
      console.error('Error creating user:', error); // Log any errors that occur
      res.status(500).json({ error: error.message });
    }
  },

  updateUser: async (req, res) => { //Updates a user
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteUser: async (req, res) => {
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
  },

  addFriend: async (req, res) => { //Adds a friend :)
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (!user.friends.includes(req.params.friendId)) {
        user.friends.push(req.params.friendId);
        await user.save();
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  removeFriend: async (req, res) => { // Removes a friend :(
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.friends = user.friends.filter((friend) => friend.toString() !== req.params.friendId);
      await user.save();

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = userController;
