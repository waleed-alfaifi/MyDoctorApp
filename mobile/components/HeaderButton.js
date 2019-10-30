import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  TouchableNativeFeedback,
  View,
  TouchableHighlight,
} from 'react-native';

const HeaderButton = ({ iconName, headerPressed, direction }) => {
  // const margin = direction === 'left' ? {marginLeft: 20} : {marginRight: 20};

  return (
    <TouchableHighlight
      onPress={headerPressed}
      style={{ backgroundColor: '#007bff' }}
    >
      <View>
        <Ionicons name={iconName} size={35} color="white" />
      </View>
    </TouchableHighlight>

    // <TouchableNativeFeedback
    //   background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .32)', true)}
    //   onPress={headerPressed}
    // >
    //   <View>
    //     <Ionicons name={iconName} size={35} color="white" />
    //   </View>
    // </TouchableNativeFeedback>
  );
};

export default HeaderButton;
