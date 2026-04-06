const router = require("express").Router();
const User = require("../models/User")
const passport = require("passport");

passport.use(User.createStrategy());

// serializing user loging in and out
passport.serializeUser(function(user , done){
    done(null , user.id);
  });
passport.deserializeUser(async function(id, done){
    try{
        const user = await User.findById(id);
        done(null, user);
    }
    catch (err){
        done(err);
    }
});

// Register
// router.post("/register", async (req,res) => {
//     try{
//         const user = await User.findOne({username: req.body.username}); 

//         if (user){
//             res.status(403).json("A user already exists!");
//         }
//         else{
//             User.register({
//                 firstName: req.body.firstName.charAt(0).toUpperCase() + req.body.firstName.slice(1),
//                 lastName: req.body.lastName.charAt(0).toUpperCase() + req.body.lastName.slice(1),
//                 username: req.body.username,
//             }, req.body.password, async function(err, user){
//                 if (err){
//                     console.log(err)
//                 }
//                 else{
//                     await passport.authenticate("local")(req, res, function(){
//                         res.status(200).json(user)
//                     })
//                 }
//             })
//         }
//     }
//     catch (err){
//         res.status(500).json(err);
//     }
// })

// Login
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return res.status(500).json(err.message);

        if (!user){
            if (info) return res.status(401).json(info?.message || "Invalid username or password")
        }

        req.login(user, (err) => {
            if (err) return res.status(500).json("Login failed");

            if (!req.session.createdAt){
                req.session.createdAt = Date.now();
            }

            const { password, updatedAt, __v, salt, hash, ...userInfo } = req.user._doc;
            return res.status(200).json({
                message: "Logged in successfully",
                user: userInfo
            });
        });
    })(req, res, next);
});


router.get("/logout" , async (req,res) => {
    req.logout(function (err){
        if (err){
            return res.status(500).json("Couldn't log out!");
        }
        
        req.session.destroy((sessionErr) => {
            if (sessionErr) return res.status(500).json(sessionErr.message);
            res.clearCookie("connect.sid"); 
            res.status(200).json("User logged out.");
        });    
    })
})

module.exports = router;