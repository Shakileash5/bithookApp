import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import App from "./App"
import Login from "./login"
import SignUp from "./signup"
import Profile from "./profile"
import HookHistory from "./history"

function bitHook({route,navigation}){
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    { key: 'hooks', title: 'Hooks', icon: 'hook',  color: "#16194E",badge:true },
    { key: 'coins', title: 'Coins', icon: 'bitcoin', color: '#16194E' },
    { key: 'account', title: 'Account', icon: 'account', color: '#16194E' },
  ]);
  const {userId } = route.params;

  const renderScene =({ route, jumpTo }) => {
  switch (route.key) {
    case 'hooks':
      return <HookHistory jumpTo={jumpTo} userId={userId}/>;
    case 'coins':
      return <App jumpTo={jumpTo} userId={userId} />;
    case 'account':
      return <Profile jumpTo={jumpTo} userId={userId} navigateTo={navigation} />;
  }
}
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default bitHook;