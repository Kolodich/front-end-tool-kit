// >---------- Tasks ----------

const gulp = require('gulp');
const cached = require('gulp-cached');
const debug = require('gulp-debug');

// >---------- Consts ----------

const VIDEO_EXTS = '{mp4,webm,ogv,ogg,flv,mpd}';

// >---------- Tasks ----------

const copyVideos = () => {
	return gulp.src([`src/fonts/**/*.${VIDEO_EXTS}`], { allowEmpty: true })
		.pipe(cached('videos'))
		.pipe(debug({ title: 'Video files: ' }))
		.pipe(gulp.dest('dist/videos'))
}

module.exports = {
	VIDEO_EXTS,
	copyVideos
}
