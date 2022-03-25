// >---------- Imports ----------

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sassVars = require('gulp-sass-vars');
const gulpif = require('gulp-if');
const { env } = require("process");
const postcss = require("gulp-postcss");
const sourcemaps = require('gulp-sourcemaps');
const { CONTACTS } = require('./_contacts.js');
const headerComment = require('gulp-header-comment');
const styleAlises = require('gulp-style-aliases');
const alias = require('./_aliases').scss;
const { browserSync } = require('./server');
const replace = require('gulp-replace');
const debug = require('gulp-debug');
const cached = require('gulp-cached');

// >---------- Consts ----------

const SEARCH_IMPORT_FONT_REGEX = new RegExp(`@import.*url\\(.*${alias.fonts}.+?\\)`);
const SEARCH_URL_REGEX = new RegExp(`url\\(.*?${alias.images}.+?\\)`);

const ALIASES_CONFIG = {
	[alias.fonts]: 		'../fonts',
	[alias.components]: 'src/components',
	[alias.node]: 		'node_modules',
	[alias.utils]: 		'src/scss/utils',
	[alias.base]: 		'src/scss/base',
	[alias.scss]: 		'src/scss'
}

const SASS_VARS = {
	PRODUCTION: env.NODE_ENV === 'production'
}

// >---------- Functions ----------

const fixFontsPath = str => str.replace(alias.fonts, '../fonts');
const fixUrlPath = str => str.replace(alias.images, '../images');

// >---------- Tasks ----------

const compileScssToCss = () => {
	return gulp.src(['src/scss/**/[!_]*.{scss,sass}'], { nodir: true })
		.pipe(gulpif(env.STYLE_MAP === 'true', sourcemaps.init()))
		.pipe(replace(SEARCH_URL_REGEX, fixUrlPath))
		.pipe(styleAlises(ALIASES_CONFIG))
		.pipe(sassVars(SASS_VARS, { verbose: false }))
		.pipe(sass().on('error', sass.logError))
		.pipe(cached('styles'))
		.pipe(replace(SEARCH_IMPORT_FONT_REGEX, fixFontsPath))
		.pipe(replace(SEARCH_URL_REGEX, fixUrlPath))
		.pipe(postcss())
		.pipe(debug({ title: "CSS files: " }))
		.pipe(gulpif(env.COPYRIGHT === 'true', headerComment(CONTACTS)))
		.pipe(gulpif(env.STYLE_MAP === 'true', sourcemaps.write('map')))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
}

module.exports = {
	compileScssToCss,
}
