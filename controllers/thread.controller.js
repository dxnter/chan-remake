const mongoose = require('mongoose');
const Thread = require('../models/thread.model');

class ThreadController {
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
