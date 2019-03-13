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


import { 
  SearchBar, 
  Card, 
  ListItem,
  Icon,
 } from 'react-native-elements';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationActions } from 'react-navigation';



export default class DisplayImage extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  state = {
    productName: this.props.navigation.state.params.productName,
    productImage: this.props.navigation.state.params.productImage,
    brand: this.props.navigation.state.params.brand,
    price: this.props.navigation.state.params.price,
    url: this.props.navigation.state.params.productURL,
    result: this.props.navigation.state.params.result,
  };
  render() {
    const { search } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.phoneInfoContainer}>
          {/* //an empty container - for styling phone info bar */}
        </View>

        <View style={styles.navBar}>
          <TouchableOpacity>
              <MaterialCommunityIcons 
                onPress={()=>{
                  this.setState({
                  },()=>{navigate("Display", {json: this.state.result, result: this.state.result})})
                }}
                name="chevron-left"
                style={styles.backButtonStyle}>
              </MaterialCommunityIcons>
          </TouchableOpacity> 
          <Text style={styles.navBarText}> SUSTAINIFY </Text>
        </View>

        <View style = {styles.contentContainer}>
          <View style = {styles.content}>
            <ScrollView>
             <Card 
              containerStyle={styles.cardContainer}
              >

              <Image
               style={styles.image}
               source={{uri: this.state.productImage}}
              />

              <Text style={styles.brandName}> {this.state.brand} </Text>
              <Text style={styles.productName}> {this.state.productName.substring(8)} <Text style={styles.price}> {this.state.price} </Text> </Text>

              <TouchableOpacity style={styles.scanButton}>
                  <Text 
                    style={styles.homeButtonText} 
                    onPress={()=>{
                      this.setState({}, ()=>{
                        navigate("Web", {url: this.state.url, productImage: this.state.productImage, 
                          productName: this.state.productName, brand: this.state.brand, price: this.state.price, productURL: this.state.url, result: this.state.result});
                      })
                    }}>Go to Store</Text>
                </TouchableOpacity> 
             </Card>
            </ScrollView>

          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 251,
    width: 239.5,
    alignSelf: 'center',
    borderWidth: .75,
    borderColor: '#8492A6',
  },

  content: {
    alignItems: 'center',
    backgroundColor: '#E2E2E3',
    width: '100%',
    height: '100%',
  },

  container: {
    backgroundColor: '#6F0C4F',
  },

  infoText: {
    color: '#47525E',
    fontFamily: 'roboto-bold',
    fontSize: 21,
    lineHeight: 30,
    paddingTop: 30,
    paddingBottom: 5,
    textAlign: 'center',

  },

  navBar: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#677C69',
  },

  navBarText: {
    color: "#ffffff",
    flex: 1,
    fontFamily: 'abril-fatface',
    fontSize: 50,
    letterSpacing: 5,
    paddingTop: 15,
    paddingRight: 40,
    textAlign: 'center',
  },

  phoneInfoContainer: {
    backgroundColor: "#677C69",
    height: 20,
  },

  //card container
  cardContainer: {
    height: 544,
    width: 326,
    borderRadius: 6,
  },

  productName: {
    color: '#47525E',
    fontFamily: 'roboto-med',
    fontSize: 13,
    textAlign: 'center',
    paddingTop: 5,
  },

  brandName: {
    fontFamily: 'roboto-bold',
    fontSize: 21,
    textAlign: 'center',
    paddingTop: 5,
  },

  price: {
    fontFamily: 'roboto-reg',
    fontSize: 13,
    textAlign: 'right',
    paddingTop: 5,
  },

  //button styling
  homeButtonText: {
    color: '#ffffff',
    fontFamily: 'roboto-reg',
    fontSize: 20,
    letterSpacing: 5,
    textAlign: 'center',
    paddingTop: 13,
    paddingBottom: 15
  },

  scanButton: {
    backgroundColor: "#486556",
    borderRadius: 8,
    color: "#ffffff",
    height: 50,
    marginTop: 50,
    width: 288
  },

  backButtonStyle: {
    fontSize: 40,
    marginTop: 30,
    // marginLeft: 10,
    color: '#ffffff',
  },
})