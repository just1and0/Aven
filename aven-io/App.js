import { View, Text } from 'react-native';
import React from 'react';

import {
  SwitchRouter,
  createNavigator,
  SceneView,
} from '@react-navigation/core';

import { Link } from '@react-navigation/web';

function Header({ descriptors }) {
  return (
    <View style={{ borderBottomWidth: 1, height: 50 }}>
      {Object.keys(descriptors).map(descriptorId => {
        return (
          <Link key={descriptorId} routeName={descriptorId}>
            {descriptorId}
          </Link>
        );
      })}
    </View>
  );
}

const AppView = ({ navigation, descriptors }) => {
  const { state } = navigation;
  const route = state.routes[state.index];
  const descriptor = descriptors[route.key];
  return (
    <View style={{ flex: 1 }}>
      <Header descriptors={descriptors} navigation={navigation} />
      <SceneView
        component={descriptor.getComponent()}
        navigation={descriptor.navigation}
      />
    </View>
  );
};

function Home() {
  return (
    <View style={{ flex: 1 }}>
      <Text>Home!</Text>
    </View>
  );
}

function About() {
  return (
    <View style={{ flex: 1 }}>
      <Text>Abouuut</Text>
    </View>
  );
}

const AppRouter = SwitchRouter({
  Home: {
    screen: Home,
    path: '',
    navigationOptions: {
      title: 'Aven',
    },
  },
  About: {
    screen: About,
    path: 'about',
    navigationOptions: {
      title: 'About Aven',
    },
  },
});

const AppNavigator = createNavigator(AppView, AppRouter, {});

export default AppNavigator;