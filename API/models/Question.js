const mongoose = require("mongoose")
const slugify = require("slugify")
const Schema = mongoose.Schema


const QuestionSchema = new Schema({
    title : {
        type:String,
        required: [true,"Please Provide a Title"],
        minlength: [10,"Please Provide a Title at Least 10 Characters"],
        unique: true
    },
    content : {
        type:String,
        required: [true,"Please Provide a Content"],
        minlength: [10,"Please Provide a Content at Least 10 Characters"],
    },
    slug : String,
    createdAt: {
        type:Date,
        default:Date.now
    },
    user : {
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    },
    likeCount: {
        type: Number,
        default:0
    },
    likes : [
        {
            type:mongoose.Schema.ObjectId,
            ref:"User"
        }
    ],
    answerCount: {
        type: Number,
        default:0
    },
    answers : [
        {
            type:mongoose.Schema.ObjectId,
            ref:"Answer"
        }
    ]
})

// QuestionSchema Methods

QuestionSchema.pre("save", function(next){
    if(!this.isModified("title")) {
        next()
    }
    this.slug = this.makeSlug()
    next()
})

QuestionSchema.methods.makeSlug = function(){
    return slugify(this.title, {
        replacement: '-',  
        remove: /[*+~.()'"!:@]/g,
        lower: true,
        strict: false,
      })
}

module.exports = mongoose.model("Question",QuestionSchema)