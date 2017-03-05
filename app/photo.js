import React, { Component, } from 'react';
import { View, Text, StyleSheet,Image,TextInput ,TouchableOpacity,StatusBar,Dimensions,ToastAndroid } from 'react-native';
import { Router, Scene,Actions} from 'react-native-router-flux';

import Camera from 'react-native-camera';

import DeviceInfo from 'react-native-device-info';

import * as firebase from 'firebase';

export default class WaypointPhoto extends Component {


  constructor(props) {
    super(props)

    this.camera=null;

    this.state = {
      location: {
        longitude: 52.5,
        latitude: 52.5,
      },
     camera: {
       aspect: Camera.constants.Aspect.fill,
       captureTarget: Camera.constants.CaptureTarget.cameraRoll,
       type: Camera.constants.Type.back,
       orientation: Camera.constants.Orientation.auto,
       flashMode: Camera.constants.FlashMode.auto,
     },
     isRecording: false
  };
}
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ location : {

          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          }
        })

      }
    )
  }

  render() {
    return (
      <View style={styles.container}>

        <Camera


          ref={(cam) => {

            this.camera = cam;

          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          defaultOnFocusComponent={true}
          playSoundOnCapture={true}
          flashMode={this.state.camera.flashMode}
          defaultTouchToFocus={true}
          mirrorImage={false} >
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.btn}>
            <Image source={require('../assets/takepic.png')} style={styles.pic_icon}/>
          </TouchableOpacity>
        </Camera>

        <View style={[styles.overlay, styles.header]}>
          <TouchableOpacity
            onPress={this.switchType}
            style={styles.btn}>
            <Image source={require('../assets/cameraswitch.png')} style={styles.icons}/>
          </TouchableOpacity>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>


        </View>
      </View>
    )
  }
  takePicture() {

    this.camera.capture()
      .then((data) => {
        console.log(data)
        var path = data.path
        let body = new FormData();
        Actions.pop();
        body.append('photo', {uri: path,name: 'photo.png', filename :'imageName.png',type: 'image/png'});
        body.append('Content-Type', 'image/png');
        body.append('lng', this.state.location.longitude);
        body.append('lat',this.state.location.latitude);
        body.append('userid',firebase.auth().currentUser);
        console.log('Here is the lng and lat');
        console.log(this.state.location.longitude);
        console.log(this.state.location.latitude);
        var url = "http://ture.azurewebsites.net/photo"
        fetch(url ,{ method: 'POST',headers:{
          "Content-Type": "multipart/form-data",
        } , body :body} )

        .then((res) => res.json())
        .then((res) => { console.log("response" +JSON.stringify(res)); })
        .catch((e) => console.log(e))
        .done()


        ToastAndroid.showWithGravity("Image added successfully, your waypoint will be here shortly!",ToastAndroid.SHORT,ToastAndroid.BOTTOM);
        })

      .catch(err => console.error(err));

 }

 switchType = () => {
   let newType;
   const { back, front } = Camera.constants.Type;

   if (this.state.camera.type === back) {
     newType = front;
   } else if (this.state.camera.type === front) {
     newType = back;
   }

   this.setState({
     camera: {
       ...this.state.camera,
       type: newType,
     },
   });
 }

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  preview: {
   flex: 8,
   justifyContent: 'flex-end',
   alignItems: 'center',

 },
 capture: {
   flex: 1,
   backgroundColor: '#fff',
   borderRadius: 5,
   color: '#000',
   padding: 10,
   margin: 40
 },
 overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
 header: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
 },
 btn: {
   padding: 5,
 },
 icons: {
   width: 30,
   height: 30,
   tintColor: "#FFFFFF",
 },
 pic_icon: {
   width: 50,
   height: 50,
   tintColor: "#FFFFFF",
 },

 bottomOverlay: {
   bottom: 0,
   backgroundColor: 'rgba(0,0,0,0.0)',
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
 },

})
