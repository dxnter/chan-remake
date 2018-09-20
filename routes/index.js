const express = require('express');
const router = express.Router();

const ThreadController = require('../controllers/thread.controller');
const ReplyController = require('../controllers/reply.controller');

// POST, PUT, DELETE, Threads
router.post('/threads/:board', ThreadController.create);

router.put('/threads/:board', (req, res) => {});

router.delete('/threads/:board', (req, res) => {});

//POST, PUT, DELETE,  Replies
router.post('/replies/:board', (req, res) => {});

router.put('/replies/:board', (req, res) => {});

router.delete('/replies/:board', (req, res) => {});

module.exports = router;
