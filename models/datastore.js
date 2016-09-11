let datastore = require('@google-cloud/datastore');
let config = require('../config/config');

let client = datastore({
  projectId: config.projectId,
  keyFilename: config.googleCloudKey
});

module.exports.client = client;

module.exports.readSelector = (host, successCallback, errorCallback) => {
  let query = client.createQuery('Selector')
    .filter('host', '=', host)
    .limit(1);

  client.runQuery(query, (err, selector) => {
    if (err) {
      errorCallback(err);
    } else {
      successCallback(selector[0]);
    }
  });
};
