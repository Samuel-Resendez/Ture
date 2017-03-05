import React, { Component, } from 'react';
import { View, Text, StyleSheet,Image,TextInput ,TouchableOpacity,StatusBar,ListView } from 'react-native';
import { Router, Scene,Actions} from 'react-native-router-flux';




let id=0

export default class Itinerary extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ]),
      node_storage: [],
    };
    navigator.geolocation.getCurrentPosition(
      (position) => {
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

        for(var i = responseJson.length-1; i > 0; i--) {
          this.onDownLoad(responseJson[i]);
        }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.state.node_storage),
        })


      });
    });
  }

  onDownLoad(e) {
    console.log(e);
    this.setState({
      node_storage: [
        ...this.state.node_storage,
        {
          key: e.id,
          coordinate: {
            latitude: e.lat,
            longitude: e.lng,
          },
          caption: e.caption,
          url: e.url,
        },
      ],
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.ture_text, styles.ture_header, styles.white]}> Ture Itinerary </Text>
          <TouchableOpacity
            onPress={Actions.Route}
            >
            <Image source={require('../assets/icon.png')} style={styles.map_icon} />
          </TouchableOpacity>

        </View>
        <ListView
          dataSource={this.state.dataSource}
          style={styles.list_view}

          renderRow={(rowData) =>

            <View style={styles.cell_container}>
            <TouchableOpacity style={styles.cell_container}
              onPress={() => Actions.Description({index: rowData.key,
              caption: rowData.caption,
              url: rowData.url,
              })}
              >
            <Image source={{uri: rowData.url }} style={styles.thumbnail} />
            <View style={styles.cell_description}>
              <Text style={[styles.ture_text, styles.bold]}> Waypoint: {rowData.key}</Text>
              <Text style={[styles.ture_text, styles.sub_text]}> Microsoft's Response: {rowData.caption} </Text>
            </View>

          </TouchableOpacity>
          </View> } />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container :{
    flex: 1,
    backgroundColor: "#FFFFFF",

  },
  header: {
    height: 60,
    backgroundColor: "#2980b9",
    flexDirection: 'row',
    justifyContent: 'center',



  },
  map_icon: {
    marginTop: 15,
    marginRight: 15,

    width: 30,
    height: 30,
    tintColor: "#FFFFFF",

  },
  ture_text: {
    marginRight: 10,
    fontSize: 20,
    fontFamily: 'sans-serif-thin',
    color: "#000000",
  },
  ture_header: {
    marginTop: 10,
    fontSize: 30,
    textAlign: 'center',

    flex: 1,
  },

  list_view: {
    flex: 20,
  },
  thumbnail : {
    borderRadius: 5,
    height: 80,
    width: 80,
  },
  cell_container: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: "#FFFFFF",
  },
  cell_description: {
    marginLeft: 10,
    flexDirection: 'column',
  },
  sub_text: {
    width: 300,
    fontSize: 15,
  },
  bold: {
    fontWeight: 'bold',
  },
  white: {
    color: "#FFFFFF",
  }

})
