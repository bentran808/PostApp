import React, {useState} from 'react';
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
import FormInput from '../components/FormInput';
import {Picker} from '@react-native-picker/picker';

const AddPostScreen = () => {
    const [photo, setPhoto] = useState<any>();
    const [first, setFirst] = useState('');
    const [status, setStatus] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleChoosePhoto = () => {
        launchImageLibrary(
            {
                // noData: true,
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

    return (
        <ScrollView style={styles.body}>
            <Picker
                mode="dropdown"
                selectedValue={selectedCategory}
                onValueChange={itemValue => setSelectedCategory(itemValue)}>
                <Picker.Item label="Motorcycle" value="motor" />
                <Picker.Item label="Car" value="car" />
            </Picker>
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
                <FormInput
                    iconType=""
                    value={''}
                    // onChangeText={userEmail => setEmail(userEmail)}
                    placeholderText="Motor Company"
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                />
                <FormInput
                    iconType=""
                    value={''}
                    // onChangeText={userEmail => setEmail(userEmail)}
                    placeholderText="Year of registration"
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                />
                <FormInput
                    iconType=""
                    value={''}
                    // onChangeText={userEmail => setEmail(userEmail)}
                    placeholderText="Range of vehicle"
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                />
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
                <FormInput
                    iconType=""
                    value={''}
                    // onChangeText={userEmail => setEmail(userEmail)}
                    placeholderText="Number of kilometers traveled"
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                />
                <FormInput
                    iconType=""
                    value={''}
                    // onChangeText={userEmail => setEmail(userEmail)}
                    placeholderText="Price"
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                />
            </View>
            <Text style={styles.titleSection}>Title and Description</Text>
            <View style={styles.section}>
                <FormInput
                    iconType=""
                    value={''}
                    // onChangeText={userEmail => setEmail(userEmail)}
                    placeholderText="Title"
                    autoCorrect={false}
                    autoCapitalize="none"
                />
                <FormInput
                    iconType=""
                    value={first}
                    onChangeText={description => setFirst(description)}
                    placeholderText="Description"
                    multiline
                    numberOfLines={4}
                />
            </View>
            <View style={{marginBottom: 20}}>
                <FormButton title="Choose Photo" onPress={handleChoosePhoto} />
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
        paddingHorizontal: 10,
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
