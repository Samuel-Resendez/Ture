import React, { Component, } from 'react';
import { View, Text, StyleSheet,Image,TextInput ,TouchableOpacity,StatusBar } from 'react-native';
import { Router, Scene,Actions} from 'react-native-router-flux';

import MapView from 'react-native-maps';

let id = 0;
let vertex=0;

export default class TravelPath extends Component {

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
        vertices: [],
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {

        this.setState( { region : {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.123,
        },
        vertices: [
          ...this.state.vertices,
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
        ]
        });

        console.log(this.state.region);
      }
    )
  }
  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,

        },
      ],
      vertices: [
        ...this.state.vertices,
        {
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude,
        }
      ]
    });
  }
  render() {

    return (
        <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.header_text}>Ture Trip</Text>
        </View>
        <MapView style={styles.map}
          showsUserLocation={true}
          initialRegion={this.state.region}
          onPress={(e) => this.onMapPress(e)}
          >

          {this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.key}
              coordinate={marker.coordinate}
            /> ))}
          <MapView.Polyline
            strokeColor= '#2980b9'
            strokeWidth={2}
            coordinates={this.state.vertices}
          />
        </MapView>
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
module.export=TravelPath
