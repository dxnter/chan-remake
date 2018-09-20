const Thread = require('../models/thread.model');
const Reply = require('../models/reply.model');

class ReplyController {
  createReply(req, res) {
    return Reply.create(
      {
        thread_id: req.body.thread_id,
        text: req.body.text,
        delete_password: req.body.delete_password
      },
      (err, reply) => {
        if (err) {
          return res.json(err);
        }
        Thread.findOne({ board: req.body.thread_id }, (err, thread) => {
          if (err) console.log(err);
          thread.replies.push(reply);
        });
        return res.json(reply);
      }
    );
  }
}

module.exports = new ReplyController();
