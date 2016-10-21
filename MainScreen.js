"use strict";

import React, { Component, PropTypes } from 'react';
import Router from 'react-native-simple-router';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  ScrollView,
  AlertIOS,
  AsyncStorage,
  Platform,
  StatusBar
} from 'react-native';



var SignIn = require('./SignIn');

var AuthService = require('./AuthService');


var SCREEN_WIDTH = require('Dimensions').get('window').width;
var SCREEN_HEIGHT = require('Dimensions').get('window').height;



var Studentdetail = require('./Studentdetail');
var Camlogout = require('./Camlogout');

var BaseConfig = Navigator.SceneConfigs.FloatFromRight;


//AsyncStorage.removeItem('token', function(){console.log('token not found')});//remove the user from Async-Storage


var CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {

  snapVelocity: 8,

  edgeHitWidth: SCREEN_WIDTH,
});


var CustomSceneConfig = Object.assign({}, BaseConfig, {

  springTension: 100,
  springFriction: 1,


  gestures: null
});



const propTypes = {
  toRoute: PropTypes.func.isRequired
};





class Mainpage extends Component {

  constructor(props) {
    super(props);
}


 _signin() {
    this.props.toRoute({
      name: "Signin page",
      component: SignIn,
      hideNavigationBar:true,

    });
  }

  render() {

    return (
        <View>
          <View style={styles.containermainpage1}>
             <Text style={styles.welcome}>CAMDIO</Text>



             <TouchableOpacity onPress={this._signin.bind(this)} style={[styles.touchablesignin ,{position:'absolute',left:30,right:30,bottom:30}]}>
          <View>
          <Text style={styles.touchablesignintext}>SIGN IN</Text>
          </View>
          </TouchableOpacity>
        </View>
       </View>
    );

  }
}




Mainpage.propTypes = propTypes;


const styles1 = StyleSheet.create({
  header: {
    backgroundColor:'blue'

  },
});



console.log("first")
class  MainScreen extends React.Component {
  constructor(){
    super();
    this.state = {isLoading:true, page:Mainpage};


  }

  componentWillMount(){
    AuthService.checkToken();
    AsyncStorage.getItem('token').then((value)=>{

      if(value)
        this.setState({page:Studentdetail,isLoading:false});
       else
        this.setState({page:Mainpage,isLoading:false});
      }, ()=>{
        this.setState({page:Mainpage,isLoading:false});
      }).done();
  }


  render() {
     var initialRoute = {
       component:this.state.page,
       name:"CAMDIO",
       rightCorner:Camlogout
        };
    if(this.state.page===Mainpage) {
      initialRoute.hideNavigationBar=true;}
     if(!this.state.isLoading)
       return (
         <Router
         firstRoute={initialRoute}
         noStatusBar={true}
         rightCorner={Camlogout}
         borderBottomWidth = {StyleSheet.hairlineWidth,2.5}
         borderColor = '#c9aa5f'
         headerStyle={styles.header}
         titleStyle={styles.title}
         statusBarProps= {(Platform.OS === 'ios') ? null: StatusBar.setBackgroundColor('black',true)}

         />
      );
    else{
      return <View><Text>Loading...</Text></View>;
     }
  }
}






  const styles = StyleSheet.create({

  header:{
    backgroundColor:'#ffd777ff',
    height:SCREEN_HEIGHT / 10.5,
    justifyContent:'center'

 },


  title:{

    fontFamily:'Ruda-Bold',
    fontSize:24,
    fontWeight:'bold',
    alignSelf:'center'

  },

  containermainpage1: {
    justifyContent: 'center',
    alignItems: 'center',
    height:SCREEN_HEIGHT,
    backgroundColor: '#ffd777ff' ,
  },



  containermainpage2: {
    height:SCREEN_HEIGHT,
    backgroundColor:  '#ffd777ff' ,
   },

  containersignin:{

    flex:1

  },




  containerlogedin1:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#ffd777ff',
    height:SCREEN_HEIGHT / 9,
    borderBottomWidth: 2,
    borderBottomColor:'#c9aa5f'
  },





  containerlogedin2:{
    flex:1,

    alignItems:'center',
    backgroundColor:'#f2f2f2'

  },




  containerlogedin:{

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
    marginTop:10,
    justifyContent:'center',
    padding: 5 ,

  },


  touchablelogedin: {

    backgroundColor: '#424a5d',
    height: 55,
    borderColor:'#424a5d',
    borderWidth: 2,
    width:250,
    borderRadius: 10,
    justifyContent:'center',
    paddingHorizontal: 20 ,


  },



  touchablesignintext: {
    flex: 1,
    fontSize: 20,
    fontFamily:'Ruda-Bold',
    alignSelf: 'center',
    color:'white'
  },

   touchablelogedintext: {

    fontSize: 20,
    fontFamily:'Ruda-Bold',
    alignSelf: 'center',
    color:'white'
  },

  navborder: {


    borderBottomWidth:3


  }

});

module.exports = MainScreen;
