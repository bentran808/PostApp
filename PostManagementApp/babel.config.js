module.exports = (api) => {
  api.cache.never();

  return {
    presets: process.env.MINI_PROGRAM === 'true' ? [] : ['module:metro-react-native-babel-preset']
  };
};
