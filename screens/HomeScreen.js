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

              <Button 
                color="#ffffff"
                title="Scan an item"
                onPress={()=>{
                  console.log("scanning....");
                }}>
              </Button>
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
  content: {
    alignItems: 'center'
  },

  contentContainer: {
    backgroundColor: '#ffffff',
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
    paddingTop: 15,
    marginRight: 50,
    textAlign: 'center',
  },

  phoneInfoContainer: {
    backgroundColor: "#3c4858",
    height: 20,
  },

  scanImage: {
    height: '110%',
    width: '195%',
  }
});
