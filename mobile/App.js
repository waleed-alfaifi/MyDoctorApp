import React, { Component } from 'react';
import { AppLoading, Font } from 'expo';
import AppNavigation from './config/routes';

export default class App extends Component {
  state = {
    isReady: false,
  };

  _getFonts = async () => {
    await Font.loadAsync({
      'noto-font': require('./assets/fonts/NotoKufiArabic-Regular.ttf'),
    });
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._getFonts}
          onFinish={() => this.setState({ isReady: true })}
        />
      );
    }

    return <AppNavigation />;
  }
}
