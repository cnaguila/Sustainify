//https://medium.com/@mlapeter/using-google-cloud-vision-with-expo-and-react-native-7d18991da1dd

var environments = {
    staging: {
      GOOGLE_CLOUD_VISION_API_KEY: "AIzaSyBwv0TTgHCdhxOMvzs6Q3rVNLwl7BIbjuU"
    },
    production: {
      // Warning: This file still gets included in your native binary and is not a secure way to store secrets if you build for the app stores. Details: https://github.com/expo/expo/issues/83
    }
  };
  function getReleaseChannel() {
    let releaseChannel = Expo.Constants.manifest.releaseChannel;
    if (releaseChannel === undefined) {
      return "staging";
    } else if (releaseChannel === "staging") {
      return "staging";
    } else {
      return "staging";
    }
  }
  function getEnvironment(env) {
    console.log("Release Channel: ", getReleaseChannel());
    return environments[env];
  }
  var Environment = getEnvironment(getReleaseChannel());
  export default Environment;