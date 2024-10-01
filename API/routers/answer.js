const express = require("express")
const {getAccessToRoute,getAnswerOwnerAccess} = require("../middlewares/authorization/auth")
const {addNewAnswerToQuestion, 
       getAllAnswersByQuestion,
       getSingleAnswer,
       editAnswer,
       deleteAnswer,
       likeAnswer,
       undoLikeAnswer} = require("../controllers/answer")

const {checkQuestionAnswerExist} = require("../middlewares/database/databaseErrorHelpers")


// Üst route'larda oluşturulan param'sın alt route'larda kullanılabilmesini sağlar.
const router = express.Router({mergeParams:true})



router.get("/", getAllAnswersByQuestion)
router.post("/",getAccessToRoute,addNewAnswerToQuestion)
router.get("/:answer_id", checkQuestionAnswerExist,getSingleAnswer)
router.put("/:answer_id/edit",[checkQuestionAnswerExist,getAccessToRoute,getAnswerOwnerAccess],editAnswer)
router.delete("/:answer_id/delete",[checkQuestionAnswerExist,getAccessToRoute,getAnswerOwnerAccess],deleteAnswer)
router.get("/:answer_id/like", [checkQuestionAnswerExist,getAccessToRoute],likeAnswer)
router.get("/:answer_id/undo_like", [checkQuestionAnswerExist,getAccessToRoute],undoLikeAnswer)



module.exports = router