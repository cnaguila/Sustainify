//https://medium.com/@mlapeter/using-google-cloud-vision-with-expo-and-react-native-7d18991da1dd


import React from 'react';
import {
  Animated,
  Easing,
  Button,
  Image,
  ImageStore,
  ImageEditor,
  ImageBackground,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { WebBrowser, Camera, Permissions } from 'expo';
import { MonoText } from '../components/StyledText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Environment from "../config/environment";
import LottieView from 'lottie-react-native';

//color namer
var namer = require('color-namer');

//style detection api
const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'd43e615790234f3ab5acce84ba3bd55f'
});

//facts
var facts = ["The apparel and footwear industries account for a combined estimate of 8% of the world’s greenhouse gas emissions, and fashion is the third highest-polluting industry in the world.",
"A 2016 McKinsey report revealed that three-fifths of all clothing items will end up in an incinerator or landfill within a year after being produced.",
"If we keep this up, by 2050 the fashion industry could use more than 26 percent of the “carbon budget” associated with a 2o C pathway (a long-term goal to limit global warming to less than 2°C above pre-industrial levels).",
"We don’t really wear our clothes. Worldwide, clothing utilization (how often we put something on) has decreased by 36 percent compared to 15 years ago.",
"It’s estimated that less than 1 percent of material used to produce clothing is recycled into something more. That’s about a loss of 100 billion USD worth of materials every year.",
"By 2030, it’s expected that fashion waste will increase to a 148 million ton problem.",
"According to the Global Fashion Agenda, 26 percent of business owners surveyed believe that “low consumer willingness to pay a premium for sustainable products” was the greatest barrier for them to become more sustainable.",
"…But consumer attitudes for ethical fashion are increasingly favorable. Sixty percent of millennials say they want to shop more 'sustainably.'",
"Many brands are moving to more sustainable production methods. As of May 2018, 12.5 percent of the global fashion market has pledged to make changes by 2020.",
"The clothing brand Patagonia was the first to make polyester fleece out of plastic bottles.",
"Cotton, a popular material in clothing, requires high levels of water and pesticides, which cause issues in developing countries.",
"About 2,000 different chemicals are used in textile processing — yet only 16 are approved by the Environmental Protection Agency.",
"According to the United Nations Economic Commission for Europe, the fashion industry produces 20 percent of global wastewater.",
"Only 15 percent of consumers recycle their used clothing."];

