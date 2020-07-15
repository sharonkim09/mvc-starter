/**
 * REQUIRE NPM PACKAGES
 * REQUIRE EXTERNAL FILES
 */

const express = require("express");
const exphbs = require("express-handlebars");

/**
 * DEFINE VARIABLES
 */
const PORT = process.env.PORT || 8080;
const app = express();
const db = require("./models")
const ViewsController= require("./controllers/viewsController.js")
const APIController=require("./controllers/apiController.js");
const UsersController = require("./controllers/usersController.js");

/**
 * MIDDLEWARE
 */
// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Handlebars setup
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


/**
 * VIEW ROUTES
 * API ROUTES
 */
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
app.use(ViewsController);
app.use(APIController);
// for DRY route all traffic that has api/users to the userscontrollers
app.use("/api/users", UsersController);
// Routes

// app.get("/api/config",(req,res)=>{
//     res.json({
//         success:true,
//     })
// })
/**
 * DB CONNECTION
 * APP LISTEN
 */
// Start our server so that it can begin listening to client requests.
db.sequelize.sync().then(()=>{
    app.listen(PORT, function () {
        // Log (server-side) when our server has started
        console.log("Server listening on: http://localhost:" + PORT);
      });
}).catch((err)=>{
    console.log("error connecting to the db")
    console.log(err)
})
