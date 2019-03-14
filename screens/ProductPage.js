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
        <ScrollView>

        <View style = {styles.contentContainer}>
          <View style = {styles.content}>
             <Card 
              containerStyle={styles.cardContainer}
              >

              <Image
               style={styles.image}
               source={{uri: this.state.productImage}}
              />

              <Text style={styles.brandName}> {this.state.brand} </Text>
              <Text style={styles.productName}> {this.state.productName.substring(8)} <Text style={styles.price}> {this.state.price} </Text> </Text>

              <Text style={styles.rating}>About Brand</Text>

              <Text style={styles.topics}>Eco-Friendly Material</Text>
              <View style={styles.outerbar}>
                <View style={styles.innerbareco}>
                </View>
              </View>
              <Text style={styles.explainText}>Everlane has uses eco-friendly materials for their clothing, including recycled fabrics.</Text>



              <Text style={styles.topics}>Renewable Energy</Text>
              <View style={styles.outerbar}>
                <View style={styles.innerbarenergy}>
                </View>
              </View>
              <Text style={styles.explainText}>It reduces its climate impact by consuming renewable energy in its supply chain.</Text>


              <Text style={styles.topics}>Cruelty Free</Text>
              <View style={styles.outerbar}>
                <View style={styles.innerbarcruelty}>
                </View>
              </View>
              <Text style={styles.explainText}>Everlane has a poor animal cruelty rating it still uses leather and wool in some of its products.</Text>

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

          </View>
        </View>
        </ScrollView>
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
    height: 990,
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
    height: 820,
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
    paddingBottom: 5
  },

  price: {
    fontFamily: 'roboto-reg',
    fontSize: 13,
    textAlign: 'right',
    paddingTop: 5,
    paddingBottom: 5
  },

  rating: {
    marginTop: 25,
    fontSize: 20,
    fontFamily: 'roboto-med',
    marginBottom: 5,
  },

  topics: {
    fontSize: 18,
    marginTop: 5,
    marginBottom: 10
  },



  outerbar: {
    height: 5,
    width: 250,
    backgroundColor: '#E5E9F2',
    marginBottom: 5,

  },
  innerbareco: {
    height: 5,
    width: 245,
    backgroundColor: '#8190A5',
    marginBottom: 5,
  },

  innerbarenergy: {
    height: 5,
    width: 175,
    backgroundColor: '#8190A5',
    marginBottom: 5,
  },

  innerbarcruelty: {
    height: 5,
    width: 100,
    backgroundColor: '#8190A5',
    marginBottom: 5,
  },

  explainText: {
    marginBottom: 18
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
    width: 288,
    marginTop: 20
  },

  backButtonStyle: {
    fontSize: 40,
    marginTop: 30,
    // marginLeft: 10,
    color: '#ffffff',
  },
})
