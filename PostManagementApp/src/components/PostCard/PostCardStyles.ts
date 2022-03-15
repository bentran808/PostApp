import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import { colors } from '../../constants/colors';
import { windowHeight, windowWidth } from '../../utils/Dimensions';

export const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        marginBottom: 20,
        paddingBottom: 10,
        width: windowWidth * 0.9
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 15
    },
    avatar: {
        borderRadius: 25,
        height: 50,
        width: 50
    },
    userInfoText: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10
    },
    userName: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    postTime: {
        fontSize: 12,
        color: '#666',
        marginVertical: 5,
        paddingHorizontal: 15
    },
    postTitle: {
        color: Colors.black,
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        paddingLeft: 15
    },
    postPrice: {
        color: colors.freeSpeechRed,
        fontSize: 14,
        fontWeight: 'bold',
        paddingLeft: 15
    },
    postLocation: {
        flexDirection: 'row',
        paddingLeft: 15
    },
    postAddress: {
        color: Colors.black,
        fontSize: 14,
        marginLeft: 5
    },
    infoSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10
    },
    postText: {
        fontSize: 14,
        marginBottom: 15,
        paddingHorizontal: 15
    },
    divider: {
        alignSelf: 'center',
        borderBottomColor: colors.gainsboro,
        borderBottomWidth: 1,
        marginTop: 15,
        width: '92%'
    },
    buttonControls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10
    },
    emptyList: {
        textAlign: 'center',
        marginTop: 10
    },
    interactionWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 15,
        paddingTop: 15
    },
    interaction: {
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 5,
        paddingVertical: 2
    },
    interactionText: {
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 5
    },
    commentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    commentInput: {
        width: '80%',
        height: windowHeight / 20
    },
    text_sm: {
        fontSize: 12
    }
});
