const express = require("express")
const dotenv = require("dotenv")
const connectDatabase = require("./helpers/database/connectDatabase")
const routers = require("./routers")
const customErrorHandler = require("./middlewares/errors/customErrorHandler")
const path = require("path")


const app = express()

// Express - Body Middleware
app.use(express.json())



// Environment Variables
dotenv.config({
    path : "./config/env/config.env"
})

// MongoDB Connection
connectDatabase()

// Setting PORT
const PORT = process.env.PORT

// Routers
app.use("/api",routers)
// Error Handler
app.use(customErrorHandler)


// Static Files
app.use(express.static(path.join(__dirname,"public")))


app.listen(PORT, () => {
    console.log(`App Started on ${PORT} : ${process.env.NODE_ENV}`)
})

