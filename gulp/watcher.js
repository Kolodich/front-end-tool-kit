// >---------- Modules ----------

const gulp = require('gulp');
const { browserSync } = require('./server');

const { compilePugToHtml, copyHtml } = require('./view');
const { compileScssToCss } = require('./style');
const { compileJs } = require('./script');

const { FONT_EXTS, copyFonts } = require('./font');
const { IMAGE_EXTS, copyImages } = require('./image');
const { FAVICON_EXTS, createFavicon } = require('./favicon');
const { AUDIO_EXTS, copyAudios } = require('./audio');
const { VIDEO_EXTS, copyVideos } = require('./video');

// >---------- Tasks ----------

const watchFiles = (done) => {
	gulp.watch('src/**/*.html', copyHtml);
	gulp.watch('src/**/*.pug', compilePugToHtml);
	gulp.watch('src/**/*.{scss,sass}', compileScssToCss);
	gulp.watch('src/**/*.js', compileJs);
	
	gulp.watch(`src/fonts/**/*.${FONT_EXTS}`, copyFonts);
	gulp.watch(`src/images/**/*.${IMAGE_EXTS}`, copyImages);
	gulp.watch(`src/images/favicons/*.${FAVICON_EXTS}`, createFavicon);
	gulp.watch(`src/audios/**/*.${AUDIO_EXTS}`, copyAudios);
	gulp.watch(`src/videos/**/*.${VIDEO_EXTS}`, copyVideos);

	gulp.watch(`dist/**/*.{html,js}`).on('change', browserSync.reload);

	done();
}

module.exports = {
	watchFiles
}
