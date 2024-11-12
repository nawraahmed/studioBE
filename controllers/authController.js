const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const middleware = require("../middlewares")
const { OAuth2Client } = require("google-auth-library")
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID) // Ensure GOOGLE_CLIENT_ID is set in .env

exports.register = async (req, res) => {
  try {
    // Extracts the necessary fields from the request body
    const { email, password, name } = req.body
    // Hashes the provided password
    let passwordDigest = await middleware.hashPassword(password)
    // Checks if there has already been a user registered with that email
    let existingUser = await User.findOne({ email })
    if (existingUser) {
      return res
        .status(400)
        .send("A user with that email has already been registered!")
    } else {
      // Creates a new user
      const user = await User.create({ name, email, password: passwordDigest })
      // Sends the user as a response
      res.send(user)
    }
  } catch (error) {
    throw error
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).send({ status: "Error", msg: "User not found" })
    }

    // Compares the provided password with the stored password
    const matched = await middleware.comparePassword(password, user.password)
    if (matched) {
      const payload = { id: user._id, email: user.email, role: user.role }
      const token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    } else {
      return res.status(401).send({ status: "Error", msg: "Unauthorized" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send("An error occurred during login.")
  }
}

async function verifyGoogleCredential(credential) {
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  })
  const payload = ticket.getPayload()
  return payload // Contains user info, such as email, name, etc.
}

exports.verifyGoogleToken = async (req, res) => {
  try {
    const { credential } = req.body // Receiving credential from frontend
    const userData = await verifyGoogleCredential(credential)

    if (userData) {
      const token = jwt.sign({ id: userData.email }, process.env.APP_SECRET, {
        expiresIn: "1h",
      })
      res.json({ token, user: userData })
    } else {
      res.status(401).json({ error: "Invalid token" })
    }
  } catch (error) {
    console.error("Error verifying Google token:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

exports.googleAuth = (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.APP_PASSWORD, {
    expiresIn: "1h",
  })
  res.json({ token }) // This should send a token as JSON to confirm success
}

exports.CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}
