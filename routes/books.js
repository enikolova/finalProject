var express = require('express');
var router = express.Router();

/* GET home page books. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get('books');

    collection.find({}, {}, function(err, docs) {
       
        res.json(docs);
    });
});

router.get('/:book_id', function(req, res, next) {
    var db = req.db;
    var collection = db.get('books');
    
    var id = req.params.book_id;
    collection.find({ _id: id }, {}, function(e, docs) {
        res.json(docs);
    });
});

// router.put('/', function(req, res, next) {
//     var db = req.db;
//     var collection = db.get('books');
//     var newKompanionka = req.body;
//     newKompanionka.svodnik_id = req.session.userId;

//     collection.insert(newKompanionka, function(e, docs) {
//         res.json({ "id": docs._id });
//     });
// });

// router.post('/:id', function(req, res, next) {
//     var db = req.db;
//     var collection = db.get('books');
//     var newKompanionka = req.body;
//     var id = req.params.id;
//     collection.findOneAndUpdate({ _id: id }, newKompanionka, function(e, docs) {
//         res.json({ "ok": "ok" });
//     });
// });

// router.delete('/:id', function(req, res, next) {
//     var db = req.db;
//     var collection = db.get('books');
//     var id = req.params.id;
//     collection.remove({ '_id': id }, function(err) {
//         if (err) {
//             res.json(err);
//         } else {
//             res.send({ ok: "ok" });
//         }
//     });
// });

module.exports = router;