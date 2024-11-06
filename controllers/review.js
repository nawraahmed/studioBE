const Review = require("../models/Review")
const Service = require("../models/Service")

const reviewController = {
  createReview: async (req, res) => {
    try {
      const { project, user, comment, rating } = req.body
      const newReview = new Review({
        project,
        user,
        comment,
        rating,
      })
      console.log(req.body)
      await newReview.save()
      return res
        .status(201)
        .json({ message: "Review created successfully", review: newReview })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "Server error" })
    }
  },

  getReviews: async (req, res) => {
    try {
      const reviews = await Review.find()
      if (reviews.length === 0) {
        return res.status(404).json({ message: "No reviews found" })
      }
      return res.status(200).json(reviews)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "Server error" })
    }
  },

  getReviewById: async (req, res) => {
    const id = req.params.id
    try {
      const review = await Review.findById(id)
      if (!review) {
        return res.status(404).json({ message: "Review not found" })
      }
      return res.status(200).json(review)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "Server error" })
    }
  },

  deleteReview: async (req, res) => {
    const id = req.params.id
    try {
      const review = await Review.findByIdAndDelete(id)
      if (!review) {
        return res.status(404).json({ message: "Review not found" })
      }
      return res.status(200).json({
        message: `review ${review.name} deleted sucessfully`,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "Server error" })
    }
  },
}
module.exports = reviewController
