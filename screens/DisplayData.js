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

import { 
  SearchBar, 
  Card, 
  ListItem,
  Icon,
 } from 'react-native-elements';


export default class DisplayImage extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    result: this.props.navigation.state.params.json,
  }

  handleJson = (response)=>{
    response.products.map((p, i)=>{
      return(
        <View>
          {/* <Image 
            style={styles.image}
            source={{uri: p.colors[0].image.sizes.Best.url}} 
            /> */}
          
          {/* <Text> {console.log(i, p.colors[0].image.sizes.Best.url)} </Text> */}
          <Text key={i}> {p.brandedName} </Text>
        </View>
      )
    })
  }

  render()
  {
    return (
        <View>
          {this.handleJson(this.state.result)} 
        </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
  }
})