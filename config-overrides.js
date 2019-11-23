module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function (config, env) {
    // ...add your webpack config
    config.module.rules.push(
        {
          test: /\.worker\.js$/,
          use: {loader: 'worker-loader'}
        }
    );
    return config;
  }
};
