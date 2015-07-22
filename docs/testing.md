# Testing #

Tests are required to ensure the application's anti-fragility, for continuous deployments, and as a matter of best practice.

Testing in this application is based on [This example](https://github.com/bredikhin/sailsjs-mocha-testing-barrels-fixtures-example)

## Running Tests ##

First, make sure you're able to get the system up and going with ./vagrant-refresh.sh or vagrant up.  Next, ssh into vagrant:

    $ vagrant ssh

Next, cd to the host file system via the /vagrant/ mount point, e.g.:

    vagrant@vagrant-ubuntu-trusty-32:~$ cd /vagrant/inquire/

Finally, run `npm test` to see if tests pass:

    vagrant@vagrant-ubuntu-trusty-32:/vagrant/inquire$ npm test
    > inquire@0.0.1 test /vagrant/inquire
    > PORT=9999 NODE_ENV=test mocha -R spec -b --recursive -t 20000

    ...

## Running Tests (General) ##

Make sure you have all the required dependencies:

    # npm install -g mocha
    # npm install -g coffee-script
    $ cd path_to_project/inquire
    $ npm install
    $ npm test

## Adding Dependencies ##

Should you require a different set of development dependencies, please follow this convention:

    $ cd path_to_project/inquire
    $ npm i --save-dev <package>

For example:

    $ npm i --save-dev mocha
    $ npm i --save-dev should
    $ npm i --save-dev sails-memory
    $ npm i --save-dev supertest
    $ npm i --save-dev barrels
