import React, {Component} from 'react';
import {WebView, Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class WebPage extends React.Component {
    state = {
        webURL: this.props.navigation.state.params.url,
        productName: this.props.navigation.state.params.productName,
        productImage: this.props.navigation.state.params.productImage,
        brand: this.props.navigation.state.params.brand,
        price: this.props.navigation.state.params.price,
        url: this.props.navigation.state.params.productURL,
        result: this.props.navigation.state.params.result,
      };
  
    render() {
      const {navigate} = this.props.navigation;
        return (
          <View style={{flex: 1}}>
            <View style={styles.navBar}>
              <TouchableOpacity>
                <MaterialCommunityIcons 
                  onPress={()=>{
                    this.setState({},()=>{
                      navigate("Product", {url: this.state.url, productImage: this.state.productImage, 
                      productName: this.state.productName, brand: this.state.brand, price: this.state.price, productURL: this.state.url, result: this.state.result, json: this.state.result})
                    })
                  }}
                  name="close"
                  style={styles.backButtonStyle}>
                </MaterialCommunityIcons>
            </TouchableOpacity> 
            </View>

            <WebView
                source={{uri: this.state.webURL}}
                style={{marginTop: 50}}
            />
          </View>
      );
    }
  }

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    height: 50,
  },

  backButtonStyle: {
    fontSize: 40,
    color: 'white',
    marginTop: 25,
    marginLeft: 360,

  },
})