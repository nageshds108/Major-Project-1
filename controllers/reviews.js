const Listings = require('../Models/model.js');
const Reviews = require('../Models/reviews.js');

module.exports.createReview=async (req, res) => {
    const listing = await Listings.findById(req.params.id);
    const review = new Reviews(req.body.review);
    listing.reviews.push(review);
    review.author = req.user._id;
    await review.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
}
module.exports.destroyReview=async (req, res) => {
    const { id, reviewId } = req.params;
    await Listings.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Reviews.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}
