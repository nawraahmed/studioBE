const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)
const APP_SECRET = process.env.APP_SECRET

const hashPassword = async (password) => {
  // Accepts a password from the request body
  let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
  // Creates a hashed password and encrypts it 12 times
  return hashedPassword
}

const comparePassword = async (password, storedPassword) => {
  // Compares the two passwords for a match
  let passwordMatch = await bcrypt.compare(password, storedPassword)

  // Returns true if the passwords match
  // Returns false if the passwords are not a match
  return passwordMatch
}

const createToken = (payload) => {
  console.log("APP_SECRET during token creation:", process.env.APP_SECRET) // Debugging log
  return jwt.sign(payload, process.env.APP_SECRET, { expiresIn: "1h" })
}

const stripToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1]
    // Gets the token from the request headers {authorization: Bearer Some-Token}
    // Splits the value of the authorization header
    if (token) {
      res.locals.token = token
      // If the token exists we add it to the request lifecycle state
      return next()
    }
    res.status(401).send({ status: "Error", msg: "Unauthorized" })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: "Error", msg: "Strip Token Error!" })
  }
}

const verifyToken = (req, res, next) => {
  console.log("APP_SECRET during verification:", process.env.APP_SECRET) // Debugging log
  const { token } = res.locals
  try {
    const payload = jwt.verify(token, process.env.APP_SECRET)
    res.locals.payload = payload
    next()
  } catch (error) {
    console.error("Verify Token Error:", error)
    res.status(401).send({ status: "Error", msg: "Invalid token signature" })
  }
}

module.exports = {
  hashPassword,
  comparePassword,
  createToken,
  stripToken,
  verifyToken,
}
