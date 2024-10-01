const mongoose = require("mongoose")
const Question = require("./Question")
const Schema = mongoose.Schema


const AnswerSchema = new Schema({
    content: {
        type:String,
        required: [true,"Please Provide a Content"],
        minlength: [10,"Please Provide a Content at Least 10 Characters"],
    },
    createdAt: {
        type:Date,
        default:Date.now
    },
    likes : [
        {
            type:mongoose.Schema.ObjectId,
            ref:"User"
        }
    ],
    user : {
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    },
    question : {
        type:mongoose.Schema.ObjectId,
        ref:"Question",
        required:true
    }
})

// AnswerSchema Methods

AnswerSchema.pre("save",async function(next){
    if(!this.isModified("user")) return next()

    try {
        const question = await Question.findById(this.question)
        question.answers.push(this._id)
        question.answerCount = question.answers.length
        await question.save()
        next()
    } catch(err) {
        return next(err)
    }

})

module.exports = mongoose.model("Answer",AnswerSchema)