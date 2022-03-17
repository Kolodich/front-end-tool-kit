// >---------- Imports ----------

const gulp = require('gulp');
const cached = require('gulp-cached');
const debug = require('gulp-debug');
const favicons = require('gulp-favicons');
const { env } = require('process');

// >---------- Consts ----------

const IS_PROD = env.NODE_ENV === 'production';

const FAVICONS_SETTING = {
	path: 'images/favicons/',
	html: '../../../src/views/utils/_favicons.html',
	pipeHTML: true,
	replace: true,
	icons: {
		android: IS_PROD,
		appleIcon: IS_PROD,
		appleStartup: IS_PROD,
		favicons: true,
		windows: IS_PROD,
		yandex: IS_PROD,
	}
};

const FAVICON_EXTS = '{png,jpg,jpeg,gif}';

// >---------- Tasks ----------

const createFavicon = () => {
	return gulp.src(`src/images/favicons/*.${FAVICON_EXTS}`, { nodir: true })
		.pipe(cached('favicon'))
		.pipe(favicons(FAVICONS_SETTING))
		.pipe(debug({ title: 'Favicon files: ' }))
		.pipe(gulp.dest('dist/images/favicons'))
}

module.exports = {
	FAVICON_EXTS,
	createFavicon
}
