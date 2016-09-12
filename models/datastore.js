let datastore = require('@google-cloud/datastore');
let config = require('../config/config');

let client = datastore({
  projectId: config.projectId,
  keyFilename: config.googleCloudKey
});

module.exports.client = client;

module.exports.findAll = (query) => {
  return new Promise((resolve, reject) => {
    client.runQuery(query, (error, entities) => {
      if (error) {
        reject(error);
      } else {
        resolve(entities);
      }
    });
  });
};

module.exports.findOne = (query) => {
  return module.exports.findAll(query.limit(1));
};

module.exports.findSupplier = (host) => {
  return module.exports.findOne(supplierQuery(host));
};

module.exports.save = (id, kind, dataset) => {
  return new Promise((resolve, reject) => {
    let key;

    if (id) {
      key = client.key([kind, parseInt(id, 10)]);
    } else {
      key = client.key(kind);
    }

    let entity = {
      key: key,
      data: toDatastore(dataset)
    };

    client.save(entity, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(entity);
      }
    });
  });
};

module.exports.saveSample = (id, payload) => {
  let dataset = {
    data: payload,
    indexedColumns: [
      'host',
      'nonce'
    ]
  };

  return module.exports.save(id, 'Sample', dataset);
};

module.exports.saveSupplier = (id, data) => {
  let dataset = {
    data: data,
    indexedColumns: [
      'host',
      'name'
    ]
  };

  return module.exports.save(id, 'Supplier', dataset);
};

// PRIVATE

let supplierQuery = (host) => {
  return client.createQuery('Supplier').filter('host', '=', host);
};

let toDatastore = (dataset) => {
  return Object.keys(dataset.data).reduce((list, c) => {
    if (dataset.data[c]) {
      list.push({
        name: c,
        value: dataset.data[c],
        excludeFromIndexes: (dataset.indexedColumns || []).indexOf(c) === -1
      })
    }

    return list;
  }, []);
};
