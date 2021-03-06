import React, { Component } from 'react';
import { Text } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';


import Ture_Login from './login.js';
import Map_Scene from './map.js';
import WaypointPhoto from './photo.js';
import Itinerary from './itinerary.js';
import WayPointDescription from './description.js';
import TravelPath from './route.js';
import Registration from './register.js';

export default class Ture extends Component {
  render() {
    return(
      <Router>
        <Scene key="root">
          <Scene key="login" component={Ture_Login} title="Login" initial={true} hideNavBar={true}/>
          <Scene key="register" component={Registration} title="register" hideNavBar={true}/>
          <Scene key="MapScene" component={Map_Scene} title="MapScene" hideNavBar={true}/>
          <Scene key="PhotoScene" component={WaypointPhoto} title="Photos" hideNavBar={true}/>
          <Scene key="Itinerary" component={Itinerary} title="Itinerary" hideNavBar={true}/>
          <Scene key="Description" component={WayPointDescription} title="Description" hideNavBar={true}/>
          <Scene key="Route" component={TravelPath} title="Router" hideNavBar={true}/>
        </Scene>
      </Router>
    )
  }
}
