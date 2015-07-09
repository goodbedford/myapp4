var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var _ = require('underscore');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


var users = [
  { id: 20,
    username: "goodbedford",
    lastname: "programmer",
    age: 78
  },
    { id: 21,
    username: "malcom",
    lastname: "x",
    age: 78
  },
    { id: 25,
    username: "marcus",
    lastname: "garvey",
    age: 78
  },
    { id: 25,
    username: "louis",
    lastname: "lattimore",
    age: 78
  },
];

// fix use for local
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

//get all users
app.get("/users", function(req, res){
  res.json(users);
});

app.get("/users/:id", function(req, res){
  var id;
  users.forEach(function(user){
    if(user.id == req.params.id){
      id = users.indexOf(user);
      console.log(id);
      res.json(users[id]);
    }
  });


});

//update user
app.put("/users/:id", function(req, res){
  var userId = parseInt(req.params.id);

  var foundUser = _.findWhere(users, {id:userId });
  console.log("hi",userId);

  if( foundUser){
    foundUser.id = parseInt(req.body.id || foundUser.id); 
    foundUser.username = req.body.username || foundUser.username;
    foundUser.lastname = req.body.lastname || foundUser.lastname;
    foundUser.age = parseInt(req.body.age || foundUser.age) ;
    
    res.json(foundUser);
  }else{
    res.json({"msg":"error nothing updated"});
  }



});
//push new users
app.post("/users", function(req, res){
  var newUser = req.body;
      users.push(newUser);

  res.json(newUser);
});

app.listen(3000);

//delet users
app.delete("/users/:id", function(req, res){
  var userId = req.body.id;
  var foundUser = _.findWhere(users, {id: userId});

  users.forEach(function(user){
  if(user.id == userId){
    id = users.indexOf(user);
    console.log(user," was deleted");  
    users.splice(id,1);  

    res.json({"msg":"deleted userId"+id});
  }
  });

});





