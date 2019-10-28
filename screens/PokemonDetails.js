import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import "regenerator-runtime";

export default class PokemonDetails extends React.Component {
    render() {
    // we have to get details from navigation params, not props
    // under the hood it is this.props.navigation.state.params
    const details = this.props.navigation.getParam('details');
    if (!details) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>No details</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {details.map(detail => (
          <Text style={styles.text}>{detail}</Text>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center"
  }
});