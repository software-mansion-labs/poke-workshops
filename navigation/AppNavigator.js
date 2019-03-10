import * as React from "react";
import { Platform } from "react-native";
import Pokemon from "../screens/Pokemon";
import PokemonDetails from "../screens/PokemonDetails";
import PokemonList from "../screens/PokemonList";
import MyLocation from "../screens/MyLocation";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
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
      screen: Pokemon
    },
    FavPokemonDetails: {
      screen: PokemonDetails
    }
  },
  {
    initialRouteName: "FavPokemon",
    defaultNavigationOptions: stackNavigationOptions,
    navigationOptions: {
      tabBarLabel: "FavPokemon",
      tabBarIcon: ({ focused, tintColor }) => (
        <Ionicons
          focused={focused}
          color={tintColor}
          size={24}
          name={Platform.OS === "ios" ? "ios-heart" : "md-heart"}
        />
      )
    }
  }
);

const PokemonListStack = createStackNavigator(
  {
    PokemonList: {
      screen: PokemonList
    },
    Pokemon: {
      screen: Pokemon
    },
    PokemonDetails: {
      screen: PokemonDetails
    }
  },
  {
    initialRouteName: "PokemonList",
    defaultNavigationOptions: stackNavigationOptions,
    navigationOptions: {
      tabBarLabel: "Pokemons",
      tabBarIcon: ({ focused, tintColor }) => (
        <Ionicons
          focused={focused}
          color={tintColor}
          size={24}
          name={Platform.OS === "ios" ? "ios-bug" : "md-bug"}
        />
      )
    }
  }
);

const LocationStack = createStackNavigator(
  {
    MyLocation: {
      screen: MyLocation
    }
  },
  {
    initialRouteKey: "MyLocation",
    defaultNavigationOptions: stackNavigationOptions,
    navigationOptions: {
      tabBarLabel: "Location",
      tabBarIcon: ({ focused, tintColor }) => (
        <Ionicons
          focused={focused}
          color={tintColor}
          size={24}
          name={Platform.OS === "ios" ? "ios-locate" : "md-locate"}
        />
      )
    }
  }
)

const AppNavigator = createBottomTabNavigator(
  {
    FavPokemon: FavPokemonStack,
    Pokemons: PokemonListStack,
    Location: LocationStack
  },
  {
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
