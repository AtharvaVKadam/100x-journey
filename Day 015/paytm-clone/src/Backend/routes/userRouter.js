const express = require("express");
const z = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require("../../Database/db.js"); 
const { JWT_SECRET } = require("../config");
const router = express.Router();
const { authmiddleware } = require("../middleware.js")

router.post("/signup", async function(req,res,next){

    const signupSchema = z.object({
        username: z.string().email("Invalid email address"),
        password: z.string().min(1,"Password required"),
        firstName: z.string().min(1,"FirstName is required"),
        lastName: z.string().min(1,"LastName is required")
    })
    
    const response = signupSchema.safeParse(req.body)
    
        if (!response.success) {
            return res.status(411).json({
            message: "Invalid inputs"
        });
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken"
        })
    }   
    
    const user = await User.create({ 
        username: req.body.username, 
        password: req.body.password, 
        firstName: req.body.firstName, 
        lastName: req.body.lastName, });

    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})

router.post("/signin", async function (req,res) {
    
    const signInSchema = z.object({
        username: z.string().email("Invalid email address"),
        password: z.string().min(1,"Password required"),
    })

    const response = signInSchema.safeParse(req.body);

    if(!response.success){
        return res.status(411).json({
            mssg: "Invalid credentials"
        })
    }
    const Userfound = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if (!Userfound) {
        return res.status(411).json({
            message: "Error while logging in"
        });
    }

    const userId = Userfound._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
    
})

const updateBody = z.object({
    password: z.string().min(1,"Password required"),
    firstName: z.string().min(1,"FirstName is required"),
    lastName: z.string().min(1,"LastName is required")
});

router.put("/", authmiddleware, async (req, res ) => {
    const response = updateBody.safeParse(req.body);

    if(!response.success){
        res.status(411).json({
            mssg : "Error while updating information"
        });
    }

    await User.updateOne({ _id: req.userId }, req.body);

    res.json({
        mssg: "Updated successfully"
    })
})
    
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter,
                "$options": "i"
            }
        }, {
            lastName: {
                "$regex": filter,
                "$options": "i"
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;