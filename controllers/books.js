/* eslint-disable linebreak-style */
'use strict';

var book = require('../models/bookModel');

module.exports = function(router){
    
    router.get('/', function(req, res){
        res.redirect('/');
    });

    router.get('/details/:id', function(req, res){
        book.findOne({_id: req.params.id}, function(err, book){
            if(err) throw err;

            var model = {
                book:book
            };
            res.render('books/details', model);
        });
    });
};