// >---------- Imports ----------

const browserSync = require('browser-sync').create();

// >---------- Tasks ----------

const initServer = done => {
	browserSync.init({
		server: {
			baseDir: "dist",
		}
	}, );
	if (typeof done === 'function') 
		done();
}

module.exports = {
	initServer,
	browserSync
}
