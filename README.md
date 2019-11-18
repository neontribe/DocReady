DocReady [![Build Status](https://travis-ci.org/neontribe/DocReady.png?branch=develop)](https://travis-ci.org/neontribe/DocReady)
========

An angularjs application for the [Docready Project](http://www.docready.org)

# Prerequisites:

  * git
  * nvm

# Getting started:

    git clone git@github.com:neontribe/DocReady.git
    cd DocReady
    nvm use
    npm install -g yarn
    yarn
    yarn dev

# Building Releases:

	git flow release start x.x.x
	# Bump the version in package.json and component.json
	grunt build
	git commit -a
	git flow release finish x.x.x
	git push origin develop && git checkout master && git push origin master --tags

Coverage reports are available in /coverage after every test run.
