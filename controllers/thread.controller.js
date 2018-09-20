const Thread = require('../models/thread.model');

class ThreadController {
  fetchRecent(req, res) {
    return Thread.find({ board: req.params.board })
      .sort({ _id: -1 })
      .limit(10)
      .populate('reply')
      .then(threads => {
        res.send(threads);
      });
  }

  createThread(req, res) {
    return Thread.create(
      {
        board: req.params.board,
        text: req.body.text,
        delete_password: req.body.delete_password
      },
      (err, thread) => {
        if (err) {
          return res.json(err);
        }
        return res.json(thread);
      }
    );
  }
}

module.exports = new ThreadController();
