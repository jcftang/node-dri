default:

all:

test:
	NODE_PATH=./lib expresso -b test/*

coverage:
	-rm -rf lib-cov
	node-jscoverage lib lib-cov
	NODE_PATH=./lib-cov expresso -b -I lib --cov test/*

clean:
	-rm -rf lib-cov
	
.PHONY: test
