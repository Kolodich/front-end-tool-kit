// >---------- Imports ----------

const gulp 			= require('gulp');
const cached 		= require('gulp-cached');
const { env } 		= require('process');
const yargs 		= require('yargs/yargs');
const { hideBin } 	= require('yargs/helpers');
const argv 			= yargs(hideBin(process.argv)).argv;

// >---------- Flags ----------

env.NODE_ENV 	= 'production' in argv ? 'production' : 'development';
env.BABEL 		= 'babel' in argv;
env.STYLE_MAP 	= 'style-map' in argv;
env.SCRIPT_MAP 	= 'script-map' in argv;
env.VIEW_MIN 	= 'view-min' in argv;
env.STYLE_MIN 	= 'style-min' in argv;
env.COPYRIGHT 	= 'copyright' in argv || 'copy' in argv;

// >---------- Gulp modules ----------

const { compilePugToHtml, copyHtml } = require('./gulp/view');
const { compileScssToCss } = require('./gulp/style');
const { compileJs } = require('./gulp/script');

const { copyFonts } = require('./gulp/font');
const { copyImages } = require('./gulp/image');
const { createFavicon } = require('./gulp/favicon');
const { copyAudios } = require('./gulp/audio');
const { copyVideos } = require('./gulp/video');

const dist = require('./gulp/dist');
const { initServer } = require('./gulp/server');
const { watchFiles } = require('./gulp/watcher');

// >---------- Tasks ----------

cached.caches = {};

gulp.task('build:view', gulp.series(
	dist.cleanView,
	gulp.parallel(compilePugToHtml, copyHtml)
));
gulp.task('build:style', gulp.series(dist.cleanStyle, compileScssToCss));
gulp.task('build:script', gulp.series(dist.cleanScript, compileJs));
gulp.task('build:image', gulp.series(dist.cleanImages, copyImages));
gulp.task('build:favicon', gulp.series( // build favicons and rebuild views
	dist.cleanFavicons,
	gulp.series(createFavicon, 'build:view')
));
gulp.task('build:other', gulp.series(
	gulp.parallel(dist.cleanFonts, dist.cleanAudios, dist.cleanVideos),
	gulp.parallel(copyFonts, copyAudios, copyVideos)
));
gulp.task('build', gulp.series(
	dist.clean,
	gulp.parallel(
		'build:favicon',
		'build:style' ,
		'build:script',
		'build:image',
		'build:other'
	)
));

gulp.task('clean', gulp.series(dist.clean));
gulp.task('watch', gulp.series('build', watchFiles));
gulp.task('dev', gulp.series('build', initServer, watchFiles));
