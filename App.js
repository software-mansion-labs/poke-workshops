import * as React from 'react';
import Pokemon from './screens/Pokemon';
import PokemonDetails from './screens/PokemonDetails';
import PokemonList from './screens/PokemonList';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

const stackNavigationOptions = {
  title: 'Pokedex',
  headerStyle: {
    backgroundColor: 'red',
  },
  headerTintColor: 'white',
  headerBackTitle: null,
};

const FavPokemonStack = createStackNavigator(
  {
    FavPokemon: {
      screen: Pokemon,
    },
    FavPokemonDetails: {
      screen: PokemonDetails,
    },
  },
  {
    initialRouteName: 'FavPokemon',
    navigationOptions: stackNavigationOptions,
  }
);

const PokemonListStack = createStackNavigator(
  {
    PokemonList: {
      screen: PokemonList,
    },
    Pokemon: {
      screen: Pokemon,
    },
    PokemonDetails: {
      screen: PokemonDetails,
    },
  },
  {
    initialRouteName: 'PokemonList',
    navigationOptions: stackNavigationOptions,
  }
);

const AppNavigator = createBottomTabNavigator(
  {
    FavPokemon: FavPokemonStack,
    Pokemons: PokemonListStack,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'FavPokemon') {
          iconName = `ios-heart`;
        } else if (routeName === 'Pokemons') {
          iconName = `ios-bug`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'black',
      activeBackgroundColor: 'red',
      inactiveBackgroundColor: 'red',
    },
  }
);

export default AppNavigator;
