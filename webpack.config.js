// >---------- Imports ----------

const { env } = require('process');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const alias = require('./gulp/_aliases').js;

// >---------- Helpers ----------

function getJsEntries() {
	const jsFilesPath = path.resolve(__dirname, 'src/js/');
	const isValidJsFile = s => s.endsWith('.js') && !s.startsWith('_');
	const jsFiles = fs.readdirSync(jsFilesPath).filter(isValidJsFile);
	const entries = {};

	jsFiles.forEach(file => {
		const basename = path.basename(file, '.js');
		entries[basename] = path.resolve(__dirname, `src/js/${file}`);
	});

	return entries;
}

// >---------- Config ----------

const mode = env.NODE_ENV;

const stats = 'errors-warnings'; // See https://webpack.js.org/configuration/stats

const entry = {
	...getJsEntries()
}

const output = {
	filename: '[name].js',
	chunkFilename: 'chunks/[name].js',
}

const resolve = {
	alias: {
		[alias.components]:		path.resolve(__dirname, 'src/components'),
		[alias.node]:	 		path.resolve(__dirname, 'node_modules'),
		[alias.utils]:	 		path.resolve(__dirname, 'src/js/utils'),
		[alias.js]:	 			path.resolve(__dirname, 'src/js'),
	}
}

const performance = {
	maxEntrypointSize: mode === 'production' ? 204800 : 204800*3
}

const plugins = [
	new webpack.DefinePlugin({
		'$PRODUCTION': env.NODE_ENV === 'production'
	}),
	...(env.SCRIPT_MAP === 'true'
		? [new webpack.SourceMapDevToolPlugin({ filename: 'maps/[name]-[contenthash].js.map'})]
		: []
	)
]

const _module = {
	rules: [
		...(env.BABEL === 'true'
				? [{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/
					}]
				: []
		)
	]
}

const optimization = {
	splitChunks: {
		cacheGroups: {
			node: {
				test: /node_modules/,
				name: 'node-modules-bundle',
				enforce: true,
			},
			utils: {
				test: /src[\\/]js[\\/]utils/,
				name: 'utils-bundle',
				enforce: true,
			}
		}
	}
}

module.exports = {
	mode,
	stats,
	entry,
	output,
	resolve,
	performance,
	plugins,
	module: _module,
	optimization
}
