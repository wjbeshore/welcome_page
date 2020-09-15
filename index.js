const express = require('express');
const app = express();
const port = 3000;
const https = require('https');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');







const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/todolist', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const todoSchema = new mongoose.Schema({
  todo: String
});


const Todo = mongoose.model('Todo', todoSchema);

const silence = new Todo({ todo: 'Turn off volume' });
console.log(silence); 





  silence.save(function (err, silence) {
    if (err) return console.error(err);
    console.log("Success!")
  });

  Todo.find(function(err, todo) {
    if (err) {
      console.log(err);
    } else {
      console.log(todo[1]["_id"]);
    }
  });










var list = ["An item"];


app.get('/', (req, res) => {

	var today = new Date();
	var options = {
		weekday: "long",
		day: "numeric",
		month: "long"
	};

	var day = today.toLocaleDateString("en-US", options);

	res.render("list", {kindOfDay: day, renderList: list});



});

app.post("/", (req, res) => {
	list.push(req.body.newItem);

	res.redirect('/')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})