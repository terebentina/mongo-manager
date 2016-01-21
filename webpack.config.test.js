var path = require('path');
var webpack = require('webpack');
var AUTOPREFIXER_PARAMS = 'browsers=last 2 version';

var babelConfig = {
	stage: 0,
	optional: ['runtime'],
};

module.exports = {
	entry: {
		test: [path.join(__dirname, 'tests.bootstrap.js')],
	},
	output: {
		path: path.join(__dirname, './static'),
		filename: '[name].js',
	},
	module: {
		loaders: [
			{ test: /\.jsx?$/, loader: 'babel', query: babelConfig, include: path.join(__dirname, 'src/client') },
			{ test: /\.scss$/, loader: 'style!css?sourceMap!autoprefixer?' + AUTOPREFIXER_PARAMS + '!sass?outputStyle=expanded&sourceMap&sourceMapContents' },
			{ test: /\.css$/, loader: 'style!css?sourceMap!autoprefixer?' + AUTOPREFIXER_PARAMS },
		],
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		modulesDirectories: ['src', 'node_modules'],
	},
	node: {
		fs: 'empty',
	},
};
