const asyncHandler = require("express-async-handler");
const Solution = require("../models/Solution");
const Question = require("../models/Question")
const cloudinary = require('../utils/cloudinary')
const createSolution = asyncHandler(async (req, res) => {
    const { questionId, solution, count } = req.body

    var image=req?.files?.image!=null?req.files.image:''

    if (!questionId || !solution) {
        console.log("UserId param not sent with request");
        return res.status(400).send("Some error occurred");
    }

    const quest = await Question.findById(questionId)
    console.log(quest);
    try {
        if (image!='') {
            const result = await cloudinary.uploader.upload(image.tempFilePath, {
                folder: "solutionImage"
            })
            const sol = await Solution.create({
                solution,
                count,
                question: quest,
                sender: req.user,
                image: result.url
            })
            res.status(200).json(sol)
        }
        else {
            const sol = await Solution.create({
                solution,
                count,
                question: quest,
                sender: req.user,
                image
            })
            res.status(200).json(sol)
        }
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})
const getSolution = asyncHandler(async (req, res) => {
    const questionId = req.params.id
    if (!questionId) {
        console.log("UserId param not sent with request");
        return res.status(400).send("Some error occurred");
    }
    // const quest = await Question.findById(questionId)
    const quest = await Question.findById(questionId)

    try {
        const solFound = await Solution.find({ question: { _id: questionId } })
            .populate("question")
            .populate("sender", "-password")
            .populate("question.user")
        res.status(200).json(solFound)
    } catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})
module.exports = { createSolution, getSolution }