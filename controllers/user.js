'use strict'

var validator = require('validator');
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');
var User = require('../models/user');


var controller = {

user: function(req, res)
{
    User.create(req.body).then((result) => {
        res.json(result);
    }).catch((err) => {
        handleError(res, err);
    });

},

getUser: function(req,res)
{
    User.findById(req.params.id, function (err, result) {
        if (err) {
            return handleError(err);
        }

        res.json(result);
    });

},

update: function(req, res)
{
    // res.send('User route')
    User.update(req.params.id, req.body).then((result) => {
        res.json(result);
    }).catch((err) => {
        handleError(res, err);
    });

},

delete:function(req,res)
{
    User.delete({id: req.params.id, name: 'foo'}).then((result) => {
        res.json(result);
    }).catch((err) => {
        handleError(res, err);
    });

}





}

module.exports = controller;