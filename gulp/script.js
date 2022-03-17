// >---------- Imports ----------

const gulp = require('gulp');
const webpack = require('webpack-stream');
const { env } = require("process");
const { CONTACTS } = require('./_contacts.js');
const headerComment = require('gulp-header-comment');
const gulpif = require('gulp-if');
const webpackConfig = require('../webpack.config');
const { browserSync } = require('./server');
const debug = require('gulp-debug');
const cached = require('gulp-cached');

// >---------- Tasks ----------

const compileJs = async done => {
	await gulp.src('./')
		.pipe(webpack(webpackConfig)
			.on('error', err => { 
				done(err);
			})
		)
		.pipe(cached('js'))
		.pipe(debug({ title: "JS files: " }))
		.pipe(gulpif(env.COPYRIGHT === 'true', headerComment(CONTACTS)))
		.pipe(gulp.dest('dist/js'));
	done();
}

module.exports = {
	compileJs
}
