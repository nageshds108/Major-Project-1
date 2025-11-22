const Listings = require('../Models/model.js');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const Token =  process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: Token });

module.exports.index=async (req, res) => {
    const listings = await Listings.find();
    res.render('listing/listings', { listings });
}
module.exports.newListing=async (req, res) => {
    res.render('listing/New.ejs');
}
module.exports.renderLis=async (req, res) => {
    const { id } = req.params;
    const listing = await Listings.findById(id).populate({
            path: 'reviews',          
            populate: {                
                path: 'author'         
            }}).populate('owner')
    if (!listing) {
        req.flash('error', 'Listing Does not Exist!');
        return res.redirect('/listings');
    }
    res.render('listing/show', { listing });
}
module.exports.createLis=async(req, res) => {
    let coordinates = await geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1
})
  .send()


    url=req.file.path;
    filename=req.file.filename;
    const newListing = new Listings(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image={url,filename};
    newListing.geometry=coordinates.body.features[0].geometry;
    await newListing.save();
    req.flash('success', 'New Listing Added Successfully!');
    res.redirect(`/listings/${newListing._id}`);
}
module.exports.editLis=async (req, res) => {
    const { id } = req.params;
    const listing = await Listings.findById(id);
    if (!listing) {
        req.flash('error', 'Listing Does not Exist!');
        return res.redirect('/listings');
    }
    let ImgURL = listing.image.url;
    ImgURL = ImgURL.replace("upload", "upload/h_150,w_250");
    res.render('listing/edit.ejs', { listing, ImgURL });
}
module.exports.updateLis=async (req, res) => {
    const { id } = req.params;
    const listing = await Listings.findByIdAndUpdate(id, req.body.listing, { runValidators: true, new: true });
    if(typeof req.file !== 'undefined'){
    url=req.file.path;
    filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }

    if (!listing) {
        req.flash('error', 'Listing Does not Exist!');
        return res.redirect('/listings');
    }
    req.flash('success', 'Listing Updated Successfully!');
    res.redirect(`/listings/${listing._id}`);
}
module.exports.destroyLis=async (req, res) => {
    const { id } = req.params;
    const listing = await Listings.findByIdAndDelete(id);
    if (!listing) {
        req.flash('error', 'Listing Does not Exist!');
        return res.redirect('/listings');
    }
    req.flash('success', 'Listing Deleted Successfully!');
    res.redirect('/listings');
}
