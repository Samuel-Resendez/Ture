import React, { Component, } from 'react';
import { View, Text, StyleSheet,Image,TextInput ,TouchableOpacity,StatusBar } from 'react-native';
import { Router, Scene,Actions} from 'react-native-router-flux';

import MapView from 'react-native-maps';

export default class Map_Scene extends Component {

  constructor(props) {
    super(props);

    this.state = {
      region: {
          latitude: 37.8875,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 1.3*0.0922,
        },

      markers: [],
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {

        this.setState({ region : {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.123,
          }
        })
        console.log(this.state.region);
      }
    )
  }

  render() {
    return (
        <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={Actions.PhotoScene}>
          <Image source={require('../assets/camera.png')} style={styles.header_button}/>
          </TouchableOpacity>
          <Text style={styles.header_text}>Ture</Text>
          <TouchableOpacity
            onPress={Actions.Itinerary}
            >
          <Image source={require('../assets/marker.png')} style={styles.header_button}/>
          </TouchableOpacity>
        </View>
        <MapView style={styles.map}
          showsUserLocation={true}
          initialRegion={this.state.region} />
        </View>

    )
  }
}

styles = StyleSheet.create({
  container: {
    flex:1,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: "#2980b9",
    justifyContent: 'center',

    height:60,
  },
  header_text: {
    marginTop: 5,
    fontFamily: 'sans-serif-thin',
    textAlign: 'center',
    fontSize: 35,
    color: '#FFFFFF',
    flex: 1,
  },
  header_button: {
    marginTop: 10,
    marginLeft: 20,
    width: 40,
    height: 40,
    tintColor: "#FFFFFF",
    marginRight: 20,
  },
  map: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
  },
})
module.export=Map_Scene
