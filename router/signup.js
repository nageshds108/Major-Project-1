const express = require('express');
const router = express.Router();
const wrapAsync = require('../utilis/wrapAsync');
const passport = require('passport');
const { saveURL } = require('./middleware.js');
const users = require('../controllers/users.js');



router
.route("/signup")
.get(users.renderSignup)
.post( wrapAsync(users.signupUser));


router
.route('/login')
.get(users.renderLogin )
.post( saveURL,
    passport.authenticate('local', { failureFlash: true, 
    failureRedirect: '/login' }),users.Login );


router.get('/logout',users.logoutUser );

module.exports = router;
