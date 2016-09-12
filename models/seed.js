let datastore = require('./datastore');

// LUMENS
let suppliers = require('./seeds/suppliers.json');

suppliers.forEach((supplier) => {
  datastore.saveSupplier(null, supplier)
    .then((supplier) => {
      console.log(`successfully created supplier`, supplier, "\n");
    })
    .catch((error) => {
      console.log(`failed to create supplier`, error, "\n");
    });
});

let samples = require('./seeds/samples.json');

samples.forEach((sample) => {
  datastore.saveSample(null, sample)
    .then((sample) => {
      console.log(`successfully created sample`, sample, "\n");
    })
    .catch((error) => {
      console.log(`failed to create sample`, error, "\n");
    });
});
