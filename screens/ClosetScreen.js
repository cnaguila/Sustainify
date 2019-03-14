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
  Alert,
} from 'react-native';
import { WebBrowser } from 'expo';
import { Ionicons } from '@expo/vector-icons';


import { MonoText } from '../components/StyledText';

import {createStackNavigator, createAppContainer} from 'react-navigation';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
      super(props);
      this.state = {
          showView1: true,
          showView2: true,
          showView3: true,
      }
  }

  removeView(){
      this.setState({
          showView: false,
      })
  }



  render() {
    return (
        
      <View style={styles.container}>
      
        <View style={styles.phoneInfoContainer}>
          {/* //an empty container - for styling phone info bar */}
        </View>

        <ScrollView>
        <View style={styles.navBar}>
          {/*<Image style={styles.navBarImage} source = {require('../assets/images/leaf.png')} /> */}
          <Text style={styles.navBarText}> SUSTAINIFY </Text>
        </View>
        
        <View style={styles.contentContainer}>
             <View style={styles.buttonContainer}>
                <Text style={styles.infoText}>My Liked Items</Text>                
              </View>
        
          <View style= {styles.content}>
            
             
          {this.state.showView1 && (
              <View style={styles.favContainer}>
                <View style={styles.icon_container}>
                <TouchableOpacity 
                        onPress={() => Alert.alert('Are you sure you want to remove this item?',
                        '',
                        [
                            {text: 'OK', onPress: () => this.setState( {showView1: false} )},
                            {text: 'Cancel', onPress: () => console.log('Ok Pressed') }
                        ])}>
                    <Ionicons name='ios-heart' size={20}></Ionicons>
                    </TouchableOpacity> 
                </View>
                <View style={styles.items_container}>
                    <Image style={styles.image_container} source={require('../assets/images/everlane.png')}></Image>
                    <Text style={styles.itemName}>Everlane</Text>
                    <Text>The Relaxed Chino    $58</Text>
                </View>
              </View>
               )}
            
            
            {this.state.showView2 && (
              <View style={styles.favContainer}>
                <View style={styles.icon_container}> 
                    <TouchableOpacity 
                        onPress={() => Alert.alert('Are you sure you want to remove this item?',
                        '',
                        [
                            {text: 'Yes', onPress: () => this.setState( {showView2: false} )},
                            {text: 'No', onPress: () => console.log('Ok Pressed') }
                        ])}>
                    <Ionicons name='ios-heart' size={20}></Ionicons>
                    </TouchableOpacity> 
                </View>
                <View style={styles.items_container}>
                <Image style={styles.image_container} source={require('../assets/images/pact.png')}></Image>
                <Text style={styles.itemName}>Pact</Text>
                <Text>Classic Zip Hoodie    $35</Text>
                </View>
              </View>
            )}


            {this.state.showView3 && (
              <View style={styles.favContainer}>
                <View style={styles.icon_container}> 
                <TouchableOpacity 
                        onPress={() => Alert.alert('Are you sure you want to remove this item?',
                        '',
                        [
                            {text: 'Yes', onPress: () => this.setState( {showView3: false} )},
                            {text: 'No', onPress: () => console.log('Ok Pressed') }
                        ])}>
                    <Ionicons name='ios-heart' size={20}></Ionicons>
                    </TouchableOpacity>
                </View>
                <View style={styles.items_container}>
                <Image style={styles.image_container} source={require('../assets/images/everlane_shoes.png')}></Image>
                <Text style={styles.itemName}>Everlane</Text>
                <Text>The Square Toe Flat    $150</Text>
                </View>
              </View>
            )}

         

          </View>
        
        </View>
        </ScrollView>
        
      </View>
      
    );}


  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };}


const styles = StyleSheet.create({

  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },


  content: {
    alignItems: 'center',
    backgroundColor: '#E2E2E3',
  },

  icon_container: {
      marginTop: 10,
      marginLeft: 235
  },

  itemName: {
      marginTop: 10,
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold'
  },

  items_container: {
      alignItems: 'center'
  },

  favContainer: {
    width: 268.5,
    height: 295,
    backgroundColor: 'white',
    margin: 20,
    borderWidth: 0.5,
    borderRadius: 6,
  },

  image_container: {
    height: 200,
    width: 200,
    alignItems: 'center',
    borderWidth: 2.5,
    borderColor: '#8492A6'

  },

  contentContainer: {
    backgroundColor: '#E2E2E3',
    alignItems: 'center',
    height: 1000,
  },

  infoText: {
    color: '#47525E',
    fontFamily: 'lato-reg',
    fontSize: 25,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold'

  },

  navBar: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#677C69',
  },

  navBarImage: {
    height: 50,
    width: 50,
    marginTop: 25,
    marginLeft: 25
  },

  navBarText: {
    color: "#ffffff",
    flex: 1,
    fontFamily: 'abril-fatface',
    fontSize: 50,
    letterSpacing: 5,
    paddingTop: 15,
    textAlign: 'center',
  },

  phoneInfoContainer: {
    backgroundColor: "#677C69",
    height: 20,
  },

});
