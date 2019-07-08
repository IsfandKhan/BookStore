/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
'use strict';

var mongoose = require('mongoose');

var db = function(){
    return {
        // eslint-disable-next-line no-unused-vars
        config: function(conf){
            mongoose.connect('mongodb://localhost/bookstore');
            var db = mongoose.connection;
            db.on('error', console.error.bind(console,'Connection Error'));
            db.once('open', function(){
                console.log('DB connection opened...');
            });

        }
    };
};

module.exports = db();