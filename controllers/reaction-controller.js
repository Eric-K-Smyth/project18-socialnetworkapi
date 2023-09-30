const { Reaction, Thought } = require('../models');

const reactionController = {
  createReaction: async (req, res) => {
    try {
      const reaction = await Reaction.create(req.body);
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: reaction._id } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteReaction: async (req, res) => {
    try {
      const reaction = await Reaction.findByIdAndDelete(req.params.reactionId);
      if (!reaction) {
        return res.status(404).json({ message: 'Reaction not found' });
      }

      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: req.params.reactionId } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(thought);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = reactionController;
