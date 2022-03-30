/* eslint-disable react-native/no-inline-styles */
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screens } from 'constants/screens';
import { useAppDispatch, useAppSelector } from 'hooks';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button, Chip, Colors, HelperText, TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from 'theme/Colors';
import { number, object, string } from 'yup';
import { postActions, selectCurrentUser } from '../../redux/slices';
import { styles } from './styles';

type AddPostNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface AddPostProps {
  navigation: AddPostNavigationProp;
  route: { params: { isMyPost?: boolean; editedPost?: Post } };
}

export interface PostState {
  photos: any;
  company: string;
  year: string;
  type: string;
  status: boolean;
  price: string;
  address?: string;
  title: string;
  description: string;
}

export interface ErrorInputState {
  company: string;
  year: string;
  type: string;
  price: string;
  title: string;
  description: string;
}

export const initialPost = {
  photos: [],
  company: '',
  year: '0',
  type: '',
  status: true,
  price: '0',
  address: '',
  title: '',
  description: ''
};

export const initialErrorInput = {
  company: '',
  year: '',
  type: '',
  price: '',
  title: '',
  description: ''
};

const postSchema = object().shape({
  company: string().required(),
  year: number().required().positive().integer(),
  type: string().required(),
  price: number().required().positive().integer(),
  title: string().required(),
  description: string().required()
});

