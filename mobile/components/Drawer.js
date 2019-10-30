import React from 'react';
import { DrawerItems } from 'react-navigation';
import {
  ScrollView,
  View,
  ImageBackground,
  Text,
  StyleSheet,
  AsyncStorage,
} from 'react-native';

import { ME_URL } from '../config/urls';
import axios from '../config/axios';
import transformName from '../config/helpers/transformName';

class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    this._getProfile();
  }

  _getProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        axios.defaults.headers.common.Authorization = token;

        const response = await axios.get(ME_URL);
        this.setState({
          user: response.data.user,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { user } = this.state;

    return (
      <ScrollView>
        <View style={styles.drawerHeaderContainer}>
          <ImageBackground
            style={styles.background}
            source={require('../assets/drawer-background.jpg')}
          >
            {user && (
              <View style={styles.userMeta}>
                <View style={styles.userAvatar}>
                  <Text style={styles.userAvatarText}>
                    {transformName(user.name)}
                  </Text>
                </View>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
              </View>
            )}
          </ImageBackground>
        </View>
        <DrawerItems {...this.props.drawerProps} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  drawerHeaderContainer: {
    height: 180,
  },
  background: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  userMeta: {
    marginBottom: 10,
    marginRight: 10,
    alignItems: 'flex-end',
  },
  userAvatar: {
    backgroundColor: '#007bff',
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'flex-end',
  },
  userAvatarText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  userName: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#000',
    fontSize: 16,
  },
});

export default Drawer;
