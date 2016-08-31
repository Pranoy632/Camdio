"use strict";

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  AlertIOS
} from 'react-native';


var SCREEN_WIDTH = require('Dimensions').get('window').width;
var SCREEN_HEIGHT = require('Dimensions').get('window').height;

var buffer = require('buffer');

class SignIn extends Component{

  constructor(props){
    super(props);

    this.state = {

      showProgress: false
    };


  }








  onSigninPressed(){

    console.log('Attempting to log in with username ' + this.state.domain + this.state.username + this.state.password);
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

      if(results.success && this.props.onLogin){
        this.props.onLogin();

      }

    });


  }






  render(){

    var errorCtrl;

          if(!this.state.success && this.state.badCredentials){
            errorCtrl = <Text style = {styles.error}>
                   No account found for user.
              </Text>;

            // errorCtrl = AlertIOS.alert('No account found for user');
          }




    return(

       <View>
         <View style={styles.containersignin1}>


        <View style={{flexDirection:'row'}}     >
        <TextInput

             style={{height: 17,width:250,fontFamily:'ruda'}}
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
      style={{height: 17,width:350,marginTop:20,fontFamily:'ruda'}}
            placeholder = "Enter Username"
            keyboardtype ={'default'}
            autoCorrect = {false}
            autoCapitalize = {'none'}
            onChangeText={(usertext) => this.setState({username: usertext})}

         />

           <TextInput
             style={{height: 17,width:350,fontFamily:'ruda',marginTop:20}}
             placeholder = "Enter Password"
             keyboardType = {'default'}
             autoCorrect = {false}
             autoCapitalize = {'none'}
             secureTextEntry={true}
             onChangeText={(passtext) => this.setState({password: passtext })}

        />

             {errorCtrl}




            <ActivityIndicator
            animating={this.state.showProgress}
            size="large"
            style={styles.loader}

          />


         </View>

        <View style={styles.containersignin2}>
         <View style={{width: 375,marginTop:35,paddingHorizontal:20}}>
          <TouchableOpacity onPress={this.onSigninPressed.bind(this)} style={styles.touchablesignin}>
         <View>
           <Text style={styles.touchablesignintext}>SIGN IN</Text>
         </View>
            </TouchableOpacity>
         </View>
        </View>





       </View>


    );



  }

}


const styles = StyleSheet.create({

  containersignin1: {
    justifyContent: 'center',
    paddingHorizontal:10,
    height:SCREEN_HEIGHT / 1.2,
    backgroundColor: '#ffd777ff' ,
  },

  containersignin2: {
    height:SCREEN_HEIGHT,
    backgroundColor:  '#ffd777ff' ,
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

    marginTop: 80

  },

  error: {


    color:'red',


  }


});


module.exports = SignIn;