const AddPostScreen = ({ navigation, route }: AddPostProps) => {
  const [post, setPost] = useState<PostState>(initialPost);
  const [errorInput, setErrorInput] = useState<ErrorInputState>(initialErrorInput);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => selectCurrentUser(state));
  const isMyPost = route.params && route.params.isMyPost;
  const editedPost = route.params && route.params.editedPost;
  const buttonText = editedPost ? 'Save' : 'Post';

  useEffect(() => {
    if (editedPost) {
      setPost({
        ...post,
        photos: editedPost.photos,
        company: editedPost.company,
        year: editedPost.year.toString(),
        type: editedPost.type,
        status: editedPost.status,
        price: editedPost.price.toString(),
        address: editedPost.address,
        title: editedPost.title,
        description: editedPost.description
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChoosePhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 0
      },
      (response) => {
        if (response && response.assets) {
          setPost({
            ...post,
            photos: post.photos.concat(response.assets)
          });
        }
      }
    );
  };

  const handleChangePost = (key: string, value: any) => {
    setPost({ ...post, [key]: value });
    validationInput(key, value);
  };

  const validationInput = (key: string, value: string | number) => {
    try {
      const inputSchema = postSchema.pick([key]);
      inputSchema.validateSync({ [key]: value });
      setErrorInput((prevState) => ({ ...prevState, [key]: '' }));
    } catch (err: any) {
      setErrorInput((prevState) => ({ ...prevState, [key]: err.errors[0] }));
    }
  };

  const handleAddNewPost = (newPost: Post) => {
    dispatch(
      postActions.addPost({
        params: newPost,
        callback: (data, error) => {
          if (data) {
            navigation.reset({
              index: 0,
              routes: [{ name: Screens.MY_POST_STACK.name }]
            });
          }

          if (error) {
            Alert.alert(error.response.data.message);
          }
        }
      })
    );
  };

  const handleEditPost = (newPost: Post) => {
    dispatch(
      postActions.editPost({
        postId: editedPost?.id || 0,
        editedPost: newPost,
        callback: (data, error) => {
          if (data) {
            navigation.reset({
              index: 0,
              routes: [{ name: isMyPost ? Screens.MY_POST_STACK.name : Screens.HOME_STACK.name }]
            });
          }

          if (error) {
            Alert.alert(error.response.data.message);
          }
        }
      })
    );
  };

  const handleSubmit = () => {
    const isValid = postSchema.isValidSync(post);
    if (isValid) {
      if (editedPost) {
        handleEditPost({
          author: currentUser,
          company: post.company,
          year: Number(post.year),
          type: post.type,
          status: post.status,
          price: Number(post.price),
          address: post.address || currentUser.address,
          title: post.title,
          description: post.description,
          photos: post.photos
        });
      } else {
        handleAddNewPost({
          author: currentUser,
          company: post.company,
          year: Number(post.year),
          type: post.type,
          status: post.status,
          price: Number(post.price),
          address: post.address || currentUser.address,
          title: post.title,
          description: post.description,
          photos: post.photos,
          pending: true
        });
      }
    } else {
      validationInput('company', post.company);
      validationInput('year', post.year);
      validationInput('type', post.type);
      validationInput('price', post.price);
      validationInput('title', post.title);
      validationInput('description', post.description);
    }
  };

  return (
    <ScrollView style={styles.body}>
      <View style={styles.photoSection}>
        <View style={styles.photoWrapper}>
          <TouchableOpacity
            onPress={handleChoosePhoto}
            style={styles.photoButton}
            testID="choosePhoto"
          >
            <Ionicons name="camera" size={30} color={colors.nightRider} />
            <Text>Choose Photo</Text>
          </TouchableOpacity>
        </View>
        {(post.photos || []).length ? (
          <FlatList
            testID="photosList"
            data={post.photos}
            horizontal
            extraData={post.photos}
            renderItem={({ item, index }) => (
              <>
                <Image source={{ uri: item.uri }} style={styles.previewPhoto} />
                <Ionicons
                  name="close"
                  size={20}
                  color={colors.freeSpeechRed}
                  style={styles.closeButton}
                  onPress={() => {
                    post.photos.splice(index, 1);
                    handleChangePost('photos', post.photos);
                  }}
                  testID="closeButton"
                />
              </>
            )}
          />
        ) : undefined}
      </View>
      <Text style={styles.titleSection}>Details</Text>
      <View style={styles.section}>
        <TextInput
          value={post.company}
          onChangeText={(itemValue) => handleChangePost('company', itemValue)}
          label="Product Company"
          mode="outlined"
          error={!!errorInput.company}
          testID="companyInput"
        />
        <HelperText type="error" visible={!!errorInput.company} testID="companyError">
          {errorInput.company}
        </HelperText>
        <TextInput
          value={post.year}
          onChangeText={(itemValue) => handleChangePost('year', itemValue)}
          label="Year of registration"
          keyboardType="number-pad"
          mode="outlined"
          error={!!errorInput.year}
          testID="yearInput"
        />
        <HelperText type="error" visible={!!errorInput.year} testID="yearError">
          {errorInput.year}
        </HelperText>
        <TextInput
          value={post.type}
          onChangeText={(itemValue) => handleChangePost('type', itemValue)}
          label="Type of product"
          mode="outlined"
          error={!!errorInput.type}
          testID="typeInput"
        />
        <HelperText type="error" visible={!!errorInput.type} testID="typeError">
          {errorInput.type}
        </HelperText>
        <Text>Status</Text>
        <View style={styles.statusWrapper}>
          <Chip
            selected={post.status}
            selectedColor={post.status ? colors.selectiveYellow : Colors.black}
            textStyle={{
              color: post.status ? colors.selectiveYellow : Colors.black
            }}
            style={{
              backgroundColor: post.status ? colors.oasis : colors.lightGrey,
              marginRight: 10
            }}
            onPress={() => handleChangePost('status', true)}
            testID="usedChip"
          >
            Used
          </Chip>
          <Chip
            selected={!post.status}
            selectedColor={!post.status ? colors.selectiveYellow : Colors.black}
            textStyle={{
              color: !post.status ? colors.selectiveYellow : Colors.black
            }}
            style={{
              backgroundColor: !post.status ? colors.oasis : colors.lightGrey
            }}
            onPress={() => handleChangePost('status', false)}
            testID="newChip"
          >
            New
          </Chip>
        </View>
        <TextInput
          value={post.price}
          onChangeText={(itemValue) => handleChangePost('price', itemValue)}
          label="Price"
          keyboardType="number-pad"
          mode="outlined"
          error={!!errorInput.price}
          testID="priceInput"
        />
        <HelperText type="error" visible={!!errorInput.price} testID="priceError">
          {errorInput.price}
        </HelperText>
        <TextInput
          value={post.address}
          onChangeText={(itemValue) => handleChangePost('address', itemValue)}
          label="Address"
          mode="outlined"
          testID="addressInput"
        />
      </View>
      <Text style={styles.titleSection}>Title and Description</Text>
      <View style={styles.section}>
        <TextInput
          value={post.title}
          onChangeText={(itemValue) => handleChangePost('title', itemValue)}
          label="Title"
          mode="outlined"
          error={!!errorInput.title}
          testID="titleInput"
        />
        <HelperText type="error" visible={!!errorInput.title} testID="titleError">
          {errorInput.title}
        </HelperText>
        <TextInput
          value={post.description}
          onChangeText={(itemValue) => handleChangePost('description', itemValue)}
          label="Description"
          multiline
          numberOfLines={4}
          mode="outlined"
          error={!!errorInput.description}
          testID="descriptionInput"
        />
        <HelperText type="error" visible={!!errorInput.description} testID="descriptionError">
          {errorInput.description}
        </HelperText>
      </View>
      <View style={{ marginBottom: 40 }}>
        <Button
          mode="contained"
          color={colors.royalBlue}
          disabled={Object.values(errorInput).includes(true)}
          onPress={handleSubmit}
          testID="submitButton"
        >
          {buttonText}
        </Button>
      </View>
    </ScrollView>
  );
};

export default AddPostScreen;
