const { Thought, User } = require('../models');

const thoughtController = {
  getAllThoughts: async (req, res) => { //Get all thoughts
    try {
      const thoughts = await Thought.find().populate('reactions');
      res.json(thoughts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getThoughtById: async (req, res) => { //Get a thought by a specific ID
    try {
      const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createThought: async (req, res) => { //Create a thought 
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { username: thought.username },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      res.json(thought);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateThought: async (req, res) => { //Update a thought
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteThought: async (req, res) => { //Delete a thought
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      await User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: thought._id } }
      );

      await Reaction.deleteMany({ thoughtId: thought._id });

      res.json(thought);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = thoughtController;
