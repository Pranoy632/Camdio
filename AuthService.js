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

var _=require('lodash');


const authKey ='auth';

const userKey = 'user';


class AuthService{

   getAuthInfo(cb){

     AsyncStorage.multiGet([authKey,userKey],(err,val)=>{


       if(err){

         return cb(err);


       }

       if(!val){
         return cb();

       }

       var zippedObj = _.zipObject(val);

       if(!zippedObj [authKey]){

         return cb();



       }

       var authInfo = {
         header:{
           Authorization: 'Basic' + zippedObj[authKey]
         },
         user: JSON.parse(zippedObj[userKey])
       }

       return cb(null,authInfo);
     });




  }



      login(creds, cb){

   var b = new buffer.Buffer(creds.domain+".camdio.com" + ':' + creds.username + ':' + creds.password   );
   var encodedAuth = b.toString('base64');

    fetch('https://camdio.herokuapp.com/api/0.1/auth/login/' ,{
      method:"POST",
      headers:{'content-type':'application/json'},
      body: JSON.stringify({username: creds.username, password: creds.password, domain: creds.domain+".camdio.com"})
    })
      .then((response)=>{
        console.log("response",response.status);
        if(response.status == 200){

          return response;
        }

        throw{

          badCredentials: response.status == 403

        }
       })
        .then((response)=>{

        return response.json();

       })
          .then((results)=> {
            AsyncStorage.multiSet([
              [authKey, encodedAuth  ],
              [userKey, JSON.stringify(results)]

            ],(err)=>{

             if(err){

               throw err;


            }


              return cb({success: true});

            })

       })
      .catch((err)=>{

         return cb(err);

      });






       }

}


module.exports = new AuthService();
