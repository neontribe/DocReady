DocReady
========

An angularjs application for the [Docready Project](http://www.docready.org)

Getting started:

    git clone git@github.com:neontribe/DocReady.git
    cd DocReady
    npm install && bower install
    grunt test

Building Releases:

	git flow release start x.x.x
	# Bump the version in package.json and component.json
	grunt build
	git commit -a
	git flow release finish x.x.x
	git push origin develop && git checkout master && git push origin master --tags
