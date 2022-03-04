import React, {useContext, useEffect, useState} from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import FormButton from '../components/FormButton';
import {launchImageLibrary} from 'react-native-image-picker';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {axiosInstance} from '../utils/AxiosConfig';
import {CounterContext} from '../navigation/CounterContext';
import axios from 'axios';
import {Button, HelperText, TextInput} from 'react-native-paper';

type AddPostNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface AddPostProps {
    navigation: AddPostNavigationProp;
    route: {params: {editedId: Number}};
}

const AddPostScreen = ({navigation, route}: AddPostProps) => {
    const {user} = useContext(CounterContext);
    const [photo, setPhoto] = useState<any>();
    const [company, setCompany] = useState('');
    const [year, setYear] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState(true);
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const postId = route.params && route.params.editedId;
    const [errorInput, setErrorInput] = useState({
        company: false,
        year: false,
        invalidYear: false,
        type: false,
        price: false,
        minOfPrice: false,
        maxOfPrice: false,
        title: false,
        description: false
    });

    useEffect(() => {
        if (postId) {
            const source = axios.CancelToken.source();
            const getEditedPost = async () => {
                try {
                    const response = await axiosInstance.get(
                        `api/posts/${postId}`,
                        {
                            cancelToken: source.token,
                            headers: {
                                Authorization: `Bearer ${user.access_token}`
                            }
                        }
                    );
                    if (response.status === 200) {
                        setCompany(response.data.company);
                        setYear(response.data.year);
                        setType(response.data.type);
                        setStatus(response.data.status);
                        setPrice(response.data.price);
                        setAddress(response.data.address);
                        setTitle(response.data.title);
                        setDescription(response.data.description);
                        return;
                    } else {
                        throw new Error('Failed to fetch users');
                    }
                } catch (error) {
                    if (axios.isCancel(error)) {
                        console.log('Data fetching cancelled');
                    } else {
                        console.log(error);
                    }
                }
            };
            getEditedPost();
            return () => source.cancel('Data fetching cancelled');
        }
    }, [postId, user.access_token]);

    const handleChoosePhoto = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                selectionLimit: 0
            },
            response => {
                if (response) {
                    setPhoto(response.assets);
                }
            }
        );
    };

    const addNewPost = async () => {
        try {
            const response = await axiosInstance.post(
                'api/posts',
                {
                    author: user.data,
                    company,
                    year,
                    type,
                    status,
                    price,
                    address: address || user.data.address,
                    title,
                    description,
                    photos: [],
                    likes: [],
                    comments: []
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.status === 200) {
                navigation.navigate('HomeScreen');
                return;
            } else {
                throw new Error('Failed to fetch users');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const editPost = async () => {
        try {
            const response = await axiosInstance.patch(
                `api/posts/${postId}`,
                {
                    company,
                    year,
                    type,
                    status,
                    price,
                    address: address || user.data.address,
                    title,
                    description
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.status === 200) {
                navigation.navigate('HomeScreen');
                return;
            } else {
                throw new Error('Failed to fetch users');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ScrollView style={styles.body}>
            {photo?.length && (
                <>
                    <FlatList
                        data={photo}
                        horizontal
                        renderItem={({item}) => (
                            <Image
                                source={{uri: item.uri}}
                                style={{width: 100, height: 100}}
                            />
                        )}
                    />
                </>
            )}
            <Text style={styles.titleSection}>Details</Text>
            <View style={styles.section}>
                <TextInput
                    value={company}
                    autoFocus
                    onChangeText={itemValue => setCompany(itemValue)}
                    label="Product Company"
                    mode="outlined"
                    error={errorInput.company}
                    onBlur={() =>
                        setErrorInput({...errorInput, company: !company})
                    }
                />
                <HelperText type="error" visible={errorInput.company}>
                    You must enter this field!
                </HelperText>
                <TextInput
                    value={year}
                    onChangeText={itemValue => setYear(itemValue)}
                    label="Year of registration"
                    keyboardType="number-pad"
                    mode="outlined"
                    error={errorInput.year || errorInput.invalidYear}
                    onBlur={() => {
                        const hasError =
                            Number(year) > new Date().getFullYear();
                        setErrorInput({
                            ...errorInput,
                            year: !year,
                            invalidYear: hasError
                        });
                    }}
                />
                <HelperText
                    type="error"
                    visible={errorInput.year || errorInput.invalidYear}>
                    {errorInput.year && 'You must enter this field!'}
                    {errorInput.invalidYear &&
                        'You must enter year less than current year!'}
                </HelperText>
                <TextInput
                    value={type}
                    onChangeText={itemValue => setType(itemValue)}
                    label="Type of product"
                    mode="outlined"
                    error={errorInput.type}
                    onBlur={() => setErrorInput({...errorInput, type: !type})}
                />
                <HelperText type="error" visible={errorInput.type}>
                    You must enter this field!
                </HelperText>
                <Text>Status</Text>
                <View style={styles.statusWrapper}>
                    <Text
                        onPress={() => setStatus(true)}
                        style={
                            status ? styles.statusActive : styles.statusInactive
                        }>
                        Used
                    </Text>
                    <Text
                        onPress={() => setStatus(false)}
                        style={
                            status ? styles.statusInactive : styles.statusActive
                        }>
                        New
                    </Text>
                </View>
                <TextInput
                    value={price}
                    onChangeText={itemValue => setPrice(itemValue)}
                    label="Price"
                    keyboardType="number-pad"
                    mode="outlined"
                    error={
                        errorInput.price ||
                        errorInput.minOfPrice ||
                        errorInput.maxOfPrice
                    }
                    onBlur={() =>
                        setErrorInput({
                            ...errorInput,
                            price: !price,
                            minOfPrice: Number(price) < 1000,
                            maxOfPrice: Number(price) > 100000000
                        })
                    }
                />
                <HelperText
                    type="error"
                    visible={
                        errorInput.price ||
                        errorInput.minOfPrice ||
                        errorInput.maxOfPrice
                    }>
                    {errorInput.price && 'You must enter this field!'}
                    {errorInput.minOfPrice &&
                        'You must enter the minimum price 1.000 VND!'}
                    {errorInput.maxOfPrice &&
                        'You can only enter the maximum price 100.000.000 VND!'}
                </HelperText>
                <TextInput
                    value={address}
                    onChangeText={itemValue => setAddress(itemValue)}
                    label="Address"
                    mode="outlined"
                />
            </View>
            <Text style={styles.titleSection}>Title and Description</Text>
            <View style={styles.section}>
                <TextInput
                    value={title}
                    onChangeText={itemValue => setTitle(itemValue)}
                    label="Title"
                    mode="outlined"
                    error={errorInput.title}
                    onBlur={() => setErrorInput({...errorInput, title: !title})}
                />
                <HelperText type="error" visible={errorInput.title}>
                    You must enter this field!
                </HelperText>
                <TextInput
                    value={description}
                    onChangeText={itemValue => setDescription(itemValue)}
                    label="Description"
                    multiline
                    numberOfLines={4}
                    mode="outlined"
                    error={errorInput.description}
                    onBlur={() =>
                        setErrorInput({
                            ...errorInput,
                            description: !description
                        })
                    }
                />
                <HelperText type="error" visible={errorInput.description}>
                    You must enter this field!
                </HelperText>
            </View>
            <View style={{marginBottom: 20}}>
                <FormButton title="Choose Photo" onPress={handleChoosePhoto} />
                <Button
                    mode="contained"
                    color="#2e64e5"
                    disabled={Object.values(errorInput).includes(true)}
                    onPress={() => {
                        postId ? editPost : addNewPost;
                    }}>
                    {postId ? 'Save' : 'Post'}
                </Button>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingVertical: 20
    },
    titleSection: {
        color: '#333',
        fontWeight: 'bold',
        paddingHorizontal: 10
    },
    section: {
        backgroundColor: '#fff',
        marginBottom: 20,
        padding: 10,
        width: '100%'
    },
    statusWrapper: {
        flexDirection: 'row',
        marginVertical: 10
    },
    statusInactive: {
        backgroundColor: '#ccc',
        color: '#000',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginRight: 10
    },
    statusActive: {
        backgroundColor: '#faedc8',
        color: '#fcba03',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginRight: 10
    }
});

export default AddPostScreen;
