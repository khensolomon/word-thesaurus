import webpack from 'webpack';
import { merge } from 'webpack-merge';
import common from './webpack.config.js';

// @ts-ignore
const config = merge(common, {
  mode: 'production',
  devtool:'source-map',
  // entry: {
  //   min:path.resolve('./lib/index.js')
  // },
  // plugins: []
});

// @ts-ignore
const app = webpack(config);
// app.compile(function(e){
//   console.log(e);
// })
app.run(function(e){
  console.log('...',e||'done');
});