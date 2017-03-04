import React, { Component, } from 'react';
import { View, Text, StyleSheet,Image,TextInput ,TouchableOpacity } from 'react-native';
import { Router, Scene,Actions,ActionConst } from 'react-native-router-flux';


export default class Ture_Login extends Component {
  render() {
    return (
      <View style={styles.background}>

        <View style={styles.logo_cont}>
          <Image style={styles.logo} source={require('../assets/dotIcon.png')}/>
          <Text style={styles.top_text}> Welcome to Ture </Text>
          <Text style={styles.sub_text}> Please enter info to log in</Text>
        </View>

        <TextInput style={styles.input} placeholder="Username"
          ></TextInput>
        <TextInput style={styles.input} placeholder="Password"
          secureTextEntry={true}
          ></TextInput>
        <TouchableOpacity
          style={styles.login_btn}
          onPress={Actions.MapScene}
          ><Text>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.login_btn}
          onPress={Actions.MapScene}
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
  }

})
