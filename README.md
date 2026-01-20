# TripHuts 🏡

A full-stack web application for listing and reviewing accommodations, built with Node.js, Express, and MongoDB.

---

## 📋 Overview
TripHuts is an Airbnb-inspired platform where users can create, view, edit, and delete property listings. Users can also leave reviews and ratings for properties.  
The application features user authentication, image uploads, and interactive maps for property locations.

🔗 **Live Demo:** https://major-project-1-jaro.onrender.com/

---

## ✨ Features

### User Authentication
- Secure signup and login using Passport.js  
- Session management with express-session  
- Password encryption  

### Listing Management
- Create new property listings  
- Edit existing listings (owner only)  
- Delete listings (owner only)  
- View all listings with details  
- Image upload to Cloudinary  

### Review System
- Add reviews with ratings (1–5 stars)  
- Delete reviews (author only)  
- Reviews linked to specific listings  

### Geolocation
- Interactive maps using Mapbox  
- Automatic geocoding of property locations  

### Authorization & Validation
- Middleware-based route protection  
- Server-side validation using Joi  
- Owner and author verification  

---

## 🛠️ Technologies Used

### Backend
- Node.js – Runtime environment  
- Express.js – Web application framework  
- MongoDB – Database  
- Mongoose – ODM for MongoDB  

### Authentication & Security
- Passport.js – Authentication middleware  
- passport-local – Local authentication strategy  
- express-session – Session management  
- connect-mongo – MongoDB session store  

### File Upload & Storage
- Multer – File upload handling  
- Cloudinary – Cloud-based image storage  

### Validation
- Joi – Schema validation  

### Mapping
- Mapbox SDK – Geocoding and maps  

### Templating
- EJS – Template engine  
- ejs-mate – Layout support for EJS  

---

## 🎨 Features in Detail

### Image Upload
- Images are uploaded to Cloudinary  
- Automatic image transformation for thumbnails  
- Secure storage with unique filenames  

### Flash Messages
- Success and error messages using connect-flash  
- User-friendly feedback for all operations  

### Error Handling
- Custom error class (ExpressError)  
- Centralized error handling middleware  
- User-friendly error pages  

---

## 🌐 Deployment
- This application is deployed on Render.com  
