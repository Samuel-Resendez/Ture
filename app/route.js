import React, { Component, } from 'react';
import { View, Text, StyleSheet,Image,TextInput ,TouchableOpacity,StatusBar, ScrollView } from 'react-native';
import { Router, Scene,Actions} from 'react-native-router-flux';

import MapView from 'react-native-maps';

let id = 0;
let vertex=0;
let thing = 0;
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

  componentWillMount() {
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
        for(var i = responseJson.length-1 ; i >= 0 ; i--) {
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
          url: e.url,
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

  handleScroll(object) {
    console.log(object);
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
        <ScrollView style={styles.bot_controller}
          horizontal={true}>
          {this.state.markers.map(marker => (
            <View style={styles.nav_element} key={thing++}>
              <View style={styles.horiz_part}>
                <Image source={{uri: marker.url}} style={styles.nav_icon}/>
                <Text style={styles.nav_text}> Waypoint: {marker.key} </Text>
              </View>

            </View>
          ))}

        </ScrollView>
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
  bot_controller: {
    flexDirection: 'row',
    position: 'absolute',

    top: 520,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  nav_icon :{
    borderRadius: 5,
    marginTop: 10,
    marginRight: 10,
    width: 60,
    height: 60,
  },
  horiz_part : {
    opacity: 1,
    width: 350,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  nav_element: {
    flex: 1,
    borderRadius: 10,
    marginTop: 10,
    marginRight: 5,
    marginBottom: 10,
    marginLeft: 5,
    opacity: 1,
    backgroundColor: "#FFFFFF",
  },
  nav_text : {
      marginLeft: 10,
      fontFamily: 'sans-serif-thin',
      color: "#000000",
      fontSize: 30,
  }
})
module.export=TravelPath
