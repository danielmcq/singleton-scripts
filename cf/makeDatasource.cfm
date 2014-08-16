<cfscript>
// Found at http://www.daniweb.com/web-development/coldfusion/threads/383024/setting-datasources-within-the-application
// on 16 Aug 2014. Author alias is dipakatcvrca

// Login is always required. This example uses two lines of code.
adminObj = createObject("component","cfide.adminapi.administrator");
adminObj.login("ColdFusion admin password");
// Instantiate the data source object.
myObj = createObject("component","cfide.adminapi.datasource");
// Create a DSN.
myObj.SETMYSQL5(
	name="test datasource",
	host = "give host name or IP",
	database = "database name here",
	username = "username for database",
	password = "password for database",
	login_timeout = "29",
	timeout = "23",
	interval = 6,
	buffer = "64000",
	blob_buffer = "64000",
	setStringParameterAsUnicode = "false",
	description = "Put some description here",
	pooling = true,
	maxpooledstatements = 999,
	enableMaxConnections = "true",
	maxConnections = "299",
	enable_clob = true,
	enable_blob = true,
	disable = false,
	storedProc = true,
	alter = false,
	grant = true,
	select = true,
	update = true,
	create = true,
	delete = true,
	drop = false,
	revoke = false );
</cfscript>
