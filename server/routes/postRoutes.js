const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');

router.post('/posts', auth, postController.createPost);
router.get('/posts', auth, postController.getPosts);
router.delete('/posts/:id', auth, postController.deletePost);

module.exports = router;
