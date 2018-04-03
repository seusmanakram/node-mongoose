const mongoose = require('mongoose');
mongoose.Promise = require('bluebird'); // Third Party library for supporting Promises

const Dishes = require('./models/dishes');

const url = "mongodb://localhost:27017/conFusion";

const connect = mongoose.connect(url);

connect.then((db) => {

    db = mongoose.connection;
    console.log('Connected correctly to server!');

    Dishes.create({
        name: "Uthappiza",
        description: 'test'
    })
        .then((dish) => {
            console.log(dish);

            return Dishes.findByIdAndUpdate(dish._id, {
                $set: {description: 'Updated test'},
            },
                {
                    new: true
            })
            
            .exec();
        })
        .then((dish) => {
            console.log(dish);
            dish.comments.push({
                rating: 5,
                comment: 'I\'m getting it feel!',
                author:'Leonardo'
            });

            return dish.save();
        })

        .then((dish) => {
            console.log(dish);
            return db.collection('dishes').drop();
        })
        .then(() => {
            return db.close();
        })
        .catch((err) => {
            console.log(err);
        });

});