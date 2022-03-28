import AsyncStorage from '@react-native-async-storage/async-storage';

const sortDesc = (arr: Post[] = []) => {
  return arr.sort((a, b) => ((a.id || 0) < (b.id || 0) ? 1 : -1));
};

const formatPrice = (price: Number) => {
  return price.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND'
  });
};

const getApprovedPosts = (arr: Post[] = []) => arr.filter((item) => !item.pending);

const setAccessToken = async (access_token: string) =>
  await AsyncStorage.setItem('access_token', access_token);

const getAccessToken = async () => await AsyncStorage.getItem('access_token');

const removeAccessToken = async () => await AsyncStorage.removeItem('access_token');

export {
  sortDesc,
  formatPrice,
  getApprovedPosts,
  setAccessToken,
  getAccessToken,
  removeAccessToken
};
