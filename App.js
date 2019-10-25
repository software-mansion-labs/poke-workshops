// App.js
import * as React from "react";
import Pokemon from "./screens/Pokemon";
import PokemonDetails from "./screens/PokemonDetails";
import PokemonList from "./screens/PokemonList";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { Ionicons } from "@expo/vector-icons";

const stackNavigationOptions = {
  title: "Pokedex",
  headerStyle: {
    backgroundColor: "red"
  },
  headerTintColor: "white",
  headerBackTitle: null
};

const FavPokemonStack = createStackNavigator(
  {
    FavPokemon: {
      screen: Pokemon,
      navigationOptions: stackNavigationOptions
    },
    FavPokemonDetails: {
      screen: PokemonDetails,
      navigationOptions: stackNavigationOptions
    }
  },
  {
    initialRouteName: "FavPokemon"
  }
);

// We have only one screen here, but we want the header and we will add more screens soon
const PokemonListStack = createStackNavigator(
  {
    PokemonList: {
      screen: PokemonList,
      navigationOptions: stackNavigationOptions
    },
    Pokemon: {
      screen: Pokemon,
      navigationOptions: stackNavigationOptions
    },
    PokemonDetails: {
      screen: PokemonDetails,
      navigationOptions: stackNavigationOptions
    }
  },
  {
    initialRouteName: "PokemonList"
  }
);

const AppNavigator = createBottomTabNavigator(
  {
    FavPokemon: FavPokemonStack,
    Pokemons: PokemonListStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "FavPokemon") {
          iconName = `ios-heart`;
        } else if (routeName === "Pokemons") {
          iconName = `ios-bug`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      style: {
        backgroundColor: "red"
      },
      activeTintColor: "white",
      inactiveTintColor: "black"
    }
  }
);

export default createAppContainer(AppNavigator);
