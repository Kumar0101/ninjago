const { query } = require('express');
const express = require('express');
const Ninja = require('../models/ninja');
const router = express.Router();
// "geometry": {
//     "type": "Point",
//     "coordinates": [125.6, 10.1]
//   }

// get ninjas from db
router.get('/ninjas',function(req,res,next){
    // Ninja.find({})
    // .then(function(ninjas){
    //     res.send(ninjas)
    // })

    Ninja.aggregate([{
        $geoNear: {
          near: {
            'type': 'Point',
            'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
          },
          distanceField: "dist.calculated",
          maxDistance: 100000,
          spherical: true
        }
      }]).then((ninjas) => {
        res.send(ninjas);
      });
})
// add ninja too db
router.post('/ninjas',function(req,res,next){
    // var ninja = new Ninja(req.body);
    // ninja.save();
    Ninja.create(req.body).then(function(ninja){
        res.send(ninja)
    }).catch(next)
 
})
// update ninja in db
router.put('/ninjas/:id',function(req,res,next){
    Ninja.findByIdAndUpdate({_id:req.params.id},req.body)
    .then(function({}){
        Ninja.findOne({_id:req.params.id})
        .then(function(ninja){
            res.send(ninja)
        })
       
    })

})
// delet ninja in db
router.delete('/ninjas/:id',function(req,res,next){
    // console.log(req.params.id);
    Ninja.findByIdAndRemove({_id:req.params.id})
    .then(function(ninja){
        res.send(ninja)

    })
    // res.send({type:'DELETE'})
})


module.exports = router;