// >---------- Imports ----------

const gulp = require('gulp');
const rename = require("gulp-rename");
const path = require('path');
const cached = require('gulp-cached');
const debug = require('gulp-debug');

// >---------- Consts ----------

const IMAGE_EXTS = '{png,jpg,jpeg,awif,webp,svg,gif}';

// >---------- Tasks ----------

const copyImages = () => {
	return gulp.src([`src/images/**/*.${IMAGE_EXTS}`], { nodir: true })
		.pipe(cached('images'))
		.pipe(debug({ title: 'Image files: ' }))
		.pipe(rename( p => { p.dirname = path.join("/images", p.dirname); }) )
		.pipe(gulp.dest('dist'))
}

module.exports = {
	IMAGE_EXTS,
	copyImages,
}
