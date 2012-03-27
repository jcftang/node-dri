default:

all:

test:
	expresso test/*

coverage:
	-rm -rf lib-cov
	node-jscoverage lib lib-cov
	expresso -I lib --coverage test/*

clean:
	-rm -rf lib-cov
	
.PHONY: test
