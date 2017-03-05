import React, { Component, } from 'react';
import { View, Text, StyleSheet,Image,TextInput ,TouchableOpacity } from 'react-native';
import { Router, Scene,Actions,ActionConst } from 'react-native-router-flux';


import * as firebase from 'firebase';

firebase.initializeApp({
    apiKey: "AIzaSyCcIw3CtklFMw7zrfj9J6MQGimzruB6TkI",
    authDomain: "ture-7e864.firebaseapp.com",
    databaseURL: "https://ture-7e864.firebaseio.com",
    storageBucket: "ture-7e864.appspot.com",
    messagingSenderId: "671983461893"
  });

export default class Ture_Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: 'unknown',
      password: 'unknown',
    }
  }
  login(email,pass) {
    try {
      firebase.auth()
          .signInWithEmailAndPassword(email, pass);

      console.log("Logged In!");
      Actions.MapScene({place: 'hi'});
      console.log("We have the line");
      // Navigate to the Home page


  } catch (error) {
      console.log(error.toString())
  }

}
  render() {
    return (
      <View style={styles.background}>

        <View style={styles.logo_cont}>
          <Image style={styles.logo} source={require('../assets/dotIcon.png')}/>
          <Text style={styles.top_text}> Welcome to Ture </Text>
          <Text style={styles.sub_text}> Please enter info to log in</Text>
        </View>

        <TextInput style={styles.input} placeholder="Email"
          placeholderTextColor="#FFFFFF"
          selectionColor="#FFFFFF"
          underlineColorAndroid="#FFFFFF"
          onChangeText={(text) => {
            this.setState({email: text});
          }}
          ></TextInput>
        <TextInput style={styles.input} placeholder="Password"
          placeholderTextColor="#FFFFFF"
            underlineColorAndroid="#FFFFFF"
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState({password: text});
          }}
          ></TextInput>
        <TouchableOpacity
          style={styles.login_btn}
          onPress={() => this.login(this.state.email,this.state.password)}
          ><Text>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.login_btn}
          onPress={Actions.register}
          ><Text>REGISTER</Text>
        </TouchableOpacity>

      </View>
    )
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
    justifyContent: 'center',

  },
  logo: {
    tintColor: '#FFFFFF',
    justifyContent: 'center',
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
