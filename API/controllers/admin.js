const User = require("../models/user")
const Question = require("../models/Question")
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler")

const blockUser = asyncErrorWrapper(async(req, res, next) => {
    const {id} = req.params

    const user = await User.findById(id)

    user.blocked = !user.blocked

    await user.save()


    return res
    .status(200)
    .json({
        success: true,
        message: "Block - Unblock Successful"
    })

})

const deleteUser = asyncErrorWrapper(async(req, res, next) => {
    const {id} = req.params
    await User.findByIdAndDelete(id)
    return res.status(200)
    .json({
        success: true,
        message: "Delete Operation Successful"
    })
})


module.exports = {
    blockUser,
    deleteUser
}