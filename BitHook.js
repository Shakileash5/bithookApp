import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import App from "./App"
import Login from "./login"
import SignUp from "./signup"
import Profile from "./profile"
/*
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

  render(props) {
    
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
*/
function bitHook({route,navigation}){
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    { key: 'hooks', title: 'Hooks', icon: 'hook',  color: "#16194E",badge:true },
    { key: 'coins', title: 'Coins', icon: 'bitcoin', color: '#16194E' },
    { key: 'account', title: 'Account', icon: 'account', color: '#16194E' },
  ]);
  const {userId } = route.params;
  console.log(userId,"params");
  const renderScene =({ route, jumpTo }) => {
  switch (route.key) {
    case 'hooks':
      return <SignUp jumpTo={jumpTo}  />;
    case 'coins':
      return <App jumpTo={jumpTo} userId={userId} />;
    case 'account':
      return <Profile jumpTo={jumpTo} userId={userId} navigateTo={navigation} />;
  }
}
  
  /* BottomNavigation.SceneMap({
    hooks: SignUp,
    coins: App,
    account: Login,
  });*/

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default bitHook;