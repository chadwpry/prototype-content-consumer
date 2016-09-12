let express = require('express');
let router = express.Router();
let datastore = require('../../models/datastore');
let Serialize = require('../../models/serialize')

router.post('/', function(req, res, next) {
  console.log(req.body);

  datastore.saveSample(null, req.body)
    .then((sample) => {
      res.json(Serialize.sample(sample));
    })
    .catch((errors) => {
      res.status(400);
      res.json(errors);
    });
});

module.exports = router;
