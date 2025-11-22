if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));
const ExpressError= require("./utilis/ExpressError.js")
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const User = require('./Models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const db_URL= process.env.ATLASDB_URL;

// Mongo connection
let mongoConnected = false;

main().then(() => {
    console.log('Connected to MongoDB');
    mongoConnected = true;
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

async function main(){
    await mongoose.connect(db_URL);
}

// Create session store after DB connection
const store = MongoStore.create({
    mongoUrl: db_URL,
    touchAfter: 24*60*60
});


store.on("error", (e) => {
    console.log("SESSION STORE ERROR", e);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET ,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7
    }
};

app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
});

const listingRoutes = require('./router/listing.js');
const reviewRoutes = require('./router/review.js');
const signupRoutes = require('./router/signup.js');
app.use('/listings', listingRoutes);
app.use('/listings/:id/reviews', reviewRoutes);
app.use('/', signupRoutes);





// app.get ('/', (req, res) => {
//     res.send('Server Working');
// });
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});


app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
     res.status(statusCode).render('listing/err', { statusCode, message });
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
