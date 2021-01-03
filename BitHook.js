import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import App from "./App"
import Login from "./login"
import SignUp from "./signup"

export default class bitHook extends React.Component {
  state = {
    index: 1,
    routes: [
      { key: 'hooks', title: 'Hooks', icon: 'hook',  color: "#16194E",badge:true },
    { key: 'coins', title: 'Coins', icon: 'bitcoin', color: '#16194E' },
    { key: 'account', title: 'Account', icon: 'account', color: '#16194E' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    hooks: SignUp,
    coins: App,
    account: Login,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
        shifting={true}
        elevation={0}
      />
    );
  }
}