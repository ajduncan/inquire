# inquire #

The inquire application is a [Sailsjs](http://www.sailsjs.org/#!/) application which is used to manage inquiries.

## Local development ##

To work with the system locally, you can use [Vagrant](https://www.vagrantup.com) and [Ansible](http://www.ansible.com/).

Under Linux or OSX, issue the following command at the command prompt in the project directory:

    $ ./vagrant-refresh.sh

Then visit the sails application at http://localhost:5000/

By default, the username and password used to sign in is:

    Username: admin@test.com
    Password: 1234

## Application Setup ##

Creating a new sails.js application is straight forward:

    $ sails new inquire
    $ cd inquire/

Running is as easy as:

    $ sails lift

Creating a new model/controller is as easy as:

    $ sails generate api user
    $ sails lift

## Application Configuration ##

The inquire/config/local.js file is used for local development, to define local connection strings and such.  Ansible will use this for a local deploy when using Vagrant, and will create the file from a template.  It's OK to have information stored here for development.

In production, connection string and driver information will be defined as an environment variable.

...

## Testing ##

Tests are required for continuous integration and deployment.  Please see [this document](testing.md)
