var express = require('express');
var sql = require('mssql');
var dbConn = require('../database.js');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

    var result = '';
    var request = new sql.Request(dbConn);
    request.query('select flavors from JuiceFlavors', function (err, recordset) {
        if (err) {
            console.error(err);
            res.status(500).send(err.message);
            return;
        }
        result = recordset['recordset'];
        console.log(result);
    });

    res.render('index', {
        title: 'theBRATcrew',
        copyright: '| © 2017 theBRATcrew LLC | All Right Reserved ' + new Date().getFullYear(),
    });

});
// router.get('/cart', function (req, res, next)
// {
// 	res.render('cart', {});
// });

module.exports = router;