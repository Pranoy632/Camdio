"use strict";

import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Alert,
  Modal,
  ActivityIndicator
} from 'react-native';

var AuthService = require('./AuthService');
var SCREEN_HEIGHT = require('Dimensions').get('window').height;
var SCREEN_WIDTH = require('Dimensions').get('window').width;
class Camlogout  extends Component {

  constructor(props){
    super(props);
    this.state = {modalVisible:false}
  }
  sendToMainscreen(){

     this.props.toRoute({
      name:'CAMDIO',
       component: require('./MainScreen'),
      hideNavigationBar:true
    });
  }

  logout(){
    Alert.alert(
      'Do you want to logout?',
      null,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () =>{
          this.setState({modalVisible:true});
               AuthService.logout(() => {
            this.setState({modalVisible:false});
           this.sendToMainscreen();
          }, ()=>{
            console.log("error in logout");
          });
        }},
      ]
    );

 }

  render() {
    return (
        <View>
        <Text  onPress={this.logout.bind(this)} style={{color:'white',fontFamily:'Ruda-Bold',fontWeight:'bold',right:15,fontSize:15}}>Logout</Text>
        <View>
        <Modal
      animationType={"slide"}
      transparent={true}
      visible={this.state.modalVisible}
      onRequestClose={() => {alert("Modal has been closed.")}}
        >
        <View style={{backgroundColor:'rgba(0,0,0,0.4)',height:SCREEN_HEIGHT}}>
        <View style={{backgroundColor:'lightgray',marginTop: SCREEN_HEIGHT/2.5, justifyContent:'center', alignItems:'center', height:SCREEN_HEIGHT/6, width:SCREEN_WIDTH/1.5, marginLeft:SCREEN_WIDTH/6,borderRadius:20}}>

        <ActivityIndicator size='large' color='black'></ActivityIndicator>
         <Text>Please wait...</Text>
        </View>

        </View>
        </Modal>

        </View>
        </View>
    );
  }
}

Camlogout.propTypes ={toRoute: PropTypes.func.isRequired};

module.exports = Camlogout;
