"use strict";

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';



var SignIn = require('./SignIn');

var AuthService = require('./AuthService');


var SCREEN_WIDTH = require('Dimensions').get('window').width;
var SCREEN_HEIGHT = require('Dimensions').get('window').height;




var BaseConfig = Navigator.SceneConfigs.FloatFromRight;

var CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
  // Make it snap back really quickly after canceling pop
  snapVelocity: 8,
  // Make it so we can drag anywhere on the screen
  edgeHitWidth: SCREEN_WIDTH,
});

var CustomSceneConfig = Object.assign({}, BaseConfig, {
  // A very tighly wound spring will make this transition fast
  springTension: 100,
  springFriction: 1,
  // Use our custom gesture defined above

  gestures: null
});

var Mainpage  = React.createClass({
  _signin() {
    this.props.navigator.push({id: 2,});
  },

  render() {
    return (
        <View>
          <View style={styles.containermainpage1}>
          <Text style={styles.welcome}>CAMDIO</Text>
          </View>

          <View style={styles.containermainpage2}>
          <View style={{width: 375,marginTop:35,paddingHorizontal:20}}>
          <TouchableOpacity onPress={this._signin} style={styles.touchablesignin}>
          <View>
          <Text style={styles.touchablesignintext}>SIGN IN</Text>
          </View>
          </TouchableOpacity>
          </View>
          </View>


        </View>
    );
  }
});


var Signinpage = React.createClass({
  _handlePress() {
    this.props.navigator.pop();
  },


  componentDidMount: function(){

    AuthService.getAuthInfo((err, authInfo)=>{
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null

      })

    });

  },


  render() {

    if(this.state.checkingAuth){
      return(
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator
            animating={true}
             size="large" />


          </View>

      );


    }




    if(this.state.isLoggedIn){
      return(
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text>USER LOGGEDIN</Text>
          </View>

      );

    }else{


    return (
        <View style={styles.containersignin}>

        <SignIn onLogin={this.onLogin} />

        </View>
    );


       }
  },

  onLogin: function(){
    this.setState({isLoggedIn: true});
  },


  getInitialState: function() {

    return{

      isLoggedIn: false,

      checkingAuth : true

    };

  }



});






var  MainScreen = React.createClass({

  _renderScene(route, navigator) {
    if (route.id === 1) {
      return <Mainpage navigator={navigator} />
    } else if (route.id === 2) {
      return <Signinpage navigator={navigator} />
    }
  },

  _configureScene(route) {
    return CustomSceneConfig;
  },




  render() {
    return (
        <Navigator
      initialRoute={{id: 1, }}
      renderScene={this._renderScene}
      configureScene={this._configureScene} />
    );
  }
});

const styles = StyleSheet.create({
  containermainpage1: {
    justifyContent: 'center',
    alignItems: 'center',
    height:SCREEN_HEIGHT / 1.2,
    backgroundColor: '#ffd777ff' ,
  },

  containermainpage2: {
    height:SCREEN_HEIGHT,
    backgroundColor:  '#ffd777ff' ,
   },


  containersignin:{

    flex:1

  },


  welcome: {
    fontSize: 50,
    color:'white',
    textAlign: 'center',
    fontFamily:'Ruda-Bold',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    fontFamily:'Ruda-Black',
    marginBottom: 5,
  },

  touchablesignin: {
    flex:1,
    backgroundColor: '#68dff0ff',
    height: 55,
    borderColor: 'skyblue',
    borderWidth: 2,
    borderRadius: 10,
    justifyContent:'center',
    padding: 5 ,

  },

  touchablesignintext: {
    flex: 1,
    fontSize: 20,
    fontFamily:'Ruda-Bold',
    alignSelf: 'center',
    color:'white'
  },



});

module.exports = MainScreen;
