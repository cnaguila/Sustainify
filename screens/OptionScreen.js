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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { Camera, Permissions, } from 'expo';

const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'd43e615790234f3ab5acce84ba3bd55f'
});

// import clarifaiApi from '../backend/clarifaiApi';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };


  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    pictureTaken: false,
  };

  

  handlePictureTaken = () => {
    //1: get picture, pass result as a base64 string
    //2: navigate forward to the next screen 
    //3: for now, display image on next screen

    result = this.takePicture();
    //this.props.navigation.navigate("Display", {image: result})
  };

  takePicture = () => {
    this.setState({
      pictureTaken: true,
    });
    if (this.camera) {
      console.log('take picture');
      this.camera.takePictureAsync({onPictureSaved: (result)=> {
        
        app.models.predict(Clarifai.GENERAL_MODEL, result['uri'])
          .then(response => {
            console.log(response["status"]["code"]);
          })
          .catch(err=> {
            console.log(err);
          });
        //this.props.navigation.navigate("Display", {image: result["uri"]})
        return result;
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
