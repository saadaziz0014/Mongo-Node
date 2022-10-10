const mongoose = require("mongoose");
const Dishes = require("./models/dishes");

const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected to server sucessfully");

  Dishes.create({
    name: "Uthapizza2",
    description: "Test",
  })
    .then((dish) => {
      console.log(dish);

      return Dishes.findByIdAndUpdate(
        dish._id,
        {
          $set: { description: "updated test" },
        },
        {
          new: true,
        }
      ).exec();
    })
    .then((dish) => {
      console.log(dish);

      dish.comments.push({
        rating: 5,
        comment: "Loving it",
        author: "Saad Aziz",
      });

      return dish.save();
    })
    .then((dish) => {
      console.log(dish);

      return Dishes.remove({});
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
});
