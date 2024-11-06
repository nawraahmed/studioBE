//Load Dep
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")

//require and initalize dotenv
require("dotenv").config()

//PORT conf
const PORT = process.env.PORT

//Initalize express
const app = express()
app.use(express.json())

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, "public")))

//Database Configuration
const db = require("./config/db")

// routes
const packageRoute = require("./routes/package")
const projectRoute = require("./routes/projectRouter")

// Mount routes
app.use("/package", packageRoute)
app.use("/projects", projectRoute)

//listen on port
app.listen(PORT, () => console.log(`running on port: ${PORT}`))
