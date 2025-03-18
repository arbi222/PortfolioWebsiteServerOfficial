const express = require("express");
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const helmet = require("helmet")
const morgan = require("morgan")
const passport = require("passport")
const session = require("express-session");
const cors = require("cors");
const cron = require("cron");
const https = require("https");

dotenv.config()

const authRoute  = require("./routes/auth");
const userRoute = require("./routes/users");
const aboutRoute = require("./routes/about");
const experienceRoute = require("./routes/experience");
const contact = require("./routes/contact");
const category = require("./routes/categorys");
const projectItem = require("./routes/projectItem");
const resetPassRoute = require("./routes/resetPass");

mongoose.connect(process.env.MONGO_URL);

const corsOptions = {
  origin: ["https://arbihamolli.onrender.com"],
  credentials: true,
};

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/about", aboutRoute);
app.use("/api/experience", experienceRoute);
app.use("/api/contact", contact);
app.use("/api/category", category);
app.use("/api/projectItem", projectItem);
app.use("/api/reset", resetPassRoute)


app.get("/", (req,res) => {
  res.send("Welcome!")
})

const backendUrl = "https://portfolioserver-d0td.onrender.com";
const job = new cron.CronJob('*/14 * * * *', function(){
  https.get(backendUrl, (res) => {
    if (res.statusCode === 200){
      console.log("server restarted")
    }
  }).on("error", (err) => {
      console.log("error");
  })
})
job.start();

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Backend Server is running on port ${port}`);
});
