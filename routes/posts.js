const express = require("express");
const Posts = require("../schemas/post"); // schema- post.js 모델 가져오기
const router = express.Router(); // Router 객체 생성



// 게시글 작성 API (+현지시간 필요)
router.post ("/posts", async (req, res) => {
    const createdAt = new Date();
    let date = createdAt.toLocaleDateString();

    const { user, title, content, password } = req.body;
    console.log({ user, title, content, password });

    const writePost = await Posts.create(
        {
            user,
            password,
            title,
            content,
            date,
        }
    );

    res.json({ msg: "게시물을 작성했습니다."});
})

// 게시글 전체 조회 API (+내림차순 정렬 필요)
router.get("/posts", async (req, res, next) => {
    const schema = await Posts.find();

    res.json({
        schema,
    })
  });

// 게시글 상세 조회 API
router.get("/posts/:_id", async (req, res) => {
  const { _id } = req.params;
  const detail = await Posts.findOne({ _id });

  res.json({ detail });
});

// 게시글 삭제 API
router.delete("/posts/:_id", async (req, res) => {
  const { _id } = req.params;
  const { password } = req.body;
  const originPassword = await Posts.find({ password });


  if (password === String(originPassword[0].password)) {
    await Posts.deleteOne({ _id });
    return res.json({ message: "게시글을 삭제하였습니다." });
  }
  return res.json({ message: "비밀번호가 다릅니다." }); 
});

// 게시글 수정 API
router.put("/posts/:_id", async (req, res) => {
  const { _id } = req.params;
  const { password, title, content } = req.body;
  const originPassword = await Posts.find({ password });

  if (password === String(originPassword[0].password)) {
    await Posts.findOneAndUpdate({ _id }, { title, content });
    
    return res.json({ message: "게시글을 수정하였습니다." });
  }
  
});

module.exports = router;