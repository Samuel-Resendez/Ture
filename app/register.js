import React, { Component, } from 'react';
import { View, Text, StyleSheet,Image,TextInput ,TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
import { Router, Scene,Actions,ActionConst } from 'react-native-router-flux';

import * as firebase from "firebase";




export default class Registration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "Unknown",
      password: "Unknown",
    }

  }

  render() {
    return(
      <View style={styles.background}>
        <View style={styles.logo_cont}>
          <Image source={require('../assets/dotIcon.png')} style={styles.logo}/>
          <Text style={styles.top_text}> Ture </Text>
          <Text style={styles.sub_text}> Please enter your info below</Text>
        </View>

      <TextInput
        style={styles.input}
        placeholderTextColor="#FFFFFF"
        selectionColor="#FFFFFF"
        placeholder="Email"
        underlineColorAndroid="#FFFFFF"
        onChangeText={(text) => {
          this.setState({email: text})
        }}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#FFFFFF"
        selectionColor="#FFFFFF"
        placeholder="Password"
          underlineColorAndroid="#FFFFFF"
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState({password: text})
          }}
      />

      <TouchableOpacity
        style={styles.login_btn}
        onPress={() => this.signup(this.state.email,this.state.password)}>
        <Text> REGISTER </Text>
      </TouchableOpacity>
      </View>
    )
  }

  async signup(email, pass) {

    try {
        await firebase.auth()
            .createUserWithEmailAndPassword(email, pass);

        console.log("Account created");

        // Navigate to the Home page, the user is auto logged in
        Actions.MapScene({place: 'hi'});

    } catch (error) {
        console.log(error.toString());
        ToastAndroid.show(error.toString(),ToastAndroid.SHORT);
    }


  }

}




const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#3498db',


  },
  logo_cont: {
    alignItems: 'center',
    flexGrow: 1,

  },
  logo: {
    alignItems: 'center',
    tintColor: '#FFFFFF',
    marginTop: 20,
    height: 100,
    width: 100,
  },
  login_btn: {
    borderRadius: 5,
    height: 50,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#2980b9",
  },

  top_text: {
    fontFamily: 'sans-serif-thin',
    textAlign: 'center',
    fontSize: 30,
    color: '#FFFFFF',
  },
  sub_text: {
    marginTop: 10,
    fontFamily: 'sans-serif-thin',
    textAlign: 'center',
    fontSize: 20,
    color: '#FFFFFF',
  },
  input: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    backgroundColor: '#3498db',
    color: "#FFFFFF",
  }

})
