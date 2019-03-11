import React from 'react';
import { Text, TextInput, ScrollView, StyleSheet, View, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { 
  SearchBar, 
  Card, 
  ListItem, 
  Button, 
  Icon,
 } from 'react-native-elements';


 //Information retrieved from Good On You database 
 //https://directory.goodonyou.eco/brand/forever-21

 const brands = [ { brand: "Forever 21", image: "https://www.ignitesocialmedia.com/wp-content/uploads/2012/10/Forever-21-Logo.jpeg" }, 
                  { brand: "Gap", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZZ1V1Mk-gaeiEJtc01_fPrA9sMO4C4fBlC7t_f7uA3DoasZ1CwQ" }, 
                  { brand: "H&M", image: "http://www.globalbrandsmagazine.com/wp-content/uploads/2014/04/HM-Logo.jpg" }, 
                  { brand: "Hollister", image: "https://www.trademarkproperty.com/wp-content/uploads/2018/08/hollister-logo.png" }, 
                  { brand: "Levi's", image: "https://i.pinimg.com/originals/c6/82/f4/c682f487b999696f41a967107ce9313d.png" }, 
                  { brand: "Butter Cloth", image: "https://knoji.com/images/logo/butterclothcom.jpg" }, 
                  { brand: "Gucci", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Gucci_logo.svg/220px-Gucci_logo.svg.png" },
                  { brand: "Pacsun", image: "https://media.glassdoor.com/sqll/2292/pacific-sunwear-squarelogo-1383681362623.png" }, 
                  { brand: "Urban Outfitters", image: "https://www.urbanoutfitters.com/static/2.25.0/images/itunes_artwork_x3.png"}];


export default class LinksScreen extends React.Component {
  
  static navigationOptions = {
    title: 'Links',
    header: null,
  };

  state = {
    search: "",
  }

  updateSearch = search =>{
    this.setState({search});
  };

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
            <Text style={styles.infoText}> Find out if your favorite brands are sustainable</Text>
            <SearchBar
              placeholder="Search for a brand..."
              onChangeText = {this.updateSearch}
              value = {search}
              lightTheme = {true}
              placeholderTextColor = {"#86939e"}
              containerStyle = {styles.searchBar}
              inputContainerStyle = {styles.inputContainer}
              inputStyle = {styles.inputText}
              />

              {/* 3 x 3 grid for product page -- cite: https://stackoverflow.com/questions/49247633/how-to-create-3x3-grid-menu-in-react-native-without-3rd-party-lib */}
              <ScrollView style={styles.scrollContainer}>
                <View style = {styles.flexContainer}>
                  <View>
                    <View style={styles.grid}> 
                      <Image
                        style={styles.image}
                        resizeMode='cover'
                        source={{uri: brands[0].image}}
                        />
                      <Text style={styles.name}> {brands[0].brand} </Text>
                    </View>

                    <View style={styles.grid}> 
                      <Image
                        style={styles.image}
                        resizeMode='cover'
                        source={{uri: brands[1].image}}
                        />
                      <Text style={styles.name}> {brands[1].brand} </Text>
                    </View>

                    <View style={styles.gridEnd}> 
                      <Image
                        style={styles.image}
                        resizeMode='cover'
                        source={{uri: brands[2].image}}
                        />
                      <Text style={styles.name}> {brands[2].brand} </Text>
                    </View>
                  </View>

                  <View>
                    <View style={styles.grid}> 
                      <Image
                        style={styles.image}
                        resizeMode='cover'
                        source={{uri: brands[3].image}}
                        />
                      <Text style={styles.name}> {brands[3].brand} </Text>
                    </View>

                    <View style={styles.grid}> 
                      <Image
                        style={styles.image}
                        resizeMode='cover'
                        source={{uri: brands[4].image}}
                        />
                      <Text style={styles.name}> {brands[4].brand} </Text>
                    </View>

                    <View style={styles.gridEnd}> 
                      <Image
                        style={styles.image}
                        resizeMode='cover'
                        source={{uri: brands[5].image}}
                        />
                      <Text style={styles.name}> {brands[5].brand} </Text>
                    </View>
                  </View>

                  <View>
                    <View style={styles.grid}> 
                      <Image
                        style={styles.image}
                        resizeMode='cover'
                        source={{uri: brands[6].image}}
                        />
                      <Text style={styles.name}> {brands[6].brand} </Text>
                    </View>

                    <View style={styles.grid}> 
                      <Image
                        style={styles.image}
                        resizeMode='cover'
                        source={{uri: brands[7].image}}
                        />
                      <Text style={styles.name}> {brands[7].brand} </Text>
                    </View>

                    <View style={styles.gridEnd}> 
                      <Image
                        style={styles.image}
                        resizeMode='cover'
                        source={{uri: brands[8].image}}
                        />
                      <Text style={styles.name}> {brands[8].brand} </Text>
                    </View>
                  </View>
                  </View>
                </ScrollView>

            </View>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
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

//Styling for search bar
  searchBar: {
    backgroundColor: "#e2e2e3",
  },

  inputContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    width: 358,
    height: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },

  inputText: {
    color: '#000',
  },


//Styling for grid view
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },

  flexContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollContainer: {
    backgroundColor: "#e2e2e3",
    width: 400,
    height: 250,
    marginTop: 10, 
  },

  name: {
    textAlign: 'center',
    color: '#343F4B',
    fontFamily: 'roboto-bold',
    fontSize: 15,
    paddingTop: 2,
  },

  grid: {
    width: 716*0.2, 
    height: 716*0.2,
    marginBottom: 1,
    marginLeft: 1
  },

  gridEnd: {
    width: 716*0.2, 
    height: 716*0.2
  },

});
