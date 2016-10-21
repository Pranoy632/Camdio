'use strict';

import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator

} from 'react-native';
var AuthService = require('./AuthService');


import {propTypes} from './MainScreen';

import {Column as Col, Row} from 'react-native-flexbox-grid';


var BackPage = require('./Studentdetail');

var SCREEN_HEIGHT = require('Dimensions').get('window').height;







class StudAttendence extends Component{

  constructor(props) {
    super(props);

    console.log("student from student detail:"+ this.props.data.student_id);
  }




  componentWillMount(){


    this.state = {fetching_attendance:true};
    this.setState({loaderStyle :{ alignSelf:'center'}});
    fetch('https://camdio.herokuapp.com/api/0.1/institute/1/attendance/?page=1' ,{
      method:'GET',
      headers:{'content-type':'application/json', 'Authorization':'Token '+ AuthService.token}

    })
      .then((response)=>{
        console.log("response",response.status, response);
        return response.json();
      })
      .then((responseData)=>{
        this.setState({studattend :responseData.results});
        this.setState({fetching_attendance :false});
        this.setState({loaderStyle :{width: 0, height:0}});
        return responseData.results;
      })
      .catch((err)=>{
        console.log("ftdfdf", err);
      });

  }








  render(){

    console.log("inside render", this.state.studattend);







    if(this.state.fetching_attendance){

      return(

       <View  style={{flex:1,justifyContent:'center',alignItems:'center'}}     >


             <ActivityIndicator
               animating={this.state.fetching_attendance}
               size="large"
               style={this.state.loaderStyle}
        />




         </View>

      );


    }







    if(!this.state.fetching_attendance){





      return(



          <View style={styles.container}>




          <ScrollView style={{backgroundColor:'#f1f1f1'}}>




            <View style={styles.innercontainer}>
          <Row>
          <Col sm={4} style={[styles.colStyle, styles.cellBorder]}>
          <View>
                    <Text style={[styles.tableHeader,styles.colTextStyle]}>
                      Date
                    </Text>
                  </View>
                </Col>
          <Col sm={3} style={[styles.colStyle, styles.cellBorder]}>
                  <View>
          <Text style={[styles.tableHeader,styles.colTextStyle]}>
                      Present
                    </Text>
                  </View>
                </Col>
          <Col sm={2} style={[styles.colStyle, styles.cellBorder]}>
                  <View>
                    <Text style={[styles.tableHeader,styles.colTextStyle]}>
                       Leave
                    </Text>
                  </View>
                </Col>
          <Col  sm={2} style={[styles.colStyle, styles.cellBorder]}>
                  <View>
          <Text style={[styles.tableHeader,styles.colTextStyle]}>
                      Absent
                    </Text>
                   </View>
                </Col>
          </Row>
          {this.state.studattend.map(function(attendance, index){
            styles.colStyle = {backgroundColor:(index%2)==0?'#f9f9f9':'white'};

            return(
                <Row size={12} key={index}>
                <Col sm={4} style={[styles.colStyle, styles.cellBorder]}>
               <View>
                <Text style={styles.colTextStyle}>{attendance.date}</Text>
               </View>
          </Col>
                <Col  sm={3}  style={[styles.colStyle, styles.cellBorder]}>
               <View>
                <Text  style={styles.colTextStyle}>{attendance.id}</Text>
               </View>
          </Col>
          <Col  sm={2}  style={[styles.colStyle, styles.cellBorder]}>
               <View>
                <Text  style={styles.colTextStyle}>{attendance.id}</Text>
               </View>
          </Col>
          <Col  sm={2}  style={[styles.colStyle, styles.cellBorder]}>
               <View>
                <Text  style={styles.colTextStyle}>{attendance.id}</Text>
               </View>
          </Col>

                </Row>
            );}.bind(this))}
          </View>
      </ScrollView>
      </View>
    );

    }//if condition
    else {

      return false;
    }


  }


}

var styles = StyleSheet.create({
  container:{

    flex:1

  },

  headercss:{
    justifyContent:'center',
    borderColor:'white',
    borderBottomWidth:1,
    borderBottomColor:'black'

  },

   containerlogedin1:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#ffd777ff',
    height:SCREEN_HEIGHT / 9,
    borderBottomWidth: 2,
    borderBottomColor:'#c9aa5f'
  },



  cellBorder:{
    flex:1,
    borderColor:'#797979',
    borderBottomWidth:1,
    borderWidth:0.5,
    justifyContent:'center'
  },



  colTextStyle:{
    padding:5,
    paddingTop:10,
    paddingBottom:10,
    textAlign:'center',
    alignSelf:'center'
  },

  tableHeader:{
    fontFamily:'ruda',
    fontWeight:'bold'
  },

 innercontainer: {
   flex: 1,
   margin:15,
   backgroundColor:'white',
   shadowColor:'black',
   shadowOffset: {width:0, height:2},
   shadowRadius:2,
   shadowOpacity:1.0

 },

  loader: {

    marginTop: 80

  },


});
StudAttendence.propTypes = propTypes;
module.exports = StudAttendence;
