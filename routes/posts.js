const express = require("express");
const Posts = require("../schemas/post"); // schema- post.js 모델 가져오기
const router = express.Router(); // Router 객체 생성



// 게시글 작성 API (+현지시간 필요)
router.post ("/", async (req, res) => {
  try{ 
  const createdAt = new Date();
  const date = createdAt.toLocaleDateString();

    const { user, title, content, password } = req.body;
    console.log({ user, title, content, password });

    const writePost = await Posts.create(
        {
            user,
            password,
            title,
            content,
            createdAt: Date,
        }
    );
      
    res.json({ msg: "게시물을 작성했습니다."});
      }
      catch(error){ // catch가 에러를 받는다.
      console.log(error)
    res.status(400).send({'message': "게시글 작성하기 error"})}
})

// 게시글 전체 조회 API (+내림차순 정렬 필요)
router.get("/", async (req, res, next) => {
    const posts = await Posts.find().sort("-createdAt"); // 자바스크립트 sort 공부해오기 !! 숙제

    res.json({
        posts,
    })
  });

// 게시글 상세 조회 API
router.get("/:_postId", async (req, res) => {
  const { _postId } = req.params;
  const detail = await Posts.findOne({ _postId });

  res.json({ detail });
});

// 게시글 삭제 API
router.delete("/:_postId", async (req, res) => {
  const { _postId } = req.params;
  const { password } = req.body;
  const originPassword = await Posts.find({ password });


  if (password === String(originPassword[0].password)) {
    await Posts.deleteOne({ _postId });
    return res.json({ message: "게시글을 삭제하였습니다." });
  }
  return res.json({ message: "비밀번호가 다릅니다." }); 
});

// 게시글 수정 API
router.put("/:_postId", async (req, res) => {
  const { _postId } = req.params;
  const { password, title, content } = req.body;
  const originPassword = await Posts.findOne({ _postId, password });
  if (originPassword){
    await Posts.updateOne({ _postId }, { title, content });
  } 
  else {
    return res.json({ message: "비밀번호가 일치하지 않습니다!" });
  }
    
    return res.json({ message: "게시글을 수정하였습니다." });
  
});

module.exports = router;