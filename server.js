
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

app.get("/", function(req,res){
  res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get("/notes", function(req, res){
  res.sendFile(path.join(__dirname, "/public/notes.html"))
})







app.listen(PORT, function(){
  console.log(`App is listening on PORT: ${PORT}`)
})