import * as React from "react";
import Pokemon from "./screens/Pokemon";
import PokemonDetails from "./screens/PokemonDetails";
import PokemonList from "./screens/PokemonList";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from "@expo/vector-icons";

// let's extract some common options for both stacks
const stackNavigationOptions = {
  title: "Pokedex",
  headerStyle: {
    backgroundColor: "red",
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
    headerLayoutPreset: 'center',
    initialRouteName: "FavPokemon"
  }
);

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
    headerLayoutPreset: 'center',
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

// we can remove unnecessary App Component
export default createAppContainer(AppNavigator);