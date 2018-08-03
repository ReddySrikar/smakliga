const path = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js'
  }
};
// The path property can only take an absolute path as an attribute, so we cannot write the whole path, and instead we use...
// Here, "path" is an inbuilt npm package that needs to be used here to get the absolute path.


// later on look at loaders and plugins.
