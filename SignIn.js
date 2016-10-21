"use strict";

import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  AlertIOS,
  AsyncStorage
} from 'react-native';


import {propTypes} from './MainScreen';


var AuthService = require('./AuthService');
var SCREEN_WIDTH = require('Dimensions').get('window').width;
var SCREEN_HEIGHT = require('Dimensions').get('window').height;
var Studentdetail = require('./Studentdetail');
var Camlogout = require('./Camlogout');
var buffer = require('buffer');
class SignIn extends Component{
  constructor(props){
    super(props);
    this.state = {
    showProgress: false,
    };
  }




  onSigninPressed(){



     this.setState({showProgress: true});


    var authService = require('./AuthService');
      authService.login({
        username: this.state.username,
        password: this.state.password,
        domain: this.state.domain
    }, (results)=> {
      this.setState(Object.assign({
        showProgress: false
       },results));
      if(results.success){
        this.props.resetToRoute({
          component:Studentdetail,
          name:"CAMDIO",
          rightCorner:Camlogout,
          titleStyle:styles.title

        });
      }
    });


  }

  render(){






    var errorCtrl;

          if(!this.state.success && this.state.badCredentials){
            errorCtrl = <Text style = {styles.error}>
                   No account found for user.
              </Text>;
          }




    return(

       <View>
         <View style={styles.containersignin1}>

           <View style={{flexDirection:'row',marginTop:60}}     >
              <TextInput

             style={{height: 35,width:250,fontFamily:'ruda'}}
             placeholder = "Domain name"
             autoFocus = {true}
             autoCorrect = {false}
             keyboardType = {'default'}
             autoCapitalize = {'none'}
             onChangeText={(domaintext) => this.setState({domain: domaintext})}

         />

            <Text style={{fontSize:16,fontFamily:'ruda'}}>.camdio.com</Text>

        </View>

         <TextInput
            style={{height: 35,width:350,marginTop:20,fontFamily:'ruda'}}
            placeholder = "Enter Username"
            keyboardtype ={'default'}
            autoCorrect = {false}
            autoCapitalize = {'none'}
            onChangeText={(usertext) => this.setState({username: usertext})}

         />

           <TextInput
             style={{height: 35,width:350,fontFamily:'ruda',marginTop:20}}
             placeholder = "Enter Password"
             keyboardType = {'default'}
             autoCorrect = {false}
             autoCapitalize = {'none'}
             secureTextEntry={true}
             onChangeText={(passtext) => this.setState({password: passtext })}

        />

            <ActivityIndicator
            animating={true}
            size="large"
s            style={[styles.loader,{opacity: this.state.showProgress ? 1.0 : 0.0}]}

             />

            <View style={{height:10,alignItems:'center'}}  >
              {errorCtrl}
            </View>

        <TouchableOpacity disabled={this.state.showProgress} onPress={this.onSigninPressed.bind(this)} style={[styles.touchablesignin ,{position:'absolute',left:30,right:30,bottom:30}]}>
             <View>
                <Text style={styles.touchablesignintext}>SIGN IN</Text>
             </View>
          </TouchableOpacity>


        </View>

     </View>


    );



  }

}

SignIn.propTypes = propTypes;
const styles = StyleSheet.create({

  header:{
    backgroundColor:'#ffd777ff',
    height:SCREEN_HEIGHT / 10,
    justifyContent:'center'

 },


  title:{

    fontFamily:'Ruda-Bold',
    fontSize:24,
    fontWeight:'bold',
    alignSelf:'center'

  },

  containersignin1: {
    flex:1,
    justifyContent: 'center',
    paddingHorizontal:10,
    height:SCREEN_HEIGHT,
    backgroundColor: '#ffd777ff' ,
  },

  containersignin2: {
    flex:1,
    height:SCREEN_HEIGHT,
    backgroundColor:  '#ffd777ff' ,
  },
  containererror: {
    flex:1,
    backgroundColor: '#ffd777ff',
    height:SCREEN_WIDTH,
    alignItems:'center'

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



  loader: {

    marginTop:80

  },


  error: {
   color:'red',
 }


});


module.exports = SignIn;
