const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync= require("../utilis/wrapAsync.js")
const { validateReview ,isLoggedIn,isReviewAuthor} = require('./middleware.js');
const reviews = require("../controllers/reviews.js");



router.post('/',validateReview, isLoggedIn,wrapAsync(reviews.createReview));

router.delete('/:reviewId',isLoggedIn,isReviewAuthor, wrapAsync(reviews.destroyReview));

module.exports = router;