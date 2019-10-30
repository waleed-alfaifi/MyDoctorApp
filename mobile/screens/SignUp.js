import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  CheckBox,
} from 'react-native';
import { validate } from 'validate.js';

import axios from '../config/axios';
import { SIGNUP_URL } from '../config/urls';

import ScreenTitle from '../components/ScreenTitle';
import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/Alert';
import Loader from '../components/Loader';

import styles from './styles/authStyles';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      specialization: '',
      phone: '',
      address: '',
      workingHours: '',
      location: null,
      userType: false,
      isLoading: false,
      alert: {
        message: null,
        type: '',
      },
    };
  }

  onChangeTextHandler = (name, value) => {
    this.setState({ [name]: value });
  };

  onChangeUserTypeHandler = e => {
    const { value } = e.nativeEvent;
    this.setState({ userType: value });
  };

  validateUserInput = () => {
    const validationMessages = [];

    const {
      name,
      email,
      password,
      specialization,
      phone,
      address,
      workingHours,
      userType,
    } = this.state;

    const userConstraints = {
      name: {
        presence: {
          allowEmpty: false,
          message: '^لا يمكن ترك حقل الاسم فارغاً',
        },
      },
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

    const userMessages = validate({ name, email, password }, userConstraints);

    if (userMessages) {
      for (let value of Object.values(userMessages)) {
        validationMessages.push(value[0]);
      }
    }

    if (userType) {
      // Validate doctor's input.
      const doctorConstraints = {
        specialization: {
          presence: {
            allowEmpty: false,
            message: '^الرجاء إدخال التخصص',
          },
        },
        phone: {
          presence: {
            allowEmpty: false,
            message: '^الرجاء إدخال رقم الجوال',
          },
        },
        address: {
          presence: {
            allowEmpty: false,
            message: '^الرجاء إدخال العنوان',
          },
        },
        workingHours: {
          presence: {
            allowEmpty: false,
            message: '^الرجاء إدخال ساعات العمل',
          },
        },
      };

      const doctorMessages = validate(
        { specialization, phone, address, workingHours },
        doctorConstraints
      );

      if (doctorMessages) {
        for (let value of Object.values(doctorMessages)) {
          validationMessages.push(value[0]);
        }
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

  // The _ because it's asynchronous
  _signUp = async () => {
    if (!this.validateUserInput()) {
      return;
    }

    this.setState({ isLoading: true });

    const {
      name,
      email,
      password,
      specialization,
      phone,
      address,
      workingHours,
      userType,
    } = this.state;

    const body = {
      name,
      email,
      password,
      specialization,
      phone,
      address,
      workingHours,
      userType: userType ? 'doctor' : 'normal',
      location: {
        latitude: 1,
        longitude: 2,
      },
    };

    try {
      const response = await axios.post(SIGNUP_URL, body);

      this.setState({
        name: '',
        email: '',
        password: '',
        specialization: '',
        phone: '',
        address: '',
        workingHours: '',
        userType: false,
        location: null,
        isLoading: false,
      });

      this.props.navigation.navigate('SignIn', {
        alert: {
          message: response.data.message,
          type: 'success',
        },
      });
    } catch (error) {
      console.log(error);

      this.setState({
        isLoading: false,
        alert: {
          message: 'حدث خطأ أثناء التسجيل. الرجاء المحاولة لاحقاً.',
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
    const {
      name,
      email,
      password,
      specialization,
      phone,
      address,
      workingHours,
      location,
      userType,
      isLoading,
      alert,
    } = this.state;

    return (
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 40,
        }}
      >
        <Alert messages={alert.message} type={alert.type} />
        <Loader title="جاري إنشاء حساب جديد" loading={isLoading} />
        <View style={styles.container}>
          <ScreenTitle title="تسجيل حساب جديد" icon="md-person-add" />
          <KeyboardAvoidingView behavior="padding" enabled>
            <Input
              placeholder="الاسم"
              onChangeText={value => this.onChangeTextHandler('name', value)}
              value={name}
            />
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
            <View style={styles.checkboxContainer}>
              <CheckBox
                style={styles.checkbox}
                onChange={this.onChangeUserTypeHandler}
                value={userType}
              />
              <Text style={styles.checkboxText}>طبيب</Text>
            </View>

            {this.state.userType && (
              <React.Fragment>
                <Input
                  placeholder="التخصص"
                  onChangeText={value =>
                    this.onChangeTextHandler('specialization', value)
                  }
                  value={specialization}
                />
                <Input
                  placeholder="ساعات العمل"
                  onChangeText={value =>
                    this.onChangeTextHandler('workingHours', value)
                  }
                  value={workingHours}
                />
                <Input
                  placeholder="العنوان"
                  onChangeText={value =>
                    this.onChangeTextHandler('address', value)
                  }
                  value={address}
                />
                <Input
                  placeholder="رقم الجوال"
                  onChangeText={value =>
                    this.onChangeTextHandler('phone', value)
                  }
                  value={phone}
                />
              </React.Fragment>
            )}
            <Button text="إنشاء" onPress={this._signUp} />
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
  }
}
