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

import {createStackNavigator, createAppContainer} from 'react-navigation';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.phoneInfoContainer}>
          {/* //an empty container - for styling phone info bar */}
        </View>

        <View style={styles.navBar}>
          {/*<Image style={styles.navBarImage} source = {require('../assets/images/leaf.png')} /> */}
          <Text style={styles.navBarText}> SUSTAINIFY </Text>
        </View>

        <View style={styles.contentContainer}>
          <View style= {styles.content}>
            <ImageBackground 
              source={require("../assets/images/ScanBackground.jpg")}
              style = {styles.scanImage}
              imageStyle = {{resizeMode: 'stretch'}}>
            
              <View style={styles.buttonContainer}>
                <Text style={styles.infoText}>Look for sustainable options</Text>

                <TouchableOpacity style={styles.scanButton}>
                  <Text 
                    style={styles.homeButtonText} 
                    onPress={()=> this.props.navigation.navigate("Option")}>scan clothes</Text>
                </TouchableOpacity>
                
                <Text style={styles.infoText}>Look at saved recommendations</Text>
                <TouchableOpacity style={styles.closetButton}>
                  <Text style={styles.homeButtonText}>my closet</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        </View>
      </View>
    );
  }

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
  };
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },

  closetButton: {
    backgroundColor: '#486556',
    borderRadius: 8,
    color: "#ffffff",
    height: 50,
    width: 288,
    marginTop: 50

  },

  content: {
    alignItems: 'center'
  },

  contentContainer: {
    backgroundColor: '#ffffff',
  },

  infoText: {
    color: '#ffffff',
    fontFamily: 'roboto-bold-italic',
    fontSize: 25,
    paddingTop: 100,

  },

  navBar: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#b2bfa3',
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
    backgroundColor: "#3c4858",
    height: 20,
  },

  scanButton: {
    backgroundColor: "#486556",
    borderRadius: 8,
    color: "#ffffff",
    height: 50,
    marginTop: 50,
    width: 288
  },

  homeButtonText: {
    color: '#ffffff',
    fontFamily: 'roboto-reg',
    fontSize: 20,
    letterSpacing: 5,
    textAlign: 'center',
    paddingTop: 13,
    paddingBottom: 15
    
  },

  scanImage: {
    height: '110%',
    width: '195%',
  }
});
