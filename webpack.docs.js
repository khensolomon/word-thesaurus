import path from "path";
import { VueLoaderPlugin } from "vue-loader";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default {
	// target: "node",
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		static: {
			directory: path.resolve("./docs/")
		},
		port: 8080
	},

	entry: {
		script: [
			// NOTE: HTML
			path.resolve("./assets/html/index.html"),
			// NOTE: script
			path.resolve("./assets/script/script.js"),
			// NOTE: layout and design
			path.resolve("./assets/style/style.scss"),
			// NOTE: icons and loader animation
			path.resolve("./assets/icon/animation.css"),
			path.resolve("./assets/icon/notation.css"),
			// NOTE: favicon
			path.resolve("./assets/img/favicon.png"),
			path.resolve("./assets/img/favicon-32x32.png"),
			path.resolve("./assets/img/apple-touch-icon.png"),
			path.resolve("./assets/img/android-chrome-192x192.png"),
			path.resolve("./assets/img/android-chrome-512x512.png"),
			path.resolve("./assets/img/app.webmanifest")
		]
	},
	output: {
		path: path.resolve("./docs"),
		publicPath: "/",
		filename: "[name].js",
		assetModuleFilename: "[name][hash][ext][query]"
	},
	resolve: {
		extensions: [".js", ".vue", ".json", ".css", ".scss"],
		alias: {
			// 'vue$': 'vue/dist/vue.esm.js'
			// vue$: "vue/dist/vue.esm-browser.js"
			vue$: "vue/dist/vue.esm-bundler.js"
		}
	},
	externals: {
		vue: "Vue",
		"vue-router": "VueRouter"
	},

	optimization: {
		// minimize: false
	},
	plugins: [
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({ filename: "style.css" })
	],
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: "vue-loader"
			},
			{
				test: /\.exec\.js$/,
				use: ["script-loader"]
			},
			{
				test: /\.(sa|sc|c)ss$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: []
						}
					}
				]
			},
			// {
			//   test: /\.(png|ico|jpg|gif|svg|eot|ttf|woff|woff2|webmanifest|html)$/,
			//   loader: 'file-loader',
			//   options: {
			//     name: '[name].[ext]',
			//     limit: 10000
			//   }
			// }
			{
				test: /\.(png|ico|jpg|gif|svg|eot|ttf|woff|woff2|webmanifest|html)$/,
				type: "asset/resource",
				generator: {
					filename: "[name][ext]"
				}
			}
		]
	}
};
