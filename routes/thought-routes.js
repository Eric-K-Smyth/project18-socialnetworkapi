const router = require('express').Router();
const { Thought, User, Reaction } = require('../models'); // Import Thought, User, and Reaction models

// 1. GET all thoughts
router.get('/thoughts', async (req, res) => {
  try {
    const thoughts = await Thought.find().populate('reactions');
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. GET a single thought by its _id
router.get('/thoughts/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. POST to create a new thought
router.post('/thoughts', async (req, res) => {
  try {
    const thought = await Thought.create(req.body);

    // Push the thought's _id to the associated user's thoughts array
    const user = await User.findOneAndUpdate(
      { username: thought.username },
      { $push: { thoughts: thought._id } },
      { new: true }
    );

    res.json(thought);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. PUT to update a thought by its _id
router.put('/thoughts/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. DELETE to remove a thought by its _id
router.delete('/thoughts/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    // Remove the thought's _id from the associated user's thoughts array
    await User.findOneAndUpdate(
      { username: thought.username },
      { $pull: { thoughts: thought._id } }
    );

    // BONUS: Delete reactions associated with the deleted thought
    await Reaction.deleteMany({ thoughtId: thought._id });

    res.json(thought);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
