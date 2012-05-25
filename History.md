
0.0.6 / 2012-05-25 
==================

  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * lastEdited and lastCreated added
  * Converter checks for properties
  * Refactored out mongodb connectionstring
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * Added query functionality
  * add license
  * Adapted count function to be more flexible
  * Added function to get total amount of objects in mongo
  * Fixed a bug in hash creation, file upload uses the same hashing function
  * Object creation now adds a hash to the lable porperty of the object
  * Added lable to object schema
  * Added creation and modification dates to object schema
  * Bumped version number to 0.0.5
  * Fixed tests to use new Chai functions
  * Fixed DC converter and updated tests to new schemas
  * Fixed bug with amount of pages
  * getChildren now returns total amount of pages
  * Removed obsolete code
  * Added pagination
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * Removed comments
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * filelocation schema changed to an array
  * Added more tags to DC converter
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * schema fix
  * Updated schema
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * Fixed addMediaDatastream
  * update schema
  * Fixed wront function calls
  * Approve item checks if there are files
  * Fixed calling nonexistent function in dc converter
  * Upload now returns "hash/filename.ext"
  * Upload now creates a hash and puts file in the directory named with the hash
  * Removed console prints
  * JSON to DC now partially works, need to fill in the table with appropriate values
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * updated the upload functionality
  * Removed object update from approve function
  * Updated approve function to use new schema
  * FedoraId is now stored in object when approved
  * Added fedoraId to the object schema
  * Added second function for DC conversion
  * Exposed fedora for more direct access
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * added object schema
  * added object schema
  * Depends on underscore
  * Removed unused function
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * Fixed some configuration issues for binary upload
  * make package.json formatted in the same way as node-fedora
  * added scripts to bump version
  * fix typo in tests to make documentation more consistant
  * Changed fedora dependency to master branch Added config function Updated test
  * Added check for files
  * Added uploadDirectory as a setting
  * Removed dependencies
  * Some debugging
  * Some debugging
  * Some debugging
  * Some debugging
  * Added dependencies and file upload
  * Added file upload
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * Added projectId to schema
  * added dependancy for multipart
  * added dependancy for multipart
  * edited upload function
  * edited upload function
  * Added upload function
  * depends on node-fs, can create directories
  * Objects pushed to fedora get DC datastream
  * Fixed arguments in converter functions, added documentation
  * Added MODS converter
  * Added converter code
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * Removed all gridfs and mongolian code, helpers file is obsolete
  * update package dependancies
  * start of 0.0.4 release
  * Minor edits
  * rever
  * Removed unused schemas
  * Added new properties schema, updated tests
  * Added arguments to test documentation
  * first pass at making the test output more user friendly for documentation generation
  * Changed naming
  * Updated tests
  * Updated to conform single schema objects
  * Fixed update function
  * Remove objects added
  * Get objects children
  * Changed to single collection structure
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * reverting some changes
  * remove old tests
  * update package.json
  * Fixed small bug
  * More functionality, more tests
  * Added functions to give lists of all collections etc
  * Depends on mongoose
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * Migrated from Mongolian to mongoose
  * depend on node-fedora v0.0.2
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * added docs target
  * Improved the remove test
  * typo
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * removed console.log
  * added markdown output
  * Added function that creates multiple objects
  * inserted a recursive delete and tests
  * fix up typo
  * minor fix
  * added some better sorting and documentation
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * Minor bug fix on dri. Added test for inserting an item
  * formatting
  * minor fix
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * updateIdOrder function now works properly
  * minor change to allow for code coverage
  * depend on should.js for tests and also fix up makefile
  * formated dri and created tests for dri in mocha
  * Fixed issue in update function#
  * Fixed issue in update function
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * Edited update function
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * added objectId update functionality
  * Removed debugging to console
  * make items variable locally scoped
  * added test-doc target to generate documentation from tests and fixed coverage report
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * little changes
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * global edit makes use of helper functionality now
  * global edit functionality added
  * depend on expresso again to get jscoverage
  * Removed all server closes
  * Added remove media
  * Removed media remove
  * Removed database closes in removeItem function
  * don't bother with jscoverage for now, seems to be failing to install on a number systems right now
  * depend on jscoverage
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * bug fix
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * enable coverage and fix up makefile
  * name isn't required to get the file
  * Fixed tests
  * Try to fix tests again
  * Changed order of tests to fix minor issue
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * Fixed test
  * there was no id for onSuccess for media deletion
  * fix typo
  * fix typo
  * bug fix
  * bug fix on media deletion
  * bug fix
  * included the removemedia functionality
  * Formatted code, fixed deletion issue
  * removeItem now deletes children
  * Changed sorting
  * Adapted test to new naming scheme. Changed sorting
  * Added more removal test to remove all the created objects
  * Added fedora implementation and dependencies. Added new test to test fedora
  * Moved admin functionality to dri.js and removed admin.js
  * Small edit and removed functionality from admin.js

