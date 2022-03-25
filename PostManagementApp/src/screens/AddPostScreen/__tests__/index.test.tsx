import React from 'react';
import * as imagePicker from 'react-native-image-picker';
import AddPostScreen from '..';
import * as customHooks from '../../../hooks';
import { fireEvent, render } from '../../../utils/test-utils';
import { mockPhotos, mockPost, mockAdmin } from '../../../__mocks__/data';

describe('Test Add Post Screen', () => {
  const dispatch = jest.fn();
  const spyDispatch = jest.spyOn(customHooks, 'useAppDispatch');
  spyDispatch.mockReturnValue(dispatch);
  const spySelector = jest.spyOn(customHooks, 'useAppSelector');
  spySelector.mockReturnValue(mockAdmin);
  let route: { params: { isMyPost?: boolean; editedPost?: Post } } = {
    params: {
      editedPost: undefined
    }
  };
  let navigation: any;

  beforeEach(() => {
    navigation = {
      navigate: jest.fn()
    };
  });

  afterEach(() => {
    spyDispatch.mockClear();
    spySelector.mockClear();
    jest.clearAllMocks();
  });

  test('should render correctly for add new post', () => {
    const { toJSON } = render(<AddPostScreen navigation={navigation} route={route} />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('should render correctly for edit post', () => {
    route.params.editedPost = mockPost;
    const { toJSON } = render(<AddPostScreen navigation={navigation} route={route} />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('should call function handleChoosePhoto', () => {
    const spy = jest.spyOn(imagePicker, 'launchImageLibrary');
    spy.mockImplementation();
    const { getByTestId } = render(<AddPostScreen navigation={navigation} route={route} />);
    const button = getByTestId('choosePhoto');
    fireEvent.press(button);
    expect(spy).toHaveBeenCalled();
  });

  test('should remove image', () => {
    const { getAllByTestId, getByTestId } = render(
      <AddPostScreen navigation={navigation} route={route} />
    );
    const button = getAllByTestId('closeButton');
    const list = getByTestId('photosList');
    expect(list.props.data).toEqual(mockPhotos);
    fireEvent.press(button[0]);
    expect(list.props.data).toEqual([
      {
        fileName: 'rn_image_picker_lib_temp_283c7c3b-b014-4ef4-b95a-c092bcefe2aa.jpg',
        fileSize: 6689,
        height: 480,
        type: 'image/jpeg',
        uri: 'file:///data/user/0/com.PostManagementApp/cache/rn_image_picker_lib_temp_283c7c3b-b014-4ef4-b95a-c092bcefe2aa.jpg',
        width: 480
      }
    ]);
  });

  test('should change company input', async () => {
    const { getByTestId } = render(<AddPostScreen navigation={navigation} route={route} />);
    const input = getByTestId('companyInput');
    fireEvent.changeText(input, 'test');
    expect(input.props.value).toEqual('test');
  });

  test('should change year input', async () => {
    const { getByTestId } = render(<AddPostScreen navigation={navigation} route={route} />);

    const input = getByTestId('yearInput');
    fireEvent.changeText(input, '-1');
    expect(input.props.value).toEqual('-1');
  });

  test('should change type input', async () => {
    const { getByTestId } = render(<AddPostScreen navigation={navigation} route={route} />);

    const input = getByTestId('typeInput');
    fireEvent.changeText(input, 'test');
    expect(input.props.value).toEqual('test');
  });

  test('should change new status', () => {
    const { getByTestId } = render(<AddPostScreen navigation={navigation} route={route} />);
    const button = getByTestId('newChip');
    fireEvent.press(button);
    expect(button.props.accessibilityState.selected).toBeTruthy();
  });

  test('should change used status', () => {
    const { getByTestId } = render(<AddPostScreen navigation={navigation} route={route} />);
    const button = getByTestId('usedChip');
    fireEvent.press(button);
    expect(button.props.accessibilityState.selected).toBeTruthy();
  });

  test('should change price input', async () => {
    const { getByTestId } = render(<AddPostScreen navigation={navigation} route={route} />);

    const input = getByTestId('priceInput');
    fireEvent.changeText(input, '123');
    expect(input.props.value).toEqual('123');
  });

  test('should change address input', async () => {
    const { getByTestId } = render(<AddPostScreen navigation={navigation} route={route} />);

    const input = getByTestId('addressInput');
    expect(input.props.value).toEqual('199 Bergen Street, Bowie, Oregon, 7933');
    fireEvent.changeText(input, 'asd');
    expect(input.props.value).toEqual('asd');
  });

  test('should change title input', async () => {
    const { getByTestId } = render(<AddPostScreen navigation={navigation} route={route} />);

    const input = getByTestId('titleInput');
    fireEvent.changeText(input, '123');
    expect(input.props.value).toEqual('123');
  });

  test('should change description input', async () => {
    const { getByTestId } = render(<AddPostScreen navigation={navigation} route={route} />);

    const input = getByTestId('descriptionInput');
    fireEvent.changeText(input, '123');
    expect(input.props.value).toEqual('123');
  });

  test('should call function handleSubmit edit post', () => {
    const { getByTestId } = render(<AddPostScreen navigation={navigation} route={route} />);
    const input = getByTestId('addressInput');
    fireEvent.changeText(input, '');
    const button = getByTestId('submitButton');
    fireEvent.press(button);
    expect(dispatch).toHaveBeenCalled();
  });

  test('should call function handleSubmit invalid input', () => {
    route.params.editedPost = undefined;
    const { getByTestId } = render(<AddPostScreen navigation={navigation} route={route} />);
    const button = getByTestId('submitButton');
    const input = getByTestId('yearInput');
    const message = getByTestId('yearError');
    fireEvent.changeText(input, 'asd');
    fireEvent.press(button);
    expect(message.children).toEqual(['']);
  });

  test('should call function handleSubmit add new post', () => {
    const { getByTestId } = render(<AddPostScreen navigation={navigation} route={route} />);
    const companyInput = getByTestId('companyInput');
    fireEvent.changeText(companyInput, 'asd');
    const yearInput = getByTestId('yearInput');
    fireEvent.changeText(yearInput, '123');
    const typeInput = getByTestId('typeInput');
    fireEvent.changeText(typeInput, 'asd');
    const priceInput = getByTestId('priceInput');
    fireEvent.changeText(priceInput, '123');
    const titleInput = getByTestId('titleInput');
    fireEvent.changeText(titleInput, 'asd');
    const descriptionInput = getByTestId('descriptionInput');
    fireEvent.changeText(descriptionInput, 'asd');
    const button = getByTestId('submitButton');
    fireEvent.press(button);
    expect(dispatch).toHaveBeenCalled();
  });
});
