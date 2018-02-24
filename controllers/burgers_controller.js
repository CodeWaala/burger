var express = require("express");
const burger = require('../models/burger.js');
const router = express.Router();

router.get("/", function (req, res) {

    //call the model method that gets all the burgers
    burger.all(function (err, data) {

        if (err) { return res.status(500).end(); }
        //var datas = data.filter(item => item.devoured == 0);
        //console.log(datas);
        res.render("index", { Activeburgers: data.filter(item => item.devoured == 0) , Devouredburgers : data.filter(item => item.devoured == 1) });
    });

});

// router.get("/", function (req, res) {

//     // call the model method that gets all the burgers
//     burger.devoured(function (err, data) {

//         if (err) { return res.status(500).end(); }
//         // console.log(data);
//         res.render("index", { Devouredburgers: data });
//     });
// });

// Create a new burger
router.post("/burgers", function (req, res) {

    // call the model method that creates plan
    burger.create(req.body.burger, function (err, data) {

        if (err) { return res.status(500).end(); }

        res.json({ id: data.insertId });

    })
});

// Update a burger
router.put("/burgers/:id", function (req, res) {

    burger.update(req.params.id, function (err, data) {

        if (err) { return res.status(500).end() }

        if (data.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        }

        res.status(200).end();
    })

});

module.exports = router;