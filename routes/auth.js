const router = require("express").Router();
const User = require("../models/User")
const passport = require("passport");

passport.use(User.createStrategy());

// serializing user loging in and out
passport.serializeUser(function(user , done){
    done(null , user.id);
  });
passport.deserializeUser(function(id, done){
    User.findById(id , function(err ,user){
        done(err , user);
    });
});


// Register
router.post("/register", async (req,res) => {
    try{
        const user = await User.findOne({username: req.body.username}); 

        if (user){
            res.status(403).json("A user already exists!");
        }
        else{
            User.register({
                firstName: req.body.firstName.charAt(0).toUpperCase() + req.body.firstName.slice(1),
                lastName: req.body.lastName.charAt(0).toUpperCase() + req.body.lastName.slice(1),
                username: req.body.username,
            }, req.body.password, async function(err, user){
                if (err){
                    console.log(err)
                }
                else{
                    await passport.authenticate("local")(req, res, function(){
                        res.status(200).json(user)
                    })
                }
            })
        }
    }
    catch (err){
        res.status(500).json(err);
    }
})

// Login
router.post("/login", async (req,res) => {
    try{
        const user = await User.findOne({username: req.body.username});

        req.login(user, async function(err){
            if (err){
              res.status(404).send("Wrong email or user does not exist!");
            }
            else{
              await passport.authenticate("local")(req ,res , async function(){
                res.status(200).json(user);
              })
            }
          })
    }
    catch(err){
        res.status(500).json(err);
    }
})


router.get("/logout" , async (req,res) => {
    req.logout(function (err){
        if (err){
            res.status(404).send("Couldn't log out!");
        }
        else{
            res.status(200).json("user logged out");
        }
    })
})

module.exports = router;