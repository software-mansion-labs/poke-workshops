import * as React from "react";
import { View, StyleSheet, Text, Button, Platform } from "react-native";
import { Constants, Permissions, MapView, Location } from "expo";
import { Ionicons } from "@expo/vector-icons";

export default class MyLocation extends React.Component {
  state = {
    permissionGranted: null,
    initialRegion: {
      latitude: 50.06794023344194,
      longitude: 19.91275659232019,
      latitudeDelta: 0.0622,
      longitudeDelta: 0.0321
    },
    location: null,
    buses: [],
  };

  componentDidMount() {
    this.askForPermission();
    this.getLocation();
    this.fetchMPKData();
  }

  askForPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    this.setState({ permissionGranted: status === 'granted' });
  }

  getLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  }

  fetchMPKData = async () => {
    const response = await fetch(
      "http://91.223.13.70/internetservice/geoserviceDispatcher/services/vehicleinfo/vehicles",
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "positionType=CORRECTED",
        method: "POST"
      }
    );
    const { vehicles } = await response.json();
    const buses = vehicles
      .filter(({ name }) => name && (name.startsWith("704") || name.startsWith("713")))
      .map(({ name, longitude, latitude, id }) => ({
        id: `bus_${id}`,
        name,
        coordinate: {
          longitude: longitude / 3600000,
          latitude: latitude / 3600000
        }
      }))
    this.setState({ buses });
    setTimeout(this.fetchMPKData, 5000);
  }

  render() {
    const { permissionGranted, location, buses } = this.state;

    if (permissionGranted === null) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Asking for permission ...</Text>
        </View>
      );
    }

    if (permissionGranted === false) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Permission not granted!</Text>
          <Button color="red" onPress={this.askForPermission}>
            Ask again
          </Button>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.initialRegion}
        >
          {location && (
            <MapView.Marker
              title="My Location"
              coordinate={location.coords}
            />
          )}
          {buses.map(({ name, coordinate, id }) =>  (
            <MapView.Marker
              key={id}
              title={name}
              coordinate={coordinate}
            >
              <Ionicons
                color="red"
                size={20}
                name={Platform.OS === "ios" ? "ios-car" : "md-car"}
              />
            </MapView.Marker>
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
