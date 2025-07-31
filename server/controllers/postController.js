const mdb = require('../models');
const { status, messages, common } = require('../utils');

// Create Post
exports.createPost = async (req, res) => {
  try {

    await mdb.Post.create({ 
      title : req.body.title , 
      content : req.body.content, 
      tags : req.body.tags, 
      username : req.user.username });

    return res.status(status.OK).json({ message: messages.post_create });
  } catch (err) {
    return common.throwException(err, 'Create Post', req, res);
  }
};

// Get All Posts
exports.getPosts = async (req, res) => {
  try {
    const { search, page = 1 } = req.query;
    const limit = 5;
    const skip = (page - 1) * limit;

    let filter = { deletedAt: null };

    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [{ title: regex }, { tags: regex }];
    }

    const posts = await mdb.Post.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await mdb.Post.countDocuments(filter);

    return res.status(status.OK).json({
      data: posts,
      pagination: {
        total,
        page: parseInt(page),
        perPage: limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    return common.throwException(err, 'Get Posts', req, res);
  }
};

// Delete Post
exports.deletePost = async (req, res) => {
  try {
     const post = await mdb.Post.findOne({
            _id: req.params.id,
            deletedAt: null,
      });

      if (!post) {
          return res.status(status.NotFound).json({ message: messages.post_not_found });
      }

      post.deletedAt = new Date();
      post.status = false
      await post.save();

    return res.status(status.OK).json({ message:messages.post_delete });
  } catch (err) {
    return common.throwException(err, 'Delete Post', req, res);
  }
};
