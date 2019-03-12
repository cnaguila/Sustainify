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
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import { 
  SearchBar, 
  Card, 
  ListItem,
  Icon,
 } from 'react-native-elements';


export default class DisplayImage extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    result: this.props.navigation.state.params.json,
  };



  handleJson(response) {
    return response.products.map((product, index) => {
        return (
          <Card 
            key={index}
            containerStyle={styles.cardContainer}
            >
            <TouchableOpacity 
              key={index}
              activeOpacity={0.7}
              onPress={()=>{
                const { navigate } = this.props.navigation;
                navigate('Product', {productImage: product.colors[0].image.sizes.Best.url, productName: product.brandedName, brand: product.brand.name, price: product.priceLabel, productURL: product.clickUrl})
              }}
              >
              <Image
                key={index} 
                style={styles.image}
                source={{uri: product.colors[0].image.sizes.Best.url}}
                />
            </TouchableOpacity>
            <Text style={styles.brandName}> {product.brand.name} </Text>
            <Text style={styles.productName}> {product.brandedName.substring(8)} <Text style={styles.price}> {product.priceLabel} </Text> </Text> 
          </Card>
        );
    });
  }

  render() {
    const { search } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.phoneInfoContainer}>
          {/* //an empty container - for styling phone info bar */}
        </View>

        <View style={styles.navBar}>
        
          <Text style={styles.navBarText}> SUSTAINIFY </Text>
        </View>

        <View style = {styles.contentContainer}>
          <View style = {styles.content}>
            <Text style={styles.infoText}> Here are some sustainable options! </Text>
            <ScrollView>
              {this.handleJson(this.state.result)}
            </ScrollView>

          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 181,
    width: 193,
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
    textAlign: 'center',
  },

  phoneInfoContainer: {
    backgroundColor: "#677C69",
    height: 20,
  },

//card container
  cardContainer: {
    height: 275,
    width: 268,
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
})