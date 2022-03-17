import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

export const styles = StyleSheet.create({
  commentWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  commentList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  commentInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  commentAvatar: {
    borderRadius: 25,
    height: 25,
    width: 25
  },
  commentUserName: {
    color: Colors.black,
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: 15
  },
  commentTime: {
    fontSize: 12,
    color: '#666',
    marginVertical: 5,
    paddingHorizontal: 15
  },
  commentInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  text_sm: {
    fontSize: 12
  }
});
