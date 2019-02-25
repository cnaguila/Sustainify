import React from 'react';
import {
  Button,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator, createAppContainer} from 'react-navigation';


export default class DisplayImage extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render()
  {
    return (
        <View style={{flex: 1, alignItems: 'center', paddingTop: 50}}>
            <Text> Here </Text>
            <Image
                source={{uri: this.props.navigation.state.params.image}}
                style={{height: 200, width: 200}} />
        </View>
    );
  }
}