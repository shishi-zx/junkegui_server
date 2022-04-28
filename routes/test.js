var express = require('express');
var router = express.Router();


/* test */
router.get('/', function (req, res, next) {
    if (req.session.n) {
        req.session.n++
        console.log("111");
        console.log(req.session.n);
    } else {
        req.session.n = 1
        console.log(req.session);
    }
    res.send('respond with a test resource');
    
});

module.exports = router;