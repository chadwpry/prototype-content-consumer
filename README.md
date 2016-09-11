# prototype-content-consumer - API


### Background

The project will allow users to capture data on pages and store it to catalogue and organize for later use.

### Getting Started

Follow the steps below to setup a development environment. This project
expects you will be using a flavor of Unix that supports a standard node.js
environment.

1. Clone repository

    `git clone git@github.com:chadwpry/prototype-content-consumer.git`

2. Set NODE_ENV variable to development. It can be included in a .bash_profile or .bashrc configuration.

    `$ export NODE_ENV=development`

3. Install node packages

    `npm install`

4. Create a 'self signed' SSL certificate

    `openssl req -nodes -x509 -newkey rsa:2048 -keyout credentials/key.pem -out credentials/cert.pem -days 365`

5. Start server

    `npm start`


### Setup Google Cloud Persistance

6. Install Google Cloud module:

    `npm install --save google-cloud`

7. [Go to the projects page](https://console.cloud.google.com/iam-admin/projects) to create a project. After creating a project, create [a Collector entity](https://console.cloud.google.com/datastore/entities/query).

8. Set up your [application credentials](https://developers.google.com/identity/protocols/application-default-credentials) so your project can authenticate with your recently created project and read/write data to gcloud. Scroll down to, "How the Application Default Credentials work" and follow the instructions.

9. When you get to the [API Console Credentials page](https://console.developers.google.com/projectselector/apis/credentials), select your project and when you go to create your credentials, select 'Service account key'. In the service account drop down, choose 'Compute Engine default service account' and then create the key as a JSON file.

10. After downloading your private key, following the instructions from step 9, put your private key in the credentials folder and adjust your .gitignore to exclude it.

11. Wherever you want to interact with Google's persistence layer you can now include the following:
```<javascript>
var gcloud = require('google-cloud');

var datastore = gcloud.datastore({
  projectId: 'prototype-content-consumer',
  keyFilename: './credentials/gcloud-data-store-private-key.json'
});

// example: saving a document:

let selectorKey = datastore.key('Selector');
datastore.save({
  key: selectorKey,
  data: fields
}, function (err) {
  if (err) {
    // ...
  }
});

// example: querying for a record:

Querying an entity record:

let query = datastore.createQuery('Selector').filter('hostname', hostname);

datastore.runQuery(query, function (err, selector) {
    if (!err) {
	     // ...
    }
});

```


### API Endpoints

*Request Example*

    https://localhost/api/v1/selectors?host=jobs.lever.co

*Response Example*

    {"data":
      {"logo": ".main-header-logo img",
       "title":".posting-headline h2",
       "categories":".posting-categories .posting-category",
       "responsibilities":"h3:contains('Responsibilities') + .posting-requirements li"
       },
       "jsonapi": {
         "version":"1.0.0"
        }
     }

### Contributing

* Check out the latest master to make sure the feature hasn't been implemented or the bug hasn't been fixed yet
* Check out the issue tracker to make sure someone already hasn't requested it and/or contributed it
* Fork the project
* Start a feature/bugfix branch
* Commit and push until you are happy with your contribution
* Make sure to add tests for it. This is important so future version are not broken unintentionally.
