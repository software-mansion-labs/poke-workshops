import * as React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { Constants, Permissions, MapView } from "expo";

export default class MyLocation extends React.Component {
  state = {
    permissionGranted: null,
  };

  componentDidMount() {
    this.askForPermission()
  }

  askForPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    this.setState({ permissionGranted: status === 'granted' });
  }

  render() {
    const { permissionGranted } = this.state;

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
        >
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
