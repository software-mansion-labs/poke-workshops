import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList
} from "react-native";
import { Constants } from "expo";
import { Button } from "react-native-paper";

class ListButton extends React.PureComponent {
  onPress = () => {
    this.props.navigation.navigate("Pokemon", {
      url: this.props.url
    });
  };

  render() {
    return (
      <Button color="red" onPress={this.onPress}>
        {this.props.text}
      </Button>
    );
  }
}

const LIMIT = 20;

export default class PokemonList extends React.Component {
  state = {
    loading: true,
    error: false,
    pokemons: [],
    offset: 0,
    loadingMore: false,
    hasMoreToLoad: true
  };

  fetchPokemons = async (offset = 0) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${LIMIT}`
      );
      const json = await response.json();
      const { results } = json;
      this.setState({
        loading: false,
        pokemons: [...this.state.pokemons, ...results],
        offset: offset + LIMIT,
        loadingMore: false,
        hasMoreToLoad: results.length > 0
      });
    } catch (err) {
      this.setState({ loading: false, error: true, loadingMore: false });
    }
  };

  loadMore = () => {
    const { loadingMore, hasMoreToLoad, offset } = this.state;
    if (!loadingMore && hasMoreToLoad) {
      this.setState({ loadingMore: true });
      this.fetchPokemons(offset);
    }
  };

  componentDidMount() {
    this.fetchPokemons();
  }

  renderPokemon = ({ item }) => {
    return (
      <ListButton
        text={item.name}
        url={item.url}
        navigation={this.props.navigation}
      />
    );
  };

  keyExtractor = item => item.name;

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
      <FlatList
        style={styles.listContainer}
        keyExtractor={this.keyExtractor}
        data={this.state.pokemons}
        renderItem={this.renderPokemon}
        onEndReached={this.loadMore}
      />
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
    textAlign: "center",
    margin: 5
  },
  listContainer: {
    backgroundColor: "white"
  }
});
