import React, { Component, } from 'react';
import { View, Text, StyleSheet,Image,TextInput ,TouchableOpacity,StatusBar,Dimensions,ToastAndroid } from 'react-native';
import { Router, Scene,Actions} from 'react-native-router-flux';


export default class WayPointDescription extends Component {


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.btnText}> Ture Waypoint Description </Text>

        </View>

        <Text style={styles.title}> Waypoint: {this.props.index} </Text>
        <Text style={styles.description}>{this.props.caption}</Text>
        <View style={styles.img_cont}>
          <Image source={{uri: this.props.url}} style={styles.splash_image}/>
        </View>


      </View>
    )
  }
}


const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    flex: 0,
    height: 60,
    flexDirection: 'row',
    backgroundColor: "#2988b9",
  },

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",

  },
  title: {
    flex: 1,
    fontFamily: 'sans-serif-thin',
    fontSize: 40,
    textAlign: 'center',
  },
  img_cont: {
    flex:5,
    alignItems: 'center',
  },
  splash_image: {
    marginTop: 5,
    alignItems: 'center',
    width: 300,
    height: 350,
  },
  description: {
    flex: 1,
    fontFamily: 'sans-serif-thin',
    fontSize: 25,
    textAlign: 'center',

  },

  btnText: {
    marginTop: 10,
    textAlign: 'center',
    color: "#FFFFFF",
    fontFamily: 'sans-serif-thin',
    fontSize: 30,
  }
})
