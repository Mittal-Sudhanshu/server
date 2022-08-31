const asyncHandler = require("express-async-handler");
const Question = require('../models/Question')
const cloudinary = require('../utils/cloudinary')


const createQuestion = asyncHandler(async (req, res) => {
    const { heading, description, category} = req.body
    var questions

    var image=req?.files?.image!=null?req.files.image:''
    // console.log(image)
    if (!heading || !description || !category) {
        res.status(400).send("Fields cannot be empty")
        return
    }

    try {
        if (image!='') {
            const result = await cloudinary.uploader.upload(image.tempFilePath, {
                folder: "questionImage"
            })
        
                questions = await Question.create({
                    heading,
                    description,
                    category,
                    user: req.user,
                    image: result.url
                })
                res.status(200).json(questions)
            }
        else {
            const questions = await Question.create({
                heading,
                description,
                category,
                user: req.user,
                image
            })
            res.status(200).json(questions)
        }


    } catch (error) {
        res.status(400).json("Some error occurred")
        console.log(error)
    }

})

const allQuestions = asyncHandler(async (req, res) => {
    const key = req.query.search ?
        {
            $or: [
                { heading: { $regex: req.query.search, $options: "i" } },
                { description: { $regex: req.query.search, $options: "i" } },
            ],
        }
        : {}

    const quest = await Question.find(key).find({ user: { $ne: req.user.id } }).populate("user")
    res.status(200).send(quest)
})

const getYourQuestion = asyncHandler(async (req, res) => {
    const personalQuest = await Question.find({ user: { _id: req.user._id } }).populate("user")
    res.status(200).json(personalQuest)
})

const getCategoryQuest = asyncHandler(async (req, res) => {
    const category = req.params.category
    const categoryQuest = await Question.find({ category: category, user: { $ne: req.user.id } }).populate("user")
    res.status(200).json(categoryQuest)
})

module.exports = { createQuestion, allQuestions, getYourQuestion, getCategoryQuest }