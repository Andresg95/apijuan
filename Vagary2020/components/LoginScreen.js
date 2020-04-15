import * as React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Button,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { androidClientId } from './superSecretKey';
import * as Google from 'expo-google-app-auth';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import EditProfile from './EditProfile';


export default class Loging extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
       name: '',
      photoUrl: '',
      email:'',
    };

  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: androidClientId,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl,
        });
      } else {
        console.log('cancelled');
      }
    } catch (e) {
      console.log('error', e);
    }
  }


  render() {
    var ancho = Dimensions.get('window').width;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          width: ancho,
          alignItems: 'center',
        }}>
        {this.state.signedIn ? (
        <EditProfile name={this.state.name} photoUrl={this.state.photoUrl}/>
        
        ) : (
          <LoginPage signIn={this.signIn} logIn={this.logIn} />
        )}
      </View>
    );
  }
}

const LoginPage = props => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', }}>
      <Text style={styles.header}>Sign In</Text>
      <Button title="Sign in with Google" color= "#D71515" onPress={() => props.signIn()} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
  },
});
