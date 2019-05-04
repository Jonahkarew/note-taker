
//set up express
var express= require("express");
var app = express();

//install path
var path = require("path")

//get mysql
var mysql = require("mysql");

//set the port and enable it so heroku can hijack it
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.json());

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "open",
  database: "notetaker_db"
});

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
      res.json(err)
    }
    res.json(dbNotes)
    // console.log(dbNotes);
  })
  
})


//redirect wrong urls
app.get("/*", function(req, res){
  res.sendFile(path.join(__dirname, "public/index.html"))
})



app.listen(PORT, function(){
  console.log(`App is listening on PORT: ${PORT}`)
})