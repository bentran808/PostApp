import { sortDesc, getApprovedPosts, setAccessToken, getAccessToken } from '../helpers';
import { mockPost } from '../../__mocks__/data';

describe('Test helpers', () => {
  test('should call function sortDesc', () => {
    const arr = [
      { ...mockPost, id: undefined },
      mockPost,
      { ...mockPost, id: 3 },
      { ...mockPost, id: undefined }
    ];
    const results = [
      { ...mockPost, id: 3 },
      mockPost,
      { ...mockPost, id: undefined },
      { ...mockPost, id: undefined }
    ];
    expect(sortDesc(arr)).toEqual(results);
  });

  test('should call function getApprovedPosts', () => {
    expect(getApprovedPosts([mockPost])).toEqual([mockPost]);
  });

  test('should call function setAccessToken', async () => {
    expect(await setAccessToken('token')).toEqual(null);
  });

  test('should call function getAccessToken', async () => {
    expect(await getAccessToken()).toEqual('token');
  });
});
