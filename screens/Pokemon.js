import * as React from "react";
import { Text, View, StyleSheet, ActivityIndicator, Image } from "react-native";
import { Constants } from "expo";
import { Button } from "react-native-paper";

export default class Pokemon extends React.Component {
  state = {
    loading: true,
    error: false,
    pokemonName: null,
    pokemonImage: null,
    pokemonDetails: null
  };

  getPokemonUrl = () => this.props.navigation.getParam("url");

  fetchPokemonData = async () => {
    try {
      // you can hardcode your favourite Pokemon here :)
      const url =
        this.getPokemonUrl() || "https://pokeapi.co/api/v2/pokemon/1/";
      const response = await fetch(url);
      const json = await response.json();
      const { name, sprites, types } = json;
      let img;
      if (sprites && sprites.front_default) {
        img = sprites.front_default;
      }
      const details = types.map(t => t.type.name);
      this.setState({
        loading: false,
        pokemonName: name,
        pokemonImage: img,
        pokemonDetails: details
      });
    } catch (err) {
      this.setState({ loading: false, error: true });
    }
  };

  componentDidMount() {
    this.fetchPokemonData();
  }

  showDetails = () => {
    // in case of FavPokemon we don't have the url, it's hardcoded
    const route = this.getPokemonUrl() ? "PokemonDetails" : "FavPokemonDetails";
    this.props.navigation.navigate(route, {
      details: this.state.pokemonDetails
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator color="red" />
        </View>
      );
    }

    if (this.state.error) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Error</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.state.pokemonName}</Text>
        <Image source={{ uri: this.state.pokemonImage }} style={styles.image} />
        <Button color="red" onPress={this.showDetails}>
          Show details
        </Button>
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
  },
  image: {
    height: 200,
    width: 200
  }
});
