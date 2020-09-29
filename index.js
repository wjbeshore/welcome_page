const express = require('express');
const app = express();
const port = 3000;
const https = require('https');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

let quote = undefined;
let url = "https://quotes.rest/qod.json?category=inspire";

https.get(url,(res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let json = JSON.parse(body);
            quote = json.contents.quotes[0].quote;
            console.log(quote)
        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});




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

// const silence = new Todo({ todo: 'Turn off volume' });
// console.log(silence); 





//   silence.save(function (err, silence) {
//     if (err) return console.error(err);
//     console.log("Success!")
//   });















app.get('/', (req, res) => {
	
	var today = new Date();
	var options = {
		weekday: "long",
		day: "numeric",
		month: "long"
	};
	
	var day = today.toLocaleDateString("en-US", options);


	Todo.find(function(err, todo) {
    if (err) {
      console.log(err);
    } else {
    	console.log(todo);
      res.render("list", {kindOfDay: day, renderList: todo});
    }
  });




	
	



});

app.post("/", (req, res) => {
	let newToDo = req.body.newItem;
	let newToDoSchema = new Todo({ todo: newToDo });
	newToDoSchema.save(function (err, silence) {
    if (err) return console.error(err);
    res.redirect('/')
  });
	
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})