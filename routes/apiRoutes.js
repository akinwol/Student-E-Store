var db = require("../models");
var auth = require("../utility/facebook");

module.exports = function(app) {

  // Create a new example
  app.post("/login", function(req, res) {
    //If user doesn't already exist, create them using facebook data sent from client
    db.User.findOrCreate({
      where: { userId: req.body.id },
      defaults: {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        photoUrl: req.body['picture[data][url]']
      }}).spread((user,created) => {
        console.log(user.get({
          plain:true
        }))
        res.json(true);
      })
  });

  app.get("/api/feed", function(req, res){
    db.Product.findAll({}).then(function(dbProduct){
    res.json(dbProduct)
  
    })
  });

  app.get("/api/categorylist", function(req, res){
    db.Category.findAll({}).then(function(dbCategory){
    res.json(dbCategory)
    });
  })

  app.post("/post", function (req, res) {
    console.log(req.body)
    db.Product.create({
      name: req.body.productName,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      CategoryId: req.body.categoryId,
      UserId: 2
    })

  })
};
