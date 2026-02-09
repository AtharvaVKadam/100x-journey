const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

// In-Memory Database
let ADMINS = [];
let USERS = [];
let COURSES = [];

// Secrets
const ADMIN_SECRET = "ADMIN_SECRET_123";
const USER_SECRET = "USER_SECRET_123";

// ---------------------------------------------------
// 1. MIDDLEWARES
// ---------------------------------------------------

const adminAuthentication = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).json({ msg: "No token sent" });

    try {
        const decoded = jwt.verify(token, ADMIN_SECRET);
        req.user = decoded; // Attach admin info to request
        next();
    } catch (e) {
        res.status(403).json({ msg: "Invalid token" });
    }
};

const userAuthentication = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).json({ msg: "No token sent" });

    try {
        const decoded = jwt.verify(token, USER_SECRET);
        req.user = decoded; // Attach user info (username) to request
        next();
    } catch (e) {
        res.status(403).json({ msg: "Invalid token" });
    }
};

// ---------------------------------------------------
// 2. ADMIN ROUTES
// ---------------------------------------------------

// Admin Signup
app.post('/admin/signup', (req, res) => {
    const { username, password } = req.body;
    const admin = ADMINS.find(a => a.username === username);

    if (admin) {
        res.status(403).json({ message: "Admin already exists" });
    } else {
        ADMINS.push({ username, password });
        const token = jwt.sign({ username, role: 'admin' }, ADMIN_SECRET);
        res.json({ message: "Admin created successfully", token });
    }
});

// Admin Login
app.post('/admin/login', (req, res) => {
    const { username, password } = req.headers;
    const admin = ADMINS.find(a => a.username === username && a.password === password);
    
    if (admin) {
        const token = jwt.sign({ username, role: 'admin' }, ADMIN_SECRET);
        res.json({ message: "Logged in successfully", token });
    } else {
        res.status(403).json({ message: "Invalid credentials" });
    }
});

// Create Course (Protected)
app.post('/admin/courses', adminAuthentication, (req, res) => {
    const course = req.body;
    course.id = Date.now(); // Unique ID
    COURSES.push(course);
    res.json({ message: 'Course created successfully', courseId: course.id });
});

// Edit Course (Protected)
app.put('/admin/courses/:courseId', adminAuthentication, (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const course = COURSES.find(c => c.id === courseId);
    
    if (course) {
        Object.assign(course, req.body); // Update properties
        res.json({ message: 'Course updated successfully' });
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

// ---------------------------------------------------
// 3. USER ROUTES
// ---------------------------------------------------

// User Signup
app.post('/users/signup', (req, res) => {
    const { username, password } = req.body;
    const user = USERS.find(u => u.username === username);

    if (user) {
        res.status(403).json({ message: "User already exists" });
    } else {
        // Create user with an empty shopping bag
        USERS.push({ 
            username, 
            password, 
            purchasedCourses: [] 
        });
        const token = jwt.sign({ username, role: 'user' }, USER_SECRET);
        res.json({ message: "User created successfully", token });
    }
});

// User Login
app.post('/users/login', (req, res) => {
    const { username, password } = req.headers;
    const user = USERS.find(u => u.username === username && u.password === password);
    
    if (user) {
        const token = jwt.sign({ username, role: 'user' }, USER_SECRET);
        res.json({ message: "Logged in successfully", token });
    } else {
        res.status(403).json({ message: "Invalid credentials" });
    }
});

// List All Courses (Public)
app.get('/users/courses', userAuthentication, (req, res) => {
    // Filter out logic to list available courses (removed purchaseCourses if you want to keep them separate)
    res.json({ courses: COURSES }); 
});

// Buy Course (Protected)
app.post('/users/courses/:courseId', userAuthentication, (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const course = COURSES.find(c => c.id === courseId);
    
    if (course) {
        const user = USERS.find(u => u.username === req.user.username);
        if (user) {
            user.purchasedCourses.push(courseId); // Add ID to user's list
            res.json({ message: 'Course purchased successfully' });
        } else {
            res.status(403).json({ message: 'User not found' });
        }
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

// View Purchased Courses (Protected)
app.get('/users/purchasedCourses', userAuthentication, (req, res) => {
    const user = USERS.find(u => u.username === req.user.username);
    
    if (user) {
        // Filter the main COURSES array to find matches
        const purchasedCourses = COURSES.filter(c => user.purchasedCourses.includes(c.id));
        res.json({ purchasedCourses });
    } else {
        res.status(403).json({ message: 'User not found' });
    }
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});