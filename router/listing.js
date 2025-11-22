const express = require('express');
const router = express.Router();
const wrapAsync = require("../utilis/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require('./middleware.js');
const listings = require("../controllers/listings.js"); 
const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });



router
.route('/')
.get( wrapAsync(listings.index))
.post(isLoggedIn, upload.single("listing[image]"),validateListing,wrapAsync(listings.createLis));


router.get('/new', isLoggedIn, wrapAsync(listings.newListing));

router
.route('/:id')
.get(wrapAsync(listings.renderLis))
.put( isLoggedIn,upload.single("listing[image]"), validateListing, isOwner, wrapAsync(listings.updateLis))
.delete( isLoggedIn, isOwner, wrapAsync(listings.destroyLis))


router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listings.editLis));

module.exports = router;
