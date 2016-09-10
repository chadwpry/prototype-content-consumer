var express = require('express');
var router = express.Router();

/* GET /api/v1/selectors */
router.get('/', function(req, res, next) {
  let data;

  if (req.query.host === 'jobs.lever.co') {
    data = {
      'logo': {
        'selector': '.main-header-logo img',
        'property': 'src'
      },
      'title': {
        'selector': '.posting-headline h2',
        'property': 'value'
      },
      'categories': {
        'selector': '.posting-categories .posting-category',
        'property': 'value'
      },
      'responsibilities': {
        'selector': 'h3:contains('Responsibilities') + .posting-requirements li',
        'property': 'value'
      }
    };
  } else if (req.query.host === 'www.lumens.com') {
    data = {
      'id': {
        'selector': '[itemscope][itemtype="http://schema.org/Product"] meta[itemprop="name"]',
        'property': 'content'
      },
      'product_name': {
        'selector': '[itemscope][itemtype="http://schema.org/Product"] meta[itemprop="name"]',
        'property': 'content'
      }
    }
  }

  res.json({
    "data": data,
    "jsonapi": {
      "version": "1.0.0"
    }
  });
});

module.exports = router;
