import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import { colors } from 'theme/Colors';

export const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingVertical: 20
  },
  photoSection: {
    flexDirection: 'row'
  },
  photoWrapper: {
    padding: 10,
    borderColor: colors.nightRider,
    backgroundColor: colors.gainsboro,
    marginLeft: 10,
    flex: 0
  },
  photoButton: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  previewPhoto: {
    width: 75,
    height: 75,
    marginLeft: 10
  },
  closeButton: {
    position: 'relative',
    left: -15,
    top: -5
  },
  titleSection: {
    color: colors.nightRider,
    fontWeight: 'bold',
    paddingHorizontal: 10
  },
  section: {
    backgroundColor: Colors.white,
    marginBottom: 20,
    padding: 10,
    width: '100%'
  },
  statusWrapper: {
    flexDirection: 'row',
    marginVertical: 10
  },
  statusInactive: {
    backgroundColor: colors.lightGrey,
    color: Colors.black,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 10
  },
  statusActive: {
    backgroundColor: colors.oasis,
    color: colors.selectiveYellow,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 10
  }
});
