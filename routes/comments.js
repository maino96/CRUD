const express = require("express");
const Comments = require("../schemas/comment");
const router = express.Router(); // Router 객체 생성



// 댓글 작성 API + 현지시간 필요
router.post ("/:_id", async (req, res) => {
   try{
     const createdAt = new Date();
    // const date = createdAt.toLocaleDateString();
    const { _Id } = req.params; // req.params_postId 구조분해할당한 형태

    const { user, content, password } = req.body;
    console.log({ user, content, password });

    const writePost = await Comments.create(
        {
          _Id,
            user,
            password,
            content,
            createdAt,
        }
    );

    res.json({ msg: "댓글을 작성했습니다."});
      }
      catch(error){ // catch가 에러를 받는다.
        console.log(error)
      res.status(400).send({'message': "댓글 작성하기 error"})}
})


// 댓글 전체 조회 API (+내림차순 정렬 필요)
router.get("/:_id", async (req, res, next) => {
    const comments = await Comments.find().sort("-createdAt");

    res.json({
        comments,
    })
  });

// 댓글 상세 조회 API
router.get("/:_id", async (req, res) => {
    const { _id } = req.params;
    const detail = await Comments.findOne({ _id });
  
    res.json({ detail });
  });
  

// 댓글 삭제 API
router.delete("/:_id", async (req, res) => {
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
  router.put("/:_id", async (req, res) => {
    const { _id } = req.params;
    const { password, title, content } = req.body;
    const originPassword = await Comments.findOne({ password });
  if (originPassword){
    await Comments.updateOne({ _id }, { title, content });
  }
  else {   
      return res.json({ message: "댓글을 수정하였습니다." });
    };

    return res.json({ message: "댓글을 수정하였습니다." });

  });
  



module.exports = router;