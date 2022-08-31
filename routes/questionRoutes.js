const express = require("express");
const { createQuestion, allQuestions, getYourQuestion, getCategoryQuest } = require("../controllers/questionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect,createQuestion ).get(protect,allQuestions);
router.route('/yourquestion').get(protect,getYourQuestion)
router.route('/:category').get(protect,getCategoryQuest)
module.exports = router