0.0.5 / 2012-05-16 
==================

  * Fixed tests to use new Chai functions
  * Fixed DC converter and updated tests to new schemas
  * Fixed bug with amount of pages
  * getChildren now returns total amount of pages
  * Removed obsolete code
  * Added pagination
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * Removed comments
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * filelocation schema changed to an array
  * Added more tags to DC converter
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * schema fix
  * Updated schema
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * Fixed addMediaDatastream
  * update schema
  * Fixed wront function calls
  * Approve item checks if there are files
  * Fixed calling nonexistent function in dc converter
  * Upload now returns "hash/filename.ext"
  * Upload now creates a hash and puts file in the directory named with the hash
  * Removed console prints
  * JSON to DC now partially works, need to fill in the table with appropriate values
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * updated the upload functionality
  * Removed object update from approve function
  * Updated approve function to use new schema
  * FedoraId is now stored in object when approved
  * Added fedoraId to the object schema
  * Added second function for DC conversion
  * Exposed fedora for more direct access
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * added object schema
  * added object schema
  * Depends on underscore
  * Removed unused function
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * Fixed some configuration issues for binary upload
  * make package.json formatted in the same way as node-fedora
  * added scripts to bump version
  * fix typo in tests to make documentation more consistant
  * Changed fedora dependency to master branch Added config function Updated test
  * Added check for files
  * Added uploadDirectory as a setting
  * Removed dependencies
  * Some debugging
  * Some debugging
  * Some debugging
  * Some debugging
  * Added dependencies and file upload
  * Added file upload
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * Added projectId to schema
  * added dependancy for multipart
  * added dependancy for multipart
  * edited upload function
  * edited upload function
  * Added upload function
  * depends on node-fs, can create directories
  * Objects pushed to fedora get DC datastream
  * Fixed arguments in converter functions, added documentation
  * Added MODS converter
  * Added converter code
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * Removed all gridfs and mongolian code, helpers file is obsolete
  * update package dependancies
  * start of 0.0.4 release
  * Minor edits
  * rever
  * Removed unused schemas
  * Added new properties schema, updated tests
  * Added arguments to test documentation
  * first pass at making the test output more user friendly for documentation generation
  * Changed naming
  * Updated tests
  * Updated to conform single schema objects
  * Fixed update function
  * Remove objects added
  * Get objects children
  * Changed to single collection structure
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * reverting some changes
  * remove old tests
  * update package.json
  * Fixed small bug
  * More functionality, more tests
  * Added functions to give lists of all collections etc
  * Depends on mongoose
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * Migrated from Mongolian to mongoose
  * depend on node-fedora v0.0.2
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * added docs target
  * Improved the remove test
  * typo
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * removed console.log
  * added markdown output
  * Added function that creates multiple objects
  * inserted a recursive delete and tests
  * fix up typo
  * minor fix
  * added some better sorting and documentation
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * Minor bug fix on dri. Added test for inserting an item
  * formatting
  * minor fix
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * updateIdOrder function now works properly
  * minor change to allow for code coverage
  * depend on should.js for tests and also fix up makefile
  * formated dri and created tests for dri in mocha
  * Fixed issue in update function#
  * Fixed issue in update function
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * Edited update function
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * added objectId update functionality
  * Removed debugging to console
  * make items variable locally scoped
  * added test-doc target to generate documentation from tests and fixed coverage report
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * little changes
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * global edit makes use of helper functionality now
  * global edit functionality added
  * depend on expresso again to get jscoverage
  * Removed all server closes
  * Added remove media
  * Removed media remove
  * Removed database closes in removeItem function
  * don't bother with jscoverage for now, seems to be failing to install on a number systems right now
  * depend on jscoverage
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * bug fix
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * enable coverage and fix up makefile
  * name isn't required to get the file
  * Fixed tests
  * Try to fix tests again
  * Changed order of tests to fix minor issue
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * Fixed test
  * there was no id for onSuccess for media deletion
  * fix typo
  * fix typo
  * bug fix
  * bug fix on media deletion
  * bug fix
  * included the removemedia functionality
  * Formatted code, fixed deletion issue
  * removeItem now deletes children
  * Changed sorting
  * Adapted test to new naming scheme. Changed sorting
  * Added more removal test to remove all the created objects
  * Added fedora implementation and dependencies. Added new test to test fedora
  * Moved admin functionality to dri.js and removed admin.js
  * Small edit and removed functionality from admin.js

0.0.4 / 2012-04-20 
==================

  * Minor edits
  * rever
  * Removed unused schemas
  * Added new properties schema, updated tests
  * Added arguments to test documentation
  * first pass at making the test output more user friendly for documentation generation
  * Changed naming
  * Updated tests
  * Updated to conform single schema objects
  * Fixed update function
  * Remove objects added
  * Get objects children
  * Changed to single collection structure
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * reverting some changes
  * remove old tests
  * update package.json
  * Fixed small bug
  * More functionality, more tests
  * Added functions to give lists of all collections etc
  * Depends on mongoose
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * Migrated from Mongolian to mongoose
  * depend on node-fedora v0.0.2
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * added docs target
  * Improved the remove test
  * typo
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * removed console.log
  * added markdown output
  * Added function that creates multiple objects
  * inserted a recursive delete and tests
  * fix up typo
  * minor fix
  * added some better sorting and documentation
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * Minor bug fix on dri. Added test for inserting an item
  * formatting
  * minor fix
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * updateIdOrder function now works properly
  * minor change to allow for code coverage
  * depend on should.js for tests and also fix up makefile
  * formated dri and created tests for dri in mocha
  * Fixed issue in update function#
  * Fixed issue in update function
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * Edited update function
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * added objectId update functionality
  * Removed debugging to console
  * make items variable locally scoped
  * added test-doc target to generate documentation from tests and fixed coverage report
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * little changes
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/node-dri
  * global edit makes use of helper functionality now
  * global edit functionality added

For changes prior 0.0.4 please check the git repo.
