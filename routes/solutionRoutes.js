const express = require("express");
const { createSolution, getSolution } = require("../controllers/solutionController");
// const { createQuestion, allQuestions } = require("../controllers/questionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect,createSolution)
router.route("/:id").get(protect,getSolution);

module.exports = router