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
                <Text style={styles.infoText}>About Us</Text>                
              </View>
        
          <View style= {styles.content}>

          <View style={styles.favContainer}>

            <Image style={styles.image_container} source={require('../assets/images/ecofriend.png')}></Image>
            <Text style={styles.titleName}>Mission Statement</Text>
            <Text style= {styles.insideText}>Sustainify was founded by a group of six diverse women working on a school assignment. What started off as a simple vision to battle climate change with clothing, soon became a reality.</Text>

            <Text style={styles.titleName}>Our Origin Story</Text>
            <Text style= {styles.insideText}>Our goal at Sustainify is to save the environment through sustainable fashion, providing alternatives for fast fashion clothing items. </Text>
            </View>


            <View style={styles.favorContainer}>
            <Image style={styles.image_container} source={require('../assets/images/thrifting.png')}></Image>
            <Text style={styles.titleName}>Other Ways To Help the Environment Through Fashion</Text>
            <Text style= {styles.insideText}>We understand that buying sustainable clothing may not be as accessible to some as it is to others. </Text>
            <Text style= {styles.insideText}>Here are a couple of different ways to be sustainable through fashion: </Text>

            <Text style={styles.bulletName}>Thrifting</Text>
            <Text style= {styles.bulletText}>Buying second-hand clothing items is a great way to be sustainable because it’s reusing items that are already made and won’t have to be thrown out. Some thrift stores to check out are Goodwill, Savers, and your local vintage shops. There are also many second-hand mobile apps that allow you to thrift at home such as Poshmark, Depop, and Mercari. </Text>
            <Text style={styles.bulletName}>Donating Clothing</Text>
            <Text style= {styles.bulletText}> Many of the clothes we throw away are made out of synthetic fabrics that are unable to naturally decompose. Thus, adding to the increase of waste in our environment. By donating clothes, we prevent items from going to waste and give them a second chance to find a new home.</Text>
            

          </View>
            
            


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

  titleName: {
      marginTop: 10,
      fontSize: 20,
      marginLeft: 10,
      fontWeight: 'bold'
  },


  items_container: {
      alignItems: 'center'
  },

  favContainer: {
    width: 390,
    height: 530,
    backgroundColor: 'white',
    borderRadius: 6,
  },

  favorContainer: {
    marginTop: 30,
    width: 390,
    height: 920,
    backgroundColor: 'white',
    borderRadius: 6,
  },

  image_container: {
    height: 200,
    width: 390,

  },

  contentContainer: {
    backgroundColor: '#E2E2E3',
    alignItems: 'center',
    height: 1600,
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

  insideText: {
    color: '#47525E',
    fontFamily: 'lato-reg',
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 20,
    marginLeft: 10,
    marginRight: 10
  },

  bulletName: {
    color: '#47525E',
    fontFamily: 'lato-reg',
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 5,
    marginLeft: 15,
  },

  bulletText: {
    color: '#47525E',
    fontFamily: 'lato-reg',
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 20,
    marginLeft: 15,
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
