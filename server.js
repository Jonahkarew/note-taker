
//set up express
var express= require("express");
var app = express();

//install path
var path = require("path");

//set the port and enable it so heroku can hijack it
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.json());

var connection = require("./db/connection")

//these are the html routes
//show the landing page
app.get("/", function(req,res){
  res.sendFile(path.join(__dirname, "/public/index.html"))
})

//show the notes page
app.get("/notes", function(req, res){
  res.sendFile(path.join(__dirname, "/public/notes.html"))
})

//these are the api routes
//get current notes from db when on notes page
app.get("/api/notes", function(req, res){
  connection.query("SELECT * FROM notes", function(err, dbNotes){
    if(err){
      return res.json(err)
    }
    res.json(dbNotes)
    // console.log(dbNotes);
  })
})
//route for posting user notes
app.post("/api/notes", function(req, res){
  connection.query("INSERT INTO notes SET ?",
  req.body, function(err, res){
    if (err) {
      return res.json(err)
    }
    else{
      console.log(res)
    }
  })
})


//redirect wrong urls
app.get("/*", function(req, res){
  res.sendFile(path.join(__dirname, "public/index.html"))
})



app.listen(PORT, function(){
  console.log(`App is listening on PORT: ${PORT}`)
})