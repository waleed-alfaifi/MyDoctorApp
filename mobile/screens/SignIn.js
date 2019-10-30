import React, { Component } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';
import { validate } from 'validate.js';

import axios from '../config/axios';
import { SIGNIN_URL } from '../config/urls';

import ScreenTitle from '../components/ScreenTitle';
import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/Alert';
import Loader from '../components/Loader';
import Container from '../components/Container';

import styles from './styles/authStyles';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      alert: {
        message: null,
        type: '',
      },
    };
  }

  componentDidMount() {
    const alert = this.props.navigation.getParam('alert');
    if (alert) {
      this.setState({ alert });
    }
  }

  onChangeTextHandler = (name, value) => {
    this.setState({ [name]: value });
  };

  validateUserInput = () => {
    const validationMessages = [];

    const { email, password } = this.state;

    const userConstraints = {
      email: {
        email: {
          message: '^الرجاء إدخال بريد إلكتروني صالح',
        },
      },
      password: {
        presence: {
          allowEmpty: false,
          message: '^لا يمكن ترك حقل كلمة المرور فارغاً',
        },
      },
    };

    const userMessages = validate({ email, password }, userConstraints);

    if (userMessages) {
      for (let value of Object.values(userMessages)) {
        validationMessages.push(value[0]);
      }
    }

    this.setState({
      alert: {
        message: validationMessages,
        type: 'danger',
      },
    });

    if (validationMessages.length > 0) {
      return false;
    }
    return true;
  };

  _signIn = async () => {
    if (!this.validateUserInput()) {
      return;
    }

    this.setState({ isLoading: true });

    try {
      const { email, password } = this.state;
      const body = { email, password };

      const response = await axios.post(SIGNIN_URL, body);

      const { token } = response.data;
      AsyncStorage.setItem('token', token);

      this.props.navigation.navigate('Doctors');

      this.setState({
        email: '',
        password: '',
        isLoading: false,
      });
    } catch (error) {
      const { message } = error.response.data;

      this.setState({
        isLoading: false,
        alert: {
          message: message
            ? message
            : 'حدث خطأ أثناء تسجيل الدخول. الرجاء المحاولة لاحقاً.',
          type: 'danger',
        },
      });
    }
  };

  componentDidUpdate() {
    if (this.state.alert.message) {
      setTimeout(() => {
        this.setState({
          alert: { message: null },
        });
      }, 3000);
    }
  }

  componentWillUnmount() {
    clearTimeout();
  }

  render() {
    const { email, password, isLoading, alert } = this.state;

    return (
      <Container>
        <ScrollView
          contentContainerStyle={{
            paddingVertical: 40,
          }}
        >
          <Alert messages={alert.message} type={alert.type} />
          <Loader title="جاري تسجيل الدخول" loading={isLoading} />
          <View style={styles.container}>
            <ScreenTitle title="تسجيل الدخول" icon="md-log-in" />
            <KeyboardAvoidingView behavior="padding" enabled>
              <Input
                placeholder="البريد الإلكتروني"
                onChangeText={value => this.onChangeTextHandler('email', value)}
                value={email}
              />
              <Input
                secureTextEntry
                placeholder="كلمة المرور"
                onChangeText={value =>
                  this.onChangeTextHandler('password', value)
                }
                value={password}
              />
              <Button text="دخول" onPress={this._signIn} />
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
