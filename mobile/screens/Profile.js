import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  Alert,
  AsyncStorage,
  StyleSheet,
} from 'react-native';
import { Header } from 'react-native-elements';
import HeaderButton from '../components/HeaderButton';

import axios from '../config/axios';
import { PROFILE_URL } from '../config/urls';
import transformName from '../config/helpers/transformName';
import styles from './styles/profileStyles';

import Button from '../components/Button';
import Loader from '../components/Loader';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      user: null,
    };
  }

  componentDidMount() {
    this._getProfile();
  }

  _getProfile = async () => {
    this.setState({ isLoading: true });

    try {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        axios.defaults.headers.common.Authorization = token;

        const response = await axios.get(PROFILE_URL);
        this.setState({
          user: response.data.user,
          isLoading: false,
        });
      }
    } catch (error) {
      this.setState({ isLoading: false });
      console.log(error.response.data);
    }
  };

  _signOut = async () => {
    Alert.alert('', 'هل أنت متأكد من تسجيل الخروج؟', [
      {
        text: 'إلغاء',
        style: 'cancel',
      },
      {
        text: 'خروج',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.clear();
          this.props.navigation.navigate('Main');
        },
      },
    ]);
  };

  render() {
    const { user, isLoading } = this.state;
    return (
      <ScrollView>
        <Header
          backgroundColor="#007bff"
          leftComponent={
            <HeaderButton
              iconName="md-arrow-back"
              headerPressed={() => {
                this.props.navigation.goBack(null);
              }}
            />
          }
          rightComponent={
            <HeaderButton
              iconName="md-menu"
              headerPressed={() => {
                this.props.navigation.openDrawer();
              }}
            />
          }
          centerComponent={{
            text: 'الملف الشخصي',
            style: { color: '#fff' },
          }}
        />

        <Loader title="إحضار بيانات الملف الشخصي" loading={isLoading} />

        <View style={styles.container}>
          {user && (
            <View>
              <View style={styles.userMetaContainer}>
                <View style={styles.userAvtar}>
                  <Text style={styles.userAvtarText}>
                    {transformName(user.name)}
                  </Text>
                </View>
                <View style={styles.userMeta}>
                  <Text>{user.name}</Text>
                  <Text>{user.email}</Text>
                </View>
              </View>
              {user.profile && (
                <View>
                  <View style={styles.doctorInfo}>
                    <View style={styles.infoCell}>
                      <Text style={styles.infoTitle}>الاختصاص</Text>
                      <Text style={styles.infoText}>
                        {user.profile.specialization}
                      </Text>
                    </View>
                    <View style={styles.infoCell}>
                      <Text style={styles.infoTitle}>العنوان</Text>
                      <Text style={styles.infoText}>
                        {user.profile.address}
                      </Text>
                    </View>
                    <View style={styles.infoCell}>
                      <Text style={styles.infoTitle}>ساعات العمل</Text>
                      <Text style={styles.infoText}>
                        {user.profile.workingHours}
                      </Text>
                    </View>
                    <View style={styles.lastCell}>
                      <Text style={styles.infoTitle}>رقم الهاتف</Text>
                      <Text style={styles.infoText}>{user.profile.phone}</Text>
                    </View>
                  </View>
                </View>
              )}
              <Button
                buttonStyles={styles.logoutButton}
                textStyles={styles.buttonText}
                text="تسجيل خروج"
                onPress={this._signOut}
              />
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}
