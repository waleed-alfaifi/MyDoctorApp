import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ImageBackground,
  AsyncStorage,
} from 'react-native';
import { Header } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

import Button from '../components/Button';

class Home extends Component {
  state = {
    token: '',
  };

  _checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({ token });
  };

  render() {
    const { token } = this.state;

    return (
      <React.Fragment>
        <Header
          backgroundColor="#007bff"
          centerComponent={{
            text: 'الصفحة الرئيسية',
            style: { color: '#fff' },
          }}
        />

        <NavigationEvents onWillFocus={this._checkToken} />
        <ImageBackground
          source={require('../assets/doc-bg.png')}
          style={styles.background}
        >
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>أهلًا بك في طبيبي</Text>
              <Text style={styles.text}>
                التطبيق الأول للربط بين الأطباء والمرضى
              </Text>
            </View>

            {token ? (
              <Button
                text="استعرض قائمة الأطباء"
                onPress={() => this.props.navigation.navigate('Doctors')}
              />
            ) : (
              <React.Fragment>
                <Button
                  text="تسجيل الدخول"
                  onPress={() => this.props.navigation.navigate('SignIn')}
                />
                <TouchableHighlight
                  onPress={() => this.props.navigation.navigate('SignUp')}
                >
                  <Text style={styles.registerButton}>إنشاء حساب جديد</Text>
                </TouchableHighlight>
              </React.Fragment>
            )}
          </View>
        </ImageBackground>
      </React.Fragment>
    );
  }
}

const textStyles = {
  color: '#fff',
  textAlign: 'center',
  fontFamily: 'noto-font',
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginBottom: 30,
  },
  title: {
    ...textStyles,
    fontSize: 35,
  },
  text: {
    ...textStyles,
    fontSize: 20,
  },
  registerButton: {
    ...textStyles,
    marginTop: 10,
    fontSize: 16,
  },
});

export default Home;
