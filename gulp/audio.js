// >---------- Imports ----------

const gulp = require('gulp');
const cached = require('gulp-cached');
const debug = require('gulp-debug');

// >---------- Constans ----------

const AUDIO_EXTS = '{wav,mp3,ogg}';

// >---------- Tasks ----------

const copyAudios = () => {
	return gulp.src([`src/fonts/**/*.${AUDIO_EXTS}`], { allowEmpty: true })
		.pipe(cached('audios'))
		.pipe(debug({ title: 'Audio files: ' }))
		.pipe(gulp.dest('dist/audios'))
}

module.exports = {
	AUDIO_EXTS,
	copyAudios
}
