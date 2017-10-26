"use strict";
var QueryFile = require('pg-promise').QueryFile;
var path = require('path');

function sql(file)
{
	const fullPath = path.join(__dirname, file);
	return new QueryFile(fullPath, {minify: true});
}

module.exports = {
	queries: {
		search: sql('queries/search.sql'),
		searchAll: sql('queries/searchAll.sql'),
		top4: sql('queries/top4.sql')
	}
};