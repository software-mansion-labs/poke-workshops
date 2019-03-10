import * as React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { Constants, Permissions, MapView, Location } from "expo";

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
  };

  componentDidMount() {
    this.askForPermission();
    this.getLocation();
  }

  askForPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    this.setState({ permissionGranted: status === 'granted' });
  }

  getLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  }

  render() {
    const { permissionGranted, location } = this.state;

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
