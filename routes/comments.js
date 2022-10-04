const express = require("express");
const Comments = require("../schemas/comment");
const router = express.Router(); // Router 객체 생성

// 댓글 작성 API + 현지시간 필요
router.post ("/comments", async (req, res) => {
    const createdAt = new Date();
    let date = createdAt.toLocaleDateString();

    const { user, content, password } = req.body;
    console.log({ user, content, password });

    const writePost = await Comments.create(
        {
            user,
            password,
            content,
            date,
        }
    );

    res.json({ msg: "댓글을 작성했습니다."});
})


// 댓글 전체 조회 API (+내림차순 정렬 필요)
router.get("/comments", async (req, res, next) => {
    const schema = await Comments.find();

    res.json({
        schema,
    })
  });

// 댓글 상세 조회 API
router.get("/comments/:_id", async (req, res) => {
    const { _id } = req.params;
    const detail = await Comments.findOne({ _id });
  
    res.json({ detail });
  });
  

// 댓글 삭제 API
router.delete("/comments/:_id", async (req, res) => {
    const { _id } = req.params;
    const { password } = req.body;
    const originPassword = await Comments.find({ password });
  
  
    if (password === String(originPassword[0].password)) {
      await Comments.deleteOne({ _id });
      return res.json({ message: "댓글을 삭제하였습니다." });
    }
    return res.json({ message: "비밀번호가 다릅니다." }); 
  });
  
  // 댓글 수정 API
  router.put("/comments/:_id", async (req, res) => {
    const { _id } = req.params;
    const { password, title, content } = req.body;
    const originPassword = await Comments.find({ password });
  
    if (password === String(originPassword[0].password)) {
      await Comments.findOneAndUpdate({ _id }, { title, content });
      
      return res.json({ message: "댓글을 수정하였습니다." });
    }
    
  });
  



module.exports = router;