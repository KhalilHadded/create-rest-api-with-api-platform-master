Blog application
========================

This is a small Blog application developed using symfony and react webpack encore.


Installing
--------------

For installation run the following commands:

$ composer install

$ yarn install

$ php bin/console doctrine:database:create

$ php bin/console doctrine:schema:update --force

Also you can use Fixtures to load a "fake" set of data into a database that can then be used for testing.
Run this command :

$ php bin/console doctrine:fixtures:load

Run the Application
--------------

For running the app use the following commands:

$ php bin/console server:run

$ yarn run encore dev