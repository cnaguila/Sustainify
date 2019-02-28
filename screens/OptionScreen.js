import React from 'react';
import {
  Button,
  Image,
  ImageStore,
  ImageEditor,
  ImageBackground,
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
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Environment from "../config/environment";
const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'd43e615790234f3ab5acce84ba3bd55f'
});



export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };


  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    pictureTaken: false,
    googleResponse: null,
    clothesType: null,
  };

  //makes API call to Clarifai and Google for image colors & style detection
  submitToClarifai = (result) =>{
    var image = result;
    Image.getSize(image, (width, height) => {
        let imageSettings = {
            offset: {x: 0, y: 0},
            size: {width: width, height: width}
        };

        ImageEditor.cropImage(image, imageSettings, (uri) => {
            ImageStore.getBase64ForTag(uri, (data) => {
                //this.submitToGoogle(data);
                app.models.predict(Clarifai.APPAREL_MODEL, {base64: data}).then(
                    function(response) {
                      console.log("Clarifai result: "+ response.outputs[0].data.concepts[0].name);
                      console.log("Clarifai result value: "+response.outputs[0].data.concepts[0].value);
                    }
                );
            }, e => console.warn("getBased64ForTag: ", e))
        }, e => console.warn("cropImage: ", e))
    })
  }

  //makes api call to google to retrieve image colors
  submitToGoogle = async (encoded_content) => {
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
      console.log(responseJson);
      this.setState({
        googleResponse: responseJson,
        uploading: false
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  takePicture = () => {
    this.setState({
      pictureTaken: true,
    });
    if (this.camera) {
      console.log('take picture');
      this.camera.takePictureAsync({onPictureSaved: (result)=> {
        var image = result['uri'];
        this.submitToClarifai(image);
      }});
    }
  };


  async componentDidMount(){
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted"});
  }

  render() {
    const { hasCameraPermission } = this.state;
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

        <View style = {styles.viewContainer}>
        
          <TouchableOpacity style = {styles.headerContainer}>
            <MaterialCommunityIcons 
              onPress={()=>{console.log("hey")}}
              name="close-circle"
              style={styles.backButtonStyle}>
            </MaterialCommunityIcons>
          </TouchableOpacity> 
        
          <View style={styles.cameraButtonsContainer}>
            <TouchableOpacity style={styles.cameraTouchableOpacity}>
          
              <MaterialCommunityIcons
                onPress={this.takePicture}
                name="circle-outline"
                style={styles.takePictureButton}>
              </MaterialCommunityIcons>
            </TouchableOpacity>
          </View>
        </View>
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
  },

  cameraButtonsContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },

  cameraTouchableOpacity: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: 'center',
  },

  takePictureButton: {
    color: 'white',
    fontSize: 100,
  },

  viewContainer: {
    flex: 2,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  }
});
