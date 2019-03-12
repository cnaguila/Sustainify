import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import HomeScreen from '../screens/HomeScreen';
import OptionScreen from '../screens/OptionScreen';
import DisplayData from '../screens/DisplayData';
import ProductPage from '../screens/ProductPage';
import WebPage from '../screens/WebPage';

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  Home: HomeScreen,
  Option: OptionScreen,
  Display: DisplayData,
  Product: ProductPage,
  Web: WebPage,
}));