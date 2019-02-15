const commonConfig = require('./build-utils/webpack.common');
const webpackMerge = require('webpack-merge');

module.exports = env => {
  console.log('[Build Environment]:', env)

  const envConfig = require(`./build-utils/webpack.${env.env}.js`);
  const mergedConfig = webpackMerge(
    commonConfig,
    envConfig,
  );

  return mergedConfig;
};
