/* eslint-disable linebreak-style */
'use strict';

var mongoose = require('mongoose');

var bookModel  =function(){
    var bookSchema = mongoose.Schema({
        title:String,
        category:String,
        description:String,
        author:String,
        publisher:String,
        price:Number,
        cover:String
    });

    bookSchema.methods.truncateText = function(len){
        return this.description.substring(0,len);
    };
    
    return mongoose.model('Book', bookSchema);
};

module.exports = new bookModel();