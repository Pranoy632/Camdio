'use strict';


import React, { Component} from 'react';
import{

  AppRegistry,
  StyleSheet,
  View,
  NavigatorIOS

} from 'react-native';


var studentdeatil = require('./studentdetail.js');

var NavigationRoot = React.createClass({

  render(){
    console.log(studentdeatil);
    return(

        <NavigatorIOS
          style = {styles.container}
          initialRoute={{
          title: "Root",
          navigationBarHidden: true,
          component:studentdeatil
      }}/>

     );
  }


});

AppRegistry.registerComponent('NavigationRoot', () => NavigationRoot);
