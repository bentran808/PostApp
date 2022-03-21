module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    ['@babel/preset-env', { modules: 'commonjs' }]
  ],
  env: {
    test: {
      presets: ['module:metro-react-native-babel-preset', ['@babel/preset-env']]
    }
  },
  plugins: ['babel-plugin-module-resolver']
};
