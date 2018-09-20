const mongoose = require('mongoose');
const Thread = require('../models/thread.model');

class ThreadController {
  fetchRecent(req, res) {
    return Thread.find()
      .sort({ _id: -1 })
      .limit(10)
      .populate('reply')
      .then(threads => {
        res.send(threads);
      });
  }

  create(req, res) {
    Thread.create(req.body, (err, thread) => {
      if (err) {
        return res.json(err);
      }
      return res.json(thread);
    });
  }
}

module.exports = new ThreadController();
