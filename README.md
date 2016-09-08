# prototype-content-consumer


### Background

The project will allow users to capture data on pages and store it to catalogue and organize for later use.

### Getting Started

Follow the steps below to setup a development environment. This project
expects you will be using a flavor of Unix that supports a standard node.js
environment. The project has been tested in an OS X 10.11.x environment.

_*** the project has not been tested in a windows environment_

1. Clone repository

    `git clone git@github.com:chadwpry/prototype-content-consumer.git`

2. Set NODE_ENV variable to development. It can be included in a .bash_profile or .bashrc configuration.

    `$ export NODE_ENV=development`

### API

3. Install node packages

    `npm install`

4. Create a SSL certificate

    `openssl req -nodes -x509 -newkey rsa:2048 -keyout credentials/key.pem -out credentials/cert.pem -days 365`

5. Start server

    `npm start`

### Extension

6. Install node packages

    `npm install`

7. Create webpack bundle

    `npm run build`

8. In the root directory of your project start the server

    `sudo npm start`


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

#### Extension

1. Go to chrome://extensions/ in your browser and click developer mode

2. Load unpacked extensions, select the extension directory in our project and click Reload

3. Go to any job page, click the extension and you should see the following in chrome console:


*Response Example in Chrome Console*

    {
      title: "Backend Engineer",
      categories: "New York, NY", "Engineering", "Full-time"
      url: "https://examplesite/company/test123"
    }


### Contributing

* Check out the latest master to make sure the feature hasn't been implemented or the bug hasn't been fixed yet
* Check out the issue tracker to make sure someone already hasn't requested it and/or contributed it
* Fork the project
* Start a feature/bugfix branch
* Commit and push until you are happy with your contribution
* Make sure to add tests for it. This is important so future version are not broken unintentionally.
