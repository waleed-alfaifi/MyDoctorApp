import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableNativeFeedback,
  AsyncStorage,
} from 'react-native';
import { Header } from 'react-native-elements';
import Loader from '../components/Loader';
import HeaderButton from '../components/HeaderButton';

import styles from './styles/doctorsStyles';
import { DOCTORS_URL } from '../config/urls';
import axios from '../config/axios';

class Doctors extends Component {
  state = {
    isLoading: false,
    doctors: [],
    selectedDoctor: null,
  };

  componentDidMount() {
    this._getDoctors();
  }

  _renderItem = ({ item }) => (
    <TouchableNativeFeedback onPress={() => this.itemPressHandler(item.id)}>
      <View style={styles.itemContainer}>
        <View style={styles.doctorAvatar}>
          <Text style={styles.doctorAvatarText}>
            {transformName(item.name)}
          </Text>
        </View>
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{item.name}</Text>
          <Text style={styles.doctorSpec}>{item.profile.specialization}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );

  _keyExtractor = item => item.id.toString();

  _getDoctors = async () => {
    this.setState({ isLoading: true });

    try {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        axios.defaults.headers.common.Authorization = token;

        const response = await axios.get(DOCTORS_URL);
        this.setState({
          doctors: response.data.doctors,
          isLoading: false,
        });
      }
    } catch (error) {
      this.setState({ isLoading: false });
      console.log(error);
    }
  };

  render() {
    const { doctors, selectedDoctor, isLoading } = this.state;

    return (
      <React.Fragment>
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
            text: 'صفحة الأطباء',
            style: { color: '#fff' },
          }}
        />
        <View>
          <Loader title="إحضار الأطباء" loading={isLoading} />
          {/* <View style={styles.searchSection}>
            <View style={styles.searchInputContainer}>
              <Input
                inputStyles={styles.searchInput}
                placeholder="ابحث عن طبيب"
                icon="md-search"
                onChangeText={this.search}
              />
            </View>
          </View> */}

          {/* <DoctorDetails
            selectedDoctor={selectedDoctor}
            closeModal={() => this.setState({ selectedDoctor: null })}
          /> */}

          <ScrollView contentContainerStyle={styles.doctorsListContainer}>
            {doctors.length !== 0 ? (
              <FlatList
                data={doctors}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
              />
            ) : (
              <Text style={styles.noDoctorsText}>لا يوجد أطباء</Text>
            )}
          </ScrollView>
        </View>
      </React.Fragment>
    );
  }
}

export default Doctors;
