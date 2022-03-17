import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Title } from 'react-native-paper';
import { colors } from '../../theme/Colors';
import { Screens } from '../../constants/screens';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { authActions, selectCurrentUser } from '../../redux/slices';

type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface LoginProps {
  navigation: LoginNavigationProp;
}

const ProfileScreen = ({ navigation }: LoginProps) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => selectCurrentUser(state));

  return (
    <View style={styles.body}>
      <Title>{currentUser.name}</Title>
      <Button
        mode="contained"
        color={colors.royalBlue}
        uppercase={false}
        onPress={() => {
          dispatch(authActions.logout());
          navigation.navigate(Screens.LOGIN.name);
        }}
      >
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  }
});

export default ProfileScreen;
