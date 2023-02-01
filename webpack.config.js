import path from "path";

export default {
	target: "node",
	mode: "development",
	devtool: "inline-source-map",

	entry: {
		min: path.resolve("./lib/index.js"),
	},
	output: {
		path: path.resolve("./"),
		filename: "[name].js",
		library: "thesaurus",
		libraryTarget: "window",
		assetModuleFilename: "[name][hash][ext][query]",
	},
	resolve: {
		extensions: [".js"],
	},
	plugins: [],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: [
								// [
								//   '@babel/preset-env',
								//   {
								//     'modules': 'auto',//commonjs,amd,umd,systemjs,auto
								//     'useBuiltIns': 'usage',
								//     'targets': '> 0.25%, not dead',
								//     'corejs': 3
								//   }
								// ]
							],
						},
					},
				],
			},
		],
	},
};
