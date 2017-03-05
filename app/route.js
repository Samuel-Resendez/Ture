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
        return fetch("http://ture.azurewebsites.net/photoNearby", {
          method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'lat' : position.coords.latitude,
          'lng' : position.coords.longitude,
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        for(var i = 0 ; i < responseJson.length; i++) {
          this.onMapPress(responseJson[i]);
        }
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
          coordinate: {
            latitude: e.lat,
            longitude: e.lng,
          },
          key: e.id,
          caption: e.caption,


        },
      ],
      vertices: [
        ...this.state.vertices,
        {
          latitude: e.lat,
          longitude: e.lng,
        }
      ]
    });
    if(e.happiness < 0.4) {
      this.setState({
        color: "#F44336"
      })
    }
    else if(e.happiness > 0.4 && e.happiness < 0.6) {
      this.setState({
        color: "#FFEB3B",
      })
    }
    else {
      this.setState({
      color: "#00E5FF",
    })
    }
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

          >

          {this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.key}
              coordinate={marker.coordinate}
              title={"Waypoint: " + marker.key}
              description={marker.caption}
              pinColor={this.state.color}
            /> ))}
          <MapView.Polyline
            strokeColor= '#2980b9'
            geodesic={true}
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
