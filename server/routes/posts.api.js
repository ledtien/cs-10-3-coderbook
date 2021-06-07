const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authentication");
const postsController = require("../controllers/posts.controller");

router.post("/", authMiddleware.loginRequired, postsController.create);
router.post(
  "/:id/comments",
  authMiddleware.loginRequired,
  postsController.createComment
);
router.put(
  "/:id/comments/:id",
  authMiddleware.loginRequired,
  postsController.updateComment
);

router.delete(
  "/:id/comments/:id",
  authMiddleware.loginRequired,
  postsController.destroyComment
);
router.post(
  "/:id/reactions",
  authMiddleware.loginRequired,
  postsController.createReaction
);
router.get("/:id", postsController.read);
router.put("/:id", postsController.update);
router.delete("/:id", postsController.destroy);
router.get("/", postsController.getHomPagePosts);

module.exports = router;
