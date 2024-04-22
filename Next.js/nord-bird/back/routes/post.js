const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { Post, User, Image, Comment } = require("../models");
const { isLoggedIn } = require("./middlewares");

try {
  fs.accessSync("uploads");
} catch (err) {
  console.log("uploads 폴더가 없으므로 생성합니다.");
  fs.mkdirSync("uploads");
}

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User, // 댓글 작성자
              attributes: ["id", "nickname"],
            },
          ],
        },
        {
          model: User, // 게시글 작성자
          attributes: ["id", "nickname"],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id"],
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      // uploads 폴더에 이미지를 두겠다.
      done(null, "uploads");
    },
    filename(req, file, done) {
      // test.png
      const ext = path.extname(file.originalname); //확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); // test
      done(null, basename + new Date().getTime() + ext); // test151717281.png
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});
router.post(
  "/images",
  isLoggedIn,
  upload.array("image"),
  async (req, res, next) => {
    // POST post/images
    try {
      console.log(req.files);
      res.json(req.files.map((v) => v.filename));
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);
router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/:postId/like", isLoggedIn, async (req, res, next) => {
  //PATCH /post/1/like
  const post = await Post.findOne({
    where: { id: req.params.postId },
  });
  if (!post) {
    return res.status(403).send("게시글이 존재하지 않습니다.");
  }
  await post.addLikers(req.user.id);
  res.json({ postId: post.id, UserId: req.user.id });
});
router.delete("/:postId", isLoggedIn, async (req, res, next) => {
  //DELETE /post/10
  try {
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
