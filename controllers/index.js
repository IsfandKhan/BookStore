'use strict';

var bookModel = require('../models/bookModel');


module.exports = function (router) {
    router.get('/', function (req, res) {
        bookModel.find({}, function(err, books){
            if(err) throw err;

            books.forEach(function(element){
                element.truncateText = element.truncateText(19);
            });

            var model = {
                books:books
            };

            res.render('index', model); 
        });
    });

};
