let express = require('express');
let models = require('../../models/datastore');
let Serialize = require('../../models/serialize');

let router = express.Router();

/* GET /api/v1/selectors/:host */
router.get('/:host', (req, res, next) => {
  models.readSelector(req.params.host, (selector) => {
    res.json(Serialize.selector(selector));
  }, (errors) => {
    res.status(404);
    res.json({});
  });
});

/* GET /api/v1/selectors */
router.get('/', (req, res, next) => {
  let data;

  if (req.query.host === 'jobs.lever.co') {
    data = {
      'logo': {
        'selector': '.main-header-logo img',
        'attribute': 'src'
      },
      'title': {
        'selector': '.posting-headline h2',
        'attribute': 'value'
      },
      'categories': {
        'selector': '.posting-categories .posting-category',
        'attribute': 'value'
      },
      'responsibilities': {
        'selector': "h3:contains('Responsibilities') + .posting-requirements li",
        'attribute': 'value'
      }
    };
  }

  res.json({
    "data": data,
    "jsonapi": {
      "version": "1.0.0"
    }
  });
});

module.exports = router;
