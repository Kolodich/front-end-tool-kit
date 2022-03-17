// >---------- Imports ----------

const del = require('del');

// >---------- Tasks ----------

module.exports = {
	clean: 			done => { del.sync('dist'); done(); },
	cleanView: 		done => { del.sync('dist/*.html'); done(); },
	cleanStyle: 	done => { del.sync('dist/css'); done(); },
	cleanScript: 	done => { del.sync('dist/css'); done(); },
	cleanFonts: 	done => { del.sync('dist/fonts'); done(); },
	cleanImages: 	done => { del.sync('dist/images'); done(); },
	cleanFavicons: 	done => { del.sync('dist/images/favicons'); done(); },
	cleanAudios: 	done => { del.sync('dist/audios'); done(); },
	cleanVideos: 	done => { del.sync('dist/videos'); done(); },
}
