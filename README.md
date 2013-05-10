DocReady
========

Getting started:

The Client

    git clone git@github.com:neontribe/DocReady.git
    cd DocReady
    npm install && bower install
    grunt test

Building Releases
	* $> git flow release start x.x.x
	* Bump the version in package.json and component.json
	* $> grunt build
	* $> git commit -a
	* $> git flow release finish x.x.x
