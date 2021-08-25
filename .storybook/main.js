const path = require("path");
module.exports = {
  stories: ["../stories/*.stories.ts"],
  addons: ['@storybook/addon-essentials'],
  webpackFinal: async (config, {configType}) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          modules: true
        }
      }, 'sass-loader'],
    })
    config.resolve.alias["@"] = path.resolve(__dirname, "../packages")
    return config;
  },
};
