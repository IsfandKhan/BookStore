/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
'use strict';

var book  = require('../models/bookModel');
var category = require('../models/categoryModel');

module.exports = function(router){

    router.get('/', function(req, res){
        res.render('manage/index');
    });

    router.get('/books', function(req, res){

        book.find({}, function(err, books){
            if(err) throw err;

            var model = {
                books: books
            };
            res.render('manage/books/index', model);
        });
    });

    router.get('/books/add',function(req, res){

        category.find({}, function(err, cat){
            if(err) throw err;

            var model={
                categories:cat
            };

            res.render('manage/books/add', model);
        });
    });

    router.post('/books', function(req, res){
        var title = req.body.title;
        var category = req.body.category;
        var author = req.body.author;
        var publisher = req.body.publisher;
        var price = req.body.price;
        var description = req.body.description;
        var cover = req.body.cover;

        if(title == '' || price == ''){
            req.flash('error', 'Please Fill out required Fields');
            res.location('/manage/books/add');
            res.redirect('/manage/books/add');
        }
        console.log('\n\n' + isNaN(price) + '\n\n');
        if(isNaN(price)){
            req.flash('error','Price must be a Number');
            res.location('/manage/books/add');
            res.redirect('/manage/books/add');
        }
        else{
            console.log('Han\n');
            var newBook = new book({
                title:title,
                category:category,
                description:description,
                author:author,
                publisher:publisher,
                cover:cover,
                price:price
            });

            newBook.save(function(err){
                if(err) throw err;

                req.flash('success', 'Book Added');
                res.location('/manage/books');
                res.redirect('/manage/books');
            });
        }
    });

    router.get('/books/edit/:id',function(req, res){
        category.find({}, function(err, categories){
            if(err) throw err;

            book.findOne({_id:req.params.id}, function(err, book){
                if(err) throw err;

                var model = {
                    book:book,
                    categories:categories
                };

                res.render('manage/books/edit', model);

            });
        });
    });

    router.post('/books/edit/:id', function(req,res){
        var id = req.params.id;
        var title = req.body.title;
        var author = req.body.author;
        var publisher = req.body.publisher;
        var price = req.body.price;
        var category = req.body.category;
        var description = req.body.description;
        var cover = req.body.cover;

        book.update({
            _id:id
        }, {
            title:title,
            author:author,
            publisher:publisher,
            price:price,
            category:category,
            description:description,
            cover:cover}, function(err){
                if(err) throw err;

                req.flash('success','Book Updates');
                res.location('/manage/books');
                res.redirect('/manage/books');
            });

    });

    router.get('/books/delete/:id', function(req, res){
        book.deleteOne({_id:req.params.id}, function(err){
            if(err) throw err;

            req.flash('success', 'Book deleted');
            res.location('/manage/books/');
            res.redirect('/manage/books/');
        })
    });

    router.get('/categories', function(req, res){
        category.find({}, function(err, categories){
            if(err) throw err;

            var model = {
                categories:categories
            };

            res.render('manage/categories/index', model);
        });
    });

    router.post('/categories', function(req, res){
        var name = req.body.name;

        var cat = new category({
            name:name
        });

        cat.save(function(err){
            if(err) throw err;

            req.flash('success','Category Added');
            res.location('/manage/categories');
            res.redirect('/manage/categories');
        });
    });

    router.get('/categories/add', function(req,res){
        res.render('manage/categories/add');
    });

    router.get('/categories/delete/:id', function(req,res){
        category.deleteOne({_id:req.params.id}, function(err){
            if(err) throw err;

            req.flash('success','Category Deleted');
            res.location('/manage/categories');
            res.redirect('/manage/categories');
        });
    });

    router.get('/categories/edit/:id', function(req, res){
        category.findOne({_id:req.params.id}, function(err, category){
            if(err) throw err;

            var model = {
                category:category
            };

            res.render('manage/categories/edit', model);
        });
    });

    router.post('/categories/edit/:id', function(req, res){
        
        category.update({_id:req.params.id}, {
            name:req.body.name
        }, function(err){
            if(err) throw err;

            req.flash('success','Category Updated');
            res.location('/manage/categories')
            res.redirect('/manage/categories');
        });
    });
};