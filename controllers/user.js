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

        return res.json(result);
    });

},

update: function(req, res)
{
    // res.send('User route')
    User.findOneAndUpdate(req.params.id, req.body).then((result) => {
        res.json(result);
    }).catch((err) => {
        handleError(res, err);
    });

},

delete:function(req,res)
{
    User.findOneAndDelete({id: req.params.id, name: 'foo'}).then((result) => {
        res.json(result);
        console.log('usuario eliminado', result);
    }).catch((err) => {
        handleError(res, err);
    });

}





}

module.exports = controller;