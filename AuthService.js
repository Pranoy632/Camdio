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
  AsyncStorage
} from 'react-native';


var buffer = require('buffer');

var _ = require('lodash');


const authKey ='auth';

const userKey = 'user';


class AuthService{
  checkToken(){
    AsyncStorage.getItem('token').then((value)=>{
      this.token = value;
    }).done();
  }

  login(creds, cb){

  //  var b = new buffer.Buffer(creds.domain+".camdio.com" + ':' + creds.username + ':' + creds.password   );
//   var encodedAuth = b.toString('base64');

    fetch('https://camdio.herokuapp.com/api/0.1/auth/login/' ,{
      method:"POST",
      headers:{'content-type':'application/json'},
      body: JSON.stringify({username: creds.username, password: creds.password, domain: creds.domain+".camdio.com"})
    })
      .then((response)=>{
        console.log("response",response.status);
        if(response.status == 200){
          return response.json();
        }
        throw{
          badCredentials: response.status == 403

        };
      })
          .then((responseData)=>{
            AsyncStorage.setItem('token', responseData.token);
            this.token = responseData.token;
        return responseData;

       })
          .then((results)=> {
            return  cb({success: true});
       })
      .catch((err)=>{

         return cb(err);

      });






       }

  logout(success_callback, err_callback){
    return fetch('https://camdio.herokuapp.com/api/0.1/auth/logout/' ,{
      method:'POST',
      headers:{'content-type':'application/json', 'Authorization':'Token '+  AuthService.token },
      body:JSON.stringify({})

    })
      .then((response)=>{
        console.log(this);
        AsyncStorage.removeItem('token');//remove the user from Async-Storage
        return success_callback();
      })
      .catch((err)=>{
        return err_callback()
        console.log(err);
      });
  }

}
module.exports = new AuthService();
