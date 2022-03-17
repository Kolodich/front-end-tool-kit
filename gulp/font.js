// >---------- Imports ----------

const gulp = require('gulp');
const cached = require('gulp-cached');
const debug = require('gulp-debug');

// >---------- Consts ----------

const FONT_EXTS = '{ttf,eot,woff,woff2,svg,txt,css}';

// >---------- Tasks ----------

const copyFonts = () => {
	return gulp.src([`src/fonts/**/*.${FONT_EXTS}`], { allowEmpty: true })
		.pipe(cached('fonts'))
		.pipe(debug({ title: 'Font files: ' }))
		.pipe(gulp.dest('dist/fonts'))
}

module.exports = {
	FONT_EXTS,
	copyFonts
}
