//Load Mongoose
const mongoose = require('mongoose')

//MongoDB Connection String
mongoose
  .connect(process.env.MongoDBURL)
  .then(() => {
    const db = mongoose.connection
    console.log(
      `MongoDB connected to Database: ${db.name} at Host: ${db.host} on PORT: ${db.port}`
    )
  })
  .catch((err) => {
    console.log('MongoDb is not connected, this is the error: ' + err)
  })
