import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Constants } from "expo";

export default class MyLocation extends React.Component {
  render() {
    return (
      <View style={styles.container}>
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
  }
});
