import React, {Component} from 'react';
import {WebView, Text} from 'react-native';

export default class WebPage extends React.Component {
    state = {
        webURL: this.props.navigation.state.params.url,
      };
  
    render() {
        return (
            <WebView
                source={{uri: this.state.webURL}}
                style={{marginTop: 20}}
            />
            );
    }
  }