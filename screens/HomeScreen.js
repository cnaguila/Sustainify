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
import AppIntroSlider from 'react-native-app-intro-slider';


import { MonoText } from '../components/StyledText';

import {createStackNavigator, createAppContainer} from 'react-navigation';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    showRealApp: false,
    showSkipButton: true
  };

  render() {

    if (!this.state.showRealApp) {
      return (
        <AppIntroSlider slides={slides} 
      onDone={() => {
        this.setState({showRealApp: true});
      }}
      showSkipButton={true}
      onSkip={() => {
        this.setState({showRealApp: true})
      }}/>
      )}
     else {

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
                  <Text style={styles.homeButtonText}
                  onPress={()=> this.props.navigation.navigate("Closet")}>my closet</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        </View>
      </View>
    );}
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

const slide_styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontFamily: 'lato-reg',
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 50,
    
  },
  title: {
    fontFamily: 'bree-serif',
    fontSize: 28,
    color: '#47525E',
    textAlign: 'center',
    marginTop: 50,
  }
});



const slides = [
  {
    key: 'intro',
    image: require('../assets/images/welcome.png'),
    backgroundColor: '#B2BFA3'
  },

  {
    key: 's1',
    image: require('../assets/images/globe.png'),
    text: '"Sustainability is meeting our present needs without compromising the ability of futurre generations to meet their ouwn needs."                 -UNT Health Science',
    textStyle: slide_styles.text,
    title: 'What is sustainability?',
    titleStyle: slide_styles.title,
    backgroundColor: '#86A86D'
  },

  {
    key: 's2',
    image: require('../assets/images/tree.png'),
    text: 'Sustainability focuses heavily on environmental protection. "Environmental protection entails examining how our use of the environment affects it, and how we can ensure that negative effects are minimized and behaviors that positively impact the environment are emphasized."   -Permaculture Research Institute',
    textStyle: slide_styles.text,
    title: 'Why is sustainability important?',
    titleStyle: slide_styles.title,
    backgroundColor: '#86A86D'
  },

  {
  key: 's3',
  image: require('../assets/images/wasteclothes.png'),
  text: 'Fast fashion is inexpensive clothing produced rapidly by mass-market retailers in response to the latest trends. Fast fashion is known to be environmentally disastrous.',
  textStyle: slide_styles.text,
  title: 'What is fast fashion?',
  titleStyle: slide_styles.title,
  backgroundColor: '#86A86D'
},

{
  key: 's4',
  image: require('../assets/images/fastfashion.png'),
  text: 'Fast fashion contributes to waste accumulation, greenhouse gas emissions, and other environmental hazards. These problems all contribute to climate change and the destruction of natural resources.',
  textStyle: slide_styles.text,
  title: 'Why is fast fashion bad for the environment?',
  titleStyle: slide_styles.title,
  backgroundColor: '#86A86D'
},

{
  key: 's4.1',
  image: require('../assets/images/waste.png'),
  text: 'Fast fashion is easily disposable and generates textile waste. The average family throws away 30 kg of clothing each year, going directly to landfills.',
  textStyle: slide_styles.text,
  title: 'Fast Fashion: Waste Accumulation',
  titleStyle: slide_styles.title,
  backgroundColor: '#86A86D'
},

{
  key: 's4.2',
  image: require('../assets/images/co.png'),
  text: 'The synthetic fibers used for cheap cothing can take up to 200 years to decompose. Synthetic fibers are also made from fossil fuel, making clothing energy-intensive. These fibers emit gases like CO2 which are damaging to our atmosphere.',
  textStyle: slide_styles.text,
  title: 'Fast Fashion: Greenhouse Gas Emissions',
  titleStyle: slide_styles.title,
  backgroundColor: '#86A86D'
},

{
  key: 's5',
  image: require('../assets/images/sustainableclothes.png'),
  text: '"...clothing, shoes and accessories that are manufactured, marketed abd used in the most sustainable manner possible, taking into accout both environmental and socio-economic aspects."  -Green Strategy',
  textStyle: slide_styles.text,
  title: 'What is sustainable fashion?',
  titleStyle: slide_styles.title,
  backgroundColor: '#86A86D'
},

{
  key: 's6',
  image: require('../assets/images/howto.png'),
  text: 'Our app helps users find sustainable clothing options. Simply scan a clothing item you own and our app will find similar looking items from brands that are environmentally-friendly.',
  textStyle: slide_styles.text,
  title: 'How does Sustainify help?',
  titleStyle: slide_styles.title,
  backgroundColor: '#86A86D'
},


]


