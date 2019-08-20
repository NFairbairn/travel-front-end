import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import FeedScreen from '../screens/FeedScreen';
// import GalleryScreen from '../screens/Gallery';
import ProfileScreen from '../screens/ProfileScreen';
import NewPostScreen from '../screens/NewPostScreen';
import ReadScreen from '../screens/ReadScreen'
import Colors from '../constants/Colors';

import { Icon } from "react-native-elements"

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const FeedStack = createStackNavigator(
  {
    Feed: {
      screen: FeedScreen,
    },
    Read: {
      screen: ReadScreen
    }
  },
  config
);

FeedStack.navigationOptions = {
  tabBarLabel: ' ',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'md-menu'}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  ),
};

FeedStack.path = 'Feed';

const NewPostStack = createStackNavigator(
  {
    NewPost: NewPostScreen,
  },
  config
);

NewPostStack.navigationOptions = {
  tabBarLabel: ' ',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"md-create"} />
  ),
};

NewPostStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: ' ',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-contact'} />
  ),
};

ProfileStack.path = '';

const tabNavigator = createBottomTabNavigator({
  FeedStack,
  NewPostStack,
  ProfileStack,
});

tabNavigator.path = '';

export default tabNavigator;
