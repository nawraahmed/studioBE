const express = require("express")
const router = express.Router()
const reviewController = require("../controllers/review")

router.post("/createReview", reviewController.createReview)
router.get("/reviews", reviewController.getReviews)
router.get("/reviews/:id", reviewController.getReviewById)
router.delete("/reviews/:id", reviewController.deleteReview)

module.exports = router
