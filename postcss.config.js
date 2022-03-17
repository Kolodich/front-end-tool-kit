// >---------- Imports ----------

const sortMediaQueries = require('postcss-sort-media-queries');
const declarationSorter = require('css-declaration-sorter');
const autoprefixer = require('autoprefixer')
const normalizeUrl = require('postcss-normalize-url');
const cssnano = require('cssnano');
const { env } = require('process');

// >---------- Presets ----------

const PRODUCTION_PLIGINS = [
	sortMediaQueries({ sort: 'mobile-first' /* 'desktop-first' */ }),
	declarationSorter({ "order": 'concentric-css' }),
	autoprefixer(),
	normalizeUrl()
]

const MIN_PLUGINS = [
	cssnano()
]

// >---------- Plugins ----------

const plugins = [
	...(env.NODE_ENV === 'production' ? PRODUCTION_PLIGINS : []),
	...(env.STYLE_MIN === 'true' ? MIN_PLUGINS : []),
]

module.exports = {
	plugins
}