var intervalID = 0;


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    pictureTaken: false,
    googleResponse: null,
    modalVisible: false,
    clothes: "",
    result: "",
    loading: false,
    factIndex: 0,
  };

  //modal functions
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  //turns rgb to hex
  //https://campushippo.com/lessons/how-to-convert-rgb-colors-to-hexadecimal-with-javascript-78219fdb
  rgbToHex = function (rgb) { 
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
         hex = "0" + hex;
    }
    return hex;
  };

  //turns rgb to hex
  //https://campushippo.com/lessons/how-to-convert-rgb-colors-to-hexadecimal-with-javascript-78219fdb
  fullColorHex = function(r,g,b) {   
    var red = this.rgbToHex(r);
    var green = this.rgbToHex(g);
    var blue = this.rgbToHex(b);
    return red+green+blue;
  };


  //makes API call to Clarifai and Google for image colors & style detection
  submitToClarifai = (image) =>{
    
    this.setState(
      {
        loading: true
      }, () => {console.log("after picture taken: ", this.state.loading);}
    ); 

    Image.getSize(image, (width, height) => {
        let imageSettings = {
            offset: {x: 0, y: 0},
            size: {width: width, height: height}
        };

        //crops image and returns URI as base64
        ImageEditor.cropImage(image, imageSettings, (uri) => {
            ImageStore.getBase64ForTag(uri, (data) => {

              //call to Clarifai API, returns a promise 
              app.models.predict(Clarifai.APPAREL_MODEL, {base64: data}).then((response)=>{
                  this.setState({
                    clothes: response.outputs[0].data.concepts[0].name,
                  }, ()=>{
                    console.log(this.state.clothes);
                    this.submitToColorNamer(data);
                  })
                }
              )
              
            }, e => console.warn("getBased64ForTag: ", e))
        }, e => console.warn("cropImage: ", e))
    })
  }


  //makes api call to google to retrieve image colors
  submitToColorNamer = async (encoded_content) => {
    try {
      this.setState({ uploading: true });
      //let { image } = this.state;
      let body = JSON.stringify({
        requests: [
          {
            features: [
              { type: "IMAGE_PROPERTIES", maxResults: 5 },
            ],
            image: {
              content: encoded_content
            }
          }
        ]
      });
      let response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
          Environment["GOOGLE_CLOUD_VISION_API_KEY"],
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: body
        }
      );
      let responseJson = await response.json();
      //console.log(responseJson.responses[0].imagePropertiesAnnotation.dominantColors.colors[0].color);
      
      
    //storing to pass to function which changes them to a hex value
      var red = responseJson.responses[0].imagePropertiesAnnotation.dominantColors.colors[0].color.red;
      var green = responseJson.responses[0].imagePropertiesAnnotation.dominantColors.colors[0].color.green;
      var blue = responseJson.responses[0].imagePropertiesAnnotation.dominantColors.colors[0].color.blue;
      
      //hex value of detected color
      var hex = this.fullColorHex(red,green,blue);

      // console.log(hex);

      //returns the color name of hex value
      var color = namer(hex, {pick: ['basic']}).basic[0].name;
      console.log("color: "+ color);
      // console.log("clothes: "+ this.state.clothes);
      
      
      //sends queries to shopstyle api, but doesn't go through ??
      this.queryShopStyle('everlane', color, this.state.clothes);
      
      this.setState({
        googleResponse: responseJson,
        uploading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };


  queryShopStyle = (brand, color, item) => {
    var URL = 'http://api.shopstyle.com/api/v2';
    var endpoint = '/products';
    var apiKey = "?pid=uid3156-3365966-87";
    var search_query = "&fts=" + brand+ "+" + color + "+" + item;

    var apiUrl = URL + endpoint + apiKey + search_query;
    console.log("in the api call");
    console.log(apiUrl);

    var response = fetch(apiUrl, {
      method: 'GET', 
      headers: {
        Accept: 'application/json', 
        'Content-Type': 'application/json'
      } 
    }).then( (res) => res.json())
    .then((responseJson) => {
      const { navigate } = this.props.navigation;

      this.setState({
        result: responseJson,
        loading: false
      }, ()=>{
        navigate('Display', {json: this.state.result});
      })
    })
    .catch((error) => {
      console.log(error); 
    }); 
  }
  
  takePicture = () => {
    console.log("before picture taken: ", this.state.loading);
    this.setState({
      pictureTaken: true
    });
    if (this.camera) {
      console.log('take picture');
      this.camera.takePictureAsync({onPictureSaved: (result)=> {
        this.submitToClarifai(result['uri']);
      }});
    }
  };


  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(intervalID);
  }

  async componentDidMount(){
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted"});
    
    intervalID = setInterval(()=>{
      if (this.state.factIndex === 13)
      {
        this.setState({factIndex: 0})
      }
      this.setState({factIndex: this.state.factIndex+1})
    },5500);
  
  }

  render() {
    const { hasCameraPermission } = this.state;
    const { navigate } = this.props.navigation;
  
    if (this.state.loading) {
      return (
        <View style={loading_style.container}> 
          <LottieView
            source={require('../assets/images/loading.json')}
            autoPlay={true}
            loop={true}
            style={loading_style.loadingBar}
            />
          <Text style={loading_style.factTitle}> Did You Know? </Text>
          <View style={loading_style.textContainer}>
            <Text style={loading_style.factText}> {facts[this.state.factIndex]} </Text>
          </View>
        </View>
      );
    }
    if (hasCameraPermission === null )
    {
      return <View />;
    }
    else if (hasCameraPermission === false)
    {
      return <Text> No access to camera </Text>;
    }
    else{
    return (
      <View style={{flex: 1}}>
        <Camera 
        style={{flex: 1}}
        type={this.state.type}
        ref={ref => {
          this.camera = ref;
        }}>

        {/* <View style = {styles.viewContainer}> */}
        
          <TouchableOpacity>
            <MaterialCommunityIcons 
              onPress={()=>{navigate('Home')}}
              name="close"
              style={styles.backButtonStyle}>
            </MaterialCommunityIcons>
          </TouchableOpacity> 
          
        
        
          <TouchableOpacity>
            <MaterialCommunityIcons
              onPress={this.takePicture}
              name="circle-outline"
              style={styles.takePictureButton}>
            </MaterialCommunityIcons>
          </TouchableOpacity>
        {/* </View> */}
        </Camera>
      </View>

    );
    }
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

  backButtonStyle: {
    fontSize: 40,
    color: 'white',
    marginTop: 25,
    marginLeft: 360,

  },

  cameraButtonsContainer: {
    alignSelf: 'center',
    marginRight: 100,
  },

  cameraTouchableOpacity: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: 'center',
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
  
  innerModalContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    marginTop: 150,
    marginLeft: 15,
    marginRight: 15, 
    height: '50%',
  },

  modalContainer: {
    flex: 1,
    //backgroundColor: "rgba(0,0,0,0.5)",
  },

  navBar: {
    flexDirection: 'row',
    // height: 100,
    // backgroundColor: '#677C69',
  },

  okayButton: {
    backgroundColor: '#486556',
    borderRadius: 8,
    color: "#ffffff",
    height: 50,
    width: 288,
    marginTop: 50

  },
  takePictureButton: {
    color: 'white',
    fontSize: 100,
    paddingTop: 565,
    alignSelf: 'center',
  },

  viewContainer: {
    flex: 2,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  }
});

const loading_style = StyleSheet.create({
  container: {
    backgroundColor: '#677C69',
    height: '100%',
    width: '100%',
  },

  loadingBar: {
    height: '50%',
    width: '50%',
    marginLeft: 40,
    marginTop: 50,
  },

  factText: {
    fontFamily: 'roboto-med',
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 10,
  },
  
  factTitle: {
    color: '#ffffff',
    fontFamily: 'abril-fatface',
    fontSize: 40,
    paddingBottom: 20,
    textAlign: 'center',
  },
  
  textContainer: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginBottom: 100,
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 10,
    width: 375,
    alignSelf: 'center',
    borderRadius: 10,
  },
})
