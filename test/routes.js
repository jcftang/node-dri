var app = require('../app'),
    assert = require('assert');
process.env.NODE_ENV = 'test';

module.exports = {
	'GET /home': function(){
		assert.response(app,
		{ url: '/home' },
		{ status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' }},

		function(res){
			assert.includes(res.body, '<title>DRIS Workflows</title>');
			assert.ok(res);
		});
	},

	/* need setup and teardown for this */
	/*
	'GET /all': function(){
		assert.response(app,
		{ url: '/all' },
		{ status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' }},

		function(res){
			assert.includes(res.body, '<title>All</title>');
			assert.ok(res);
		});
	}
	*/
}
