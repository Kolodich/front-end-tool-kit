// >---------- Imports ----------

const { CONTACTS } = require('./_contacts.js');
const gulp = require('gulp');
const pug = require('gulp-pug');
const pugAliasPlugin = require('pug-alias');
const { env } = require("process");
const headerComment = require('gulp-header-comment');
const gulpif = require('gulp-if');
const replace = require('gulp-replace');
const { pug: pugAlias, html: htmlAlias } = require('./_aliases');
const fileinclude = require('gulp-file-include');

const beautify = require('gulp-beautify');
const htmlmin = require('gulp-htmlmin');
const inject = require('gulp-inject-string');
const bun = require('bun');
const cached = require('gulp-cached');
const debug = require('gulp-debug');

// >---------- Consts ----------

const SEARSH_TAGS_WITH_SRC_REGEX = /<.*(src|srcset|href|url).+?>/g;

const PUG_ALIASES = {
	[pugAlias.components]: 	p => p.replace(new RegExp(`^${pugAlias.components}`),'src/components'),
	[pugAlias.utils]: 		p => p.replace(new RegExp(`^${pugAlias.utils}`), 'src/views/utils'),
	[pugAlias.pug]: 		p => p.replace(new RegExp(`^${pugAlias.pug}`), 'src/views'),
};

const PUG_PRODUCTION_VAR = `- var $PRODUCTION = ${env.NODE_ENV === 'production'};\n`;

const BEAUTIFY_SETTINGS = { "indent_with_tabs": true, "editorconfig": true,  };

const HTMLMIN_SETTINGS = { collapseWhitespace: true };

// >---------- Functions ----------

const replaceScssToCss = str => str.replace(/(scss|sass)/g, 'css');

const fixRelativePath = str => str.replace('../', '');

const fixInteractiveSrcPath = (str, aliasObj) => {
	if (str.includes(aliasObj.images))
		str = str.replace(aliasObj.images, 'images');
	else if (str.includes(aliasObj.audios))
		str = str.replace(aliasObj.audios, 'audios');
	else if (str.includes(aliasObj.videos))
		str = str.replace(aliasObj.videos, 'videos');
	return str;
}

const fixResources = (str, aliasObj) => {
	str = fixInteractiveSrcPath(str, aliasObj);
	str = replaceScssToCss(str);
	str = fixRelativePath(str);
	return str;
}

const getBunedPipes = fixResourcesFun => {
	return bun([
		cached('view'),
		replace(SEARSH_TAGS_WITH_SRC_REGEX, fixResourcesFun),
		gulpif(env.VIEW_MIN === 'true', htmlmin(HTMLMIN_SETTINGS)),
		gulpif(env.VIEW_MIN === 'false', beautify.html(BEAUTIFY_SETTINGS)),
		gulpif(env.COPYRIGHT === 'true', headerComment(CONTACTS)),
		debug({ title: "HTML files: " }),
		gulp.dest('dist')
	]);
}

// >---------- Pug preset ----------

const PUG_PLUGINS = [
	pugAliasPlugin(PUG_ALIASES)
]

const PUG_OPTIONS = {
	pretty: env.VIEW_MIN !== 'true',
	pug: {
		compile: (data, opts) =>  require('pug').compile(data, { ...opts, plugins: PUG_PLUGINS })
	}
}

// >---------- Tasks ----------

const compilePugToHtml = done => {
	return gulp.src(['./src/index.pug', './src/views/**/[!_]*.pug'], { allowEmpty: true })
		.pipe(inject.prepend(PUG_PRODUCTION_VAR))
		.pipe(pug(PUG_OPTIONS))
		.pipe(getBunedPipes(str => fixResources(str, pugAlias)))
}

const copyHtml = () => {
	return gulp.src(['src/index.html', 'src/views/**/[!_]*.html'], { allowEmpty: true })
		.pipe(fileinclude())
		.pipe(getBunedPipes(str => fixResources(str, htmlAlias)))
}

module.exports = {
	compilePugToHtml,
	copyHtml
}
