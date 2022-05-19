'use strict'

var validator = require('validator');
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');
var User = require('../models/user');


var controller = {

user: function(req, res)
{
    users.create(req.body).then((result) => {
        res.json(result);
    }).catch((err) => {
        handleError(res, err);
    });

},

getUser: function(req,res)
{
    users.get(req.params.id, function (err, result) {
        if (err) {
            return handleError(err);
        }

        res.json(result);
    });

}



}

module.exports = controller;