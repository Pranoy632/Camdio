"use strict";

import React, { Component} from 'react';
import {propTypes} from './MainScreen';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NavigatorIOS,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';


var AuthService = require('./AuthService');


var SCREEN_HEIGHT = require('Dimensions').get('window').height;


var NextPage = require('./StudAttendence');


console.log(NextPage)
class Studentdetail  extends Component {

  constructor(){
    super();
    this.state = {students:[]};
    console.log(this);
  }



  componentWillMount(){
    this.state = {fetching_students:true};
    this.getStudentList();
  }





  goNext(student_id){

    this.props.toRoute({
      component:NextPage,
      data:{student_id:student_id},
      name:"CAMDIO"
    });

  }

 getStudentList(){
    fetch('https://camdio.herokuapp.com/api/0.1/institute/1/student/' ,{
      method:'GET',
      headers:{'content-type':'application/json', 'Authorization':'Token '+  AuthService.token }

    })
      .then((response)=>{
      return response.json();
      })
      .then((responseData)=>{
        this.setState({students:responseData.results, fetching_students:false, loaderStyle:{width:0, height:0}});
        return responseData.results;
      })
      .catch((err)=>{
        console.log(err);
      });
 }

 render(){
    if(!this.state.fetching_students){
      return (
        <View>
          <ScrollView>
          <View style={styles.containerlogedin2}>
          {this.state.students.map(function(student, index){
           return (<TouchableOpacity   onPress={() => this.goNext(student.id)}     style={[styles.touchablelogedin,{marginTop:30}]} key={index}>
                    <View>
                    <Text style={styles.touchablelogedintext}>{student.first_name + ' '+ student.middle_name + ' '+ student.last_name}</Text>
                    </View>
                    </TouchableOpacity>);
          }.bind(this))}
         </View>
          </ScrollView>
       </View>
      );
    }
    else{
        return(
            <View  style={{flex:1,justifyContent:'center',alignItems:'center'}} >


             <ActivityIndicator
               animating={this.state.fetching_attendance}
               size="large"
               style={this.state.loaderStyle}
             />
      </View>

      );


    }
  }
}

Studentdetail.propTypes = propTypes;

const styles = StyleSheet.create({

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


  containerlogedin:{

    flex:1

  },


  containerlogedin1:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#ffd777ff',
    height:SCREEN_HEIGHT / 10,
    borderBottomWidth: 2,
    borderBottomColor:'#c9aa5f'
  },

  containerlogedin2:{

    flex:1,
    alignItems:'center',
    height:SCREEN_HEIGHT
  },




  touchablelogedintext: {

    fontSize: 20,
    fontFamily:'Ruda-Bold',
    alignSelf: 'center',
    color:'white'
  },

  navborder:{

    borderBottomWidth:2


  },


});

module.exports = Studentdetail;
