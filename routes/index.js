const express = require("express");
const router = express.Router();
const postsRouter = require("./posts");
const commentsRouter = require("./comments");



router.use("/", postsRouter);
router.use("/", commentsRouter);


module.exports = router;