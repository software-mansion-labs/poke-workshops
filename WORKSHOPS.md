# Expo Basics Workshops

1. Go to https://snack.expo.io. We encourage you to create an account for easier access to your Expo apps!

2. Play a bit with your new web IDE. We will use it to create our first app – `PokeApp`. You don't need to install anything on your computer, but please install `Expo` app on your mobile phone – it's in the AppStore/Google Play.

3. The code you see is a simple React Native screen. You can run it on your phone - just login to your account in Expo app (or provide your Device ID in web IDE). On Android you can also scan QR code to get it.

4. Change something in the example screen, for example `backgroundColor` in styles – it will change on your phone in no time!

5. Let's start coding - change your `App.js` into Pokemon screen:

```js
// App.js
import * as React from "react";
import { Text, View, StyleSheet, ActivityIndicator, Image } from "react-native";
import { Constants } from "expo";

export default class App extends React.Component {
  state = {
    loading: true,
    error: false,
    pokemonName: null,
    pokemonImage: null
  };

  fetchPokemonData = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/1/");
      const json = await response.json();
      const { name, sprites } = json;
      let img;
      if (sprites && sprites.front_default) {
        img = sprites.front_default;
      }
      this.setState({
        loading: false,
        pokemonName: name,
        pokemonImage: img
      });
    } catch (err) {
      this.setState({ loading: false, error: true });
    }
  };

  componentDidMount() {
    this.fetchPokemonData();
  }

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
```

6. This app looks kinda static – it's about time to add some navigation. Move the code from `App.js` to a new file `screens/Pokemon.js`, and change `App.js` to:

```js
// App.js
import * as React from "react";
import Pokemon from "./screens/Pokemon";

export default class App extends React.Component {
  render() {
    return <Pokemon />;
  }
}
```

7. Let's create a new screen to which we can navigate – `screens/PokemonDetails.js`. You can testing it out by changing Pokemon to PokemonDetails in App.js – remember to import the screen though.

```js
// screens/PokemonDetails.js
import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Constants } from "expo";

export default class PokemonDetails extends React.Component {
  render() {
    const { details } = this.props;
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
```

8. We have to add navigation to our project and then create our StackNavigator – let's do this in `App.js`:

```js
// package.json
"react-navigation": "2.18.2"
```

```js
// App.js
import * as React from "react";
import Pokemon from "./screens/Pokemon";
import PokemonDetails from "./screens/PokemonDetails";
import { createStackNavigator } from "react-navigation";

const FavPokemonStack = createStackNavigator({
  FavPokemon: {
    screen: Pokemon
  },
  FavPokemonDetails: {
    screen: PokemonDetails
  }
});

export default class App extends React.Component {
  render() {
    return <FavPokemonStack />;
  }
}
```

9. Now we have to navigate from `screens/Pokemon.js` to `screens/PokemonDetails.js`. We will use a nice Button from `react-native-paper` components package, which was already provided in Snack example:

```js
// screens/Pokemon.js
import { Button } from "react-native-paper";

// we have to get PokemonDetails from API response
  fetchPokemonData = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/1/');
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
        pokemonDetails: details,
      });

// render
return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.state.pokemonName}</Text>
        <Image source={{ uri: this.state.pokemonImage }} style={styles.image} />
        <Button onPress={() => {
          // // add button which navigates to the new screen with saved details
          this.props.navigation.navigate('FavPokemonDetails', {
            details: this.state.pokemonDetails,
          })
        }}>
          Show details
        </Button>
      </View>
    );
```

```js
// screens/PokemonDetails.js
  render() {
    // we have to get details from navigation params, not props
    // under the hood it is this.props.navigation.state.params
    const details = this.props.navigation.getParam('details');
```

10. That's all – we can navigate between two screens. Our app does not look like a "real" app though – most of them have tabs, so let's add `TabNavigator`.

```js
// App.js
const AppNavigator = createBottomTabNavigator({
  FavPokemon: FavPokemonStack
});

// we can remove unnecessary App Component
export default AppNavigator;
```

11. One tab looks kinda bad, so let's add another one with and a new screen, which will display a list of Pokemons `screens/PokemonList.js`:

```js
// screens/PokemonList.js
import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Constants } from "expo";

export default class PokemonList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>SUPER POKEMON LIST</Text>
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
```

```js
// App.js
import PokemonList from "./screens/PokemonList";
//...
const AppNavigator = createBottomTabNavigator({
  FavPokemon: FavPokemonStack,
  Pokemons: PokemonList
});
```

12. Expo provides a lot of useful packages for app development. Every tab should have a nice icon, so let's use vector icons package provided by Expo:

```js
// App.js
import { Ionicons } from "@expo/vector-icons";
//...
const AppNavigator = createBottomTabNavigator(
  {
    FavPokemon: FavPokemonStack,
    Pokemons: PokemonList
  },
  {
    navigationOptions: ({ navigation }) => ({
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
```

13. The app looks much better. But `screens/PokemonList.js` doesn't display anything interesting – let's implement it, so it will show a list of Pokemons.

```js
import * as React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Constants } from 'expo';

export default class PokemonList extends React.Component {
  state = {
    loading: true,
    error: false,
    pokemons: [],
  }

  fetchPokemons = async () => {
    try {
      // unfotunately PokeApi has broken query/limit right now, so we cannot explain paging...
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
      const json = await response.json();
      const { results } = json;
      const pokemons = results.slice(0, 20); // makes more sense, but try out all results to see RN performance!
      this.setState({
        loading: false,
        pokemons,
      });
    } catch (err) {
      this.setState({ loading: false, error: true });
    }
  };

  componentDidMount() {
    this.fetchPokemons();
  }

  renderPokemon = ({ item }) => {
    return (
      <Text style={styles.text}>{item.name}</Text>
    );
  }

  keyExtractor = (item, index) => index;

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator color="red"/>
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
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 5,
  },
  listContainer: {
    backgroundColor: 'white',
  }
});
});
```

14. Let's improve our App UI a bit – you might have changed some colors for fun to match your Pokemon, but we will add some stylings to make the app look like a Pokeball.

```js
// App.js
import { Ionicons } from '@expo/vector-icons';

// let's extract some common options for both stacks
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
    navigationOptions: stackNavigationOptions
  }
);

// We have only one screen here, but we want the header and we will add more screens soon
const PokemonListStack = createStackNavigator(
  {
    PokemonList: {
      screen: PokemonList
    }
  },
  {
    initialRouteName: "PokemonList",
    navigationOptions: stackNavigationOptions
  }
);

const AppNavigator = createBottomTabNavigator(
```

```js
// screens/Pokemon.js
// render
// Our Show Details button doesn't match the app colors, let's change it!
        <Button color="red" onPress={() => {
          this.props.navigation.navigate('FavPokemonDetails', {
            details: this.state.pokemonDetails,
          })
        }}>
```

15. We can also make `screens/Pokemon.js` more generic and open Pokemon screen from PokemonList.

```js
// screens/Pokemon.js
// use our favorite Pokemon unless we provided url through navigation parameters
  getNavUrl = () => this.props.navigation.getParam('url');

  fetchPokemonData = async () => {
    try {
      const url = this.getNavUrl() || 'https://pokeapi.co/api/v2/pokemon/1/';
      const response = await fetch(url);

// render - we have to check to which screen we should route
<Button color="red" onPress={() => {
          const route = this.getNavUrl() ? 'PokemonDetails' : 'FavPokemonDetails';
          this.props.navigation.navigate(route, {
            details: this.state.pokemonDetails,
          })
        }}>
```

```js
// App.js
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
    navigationOptions: stackNavigationOptions
  }
);
```

```js
// screens/PokemonList.js
renderPokemon = ({ item }) => {
  return (
    <Button
      color="red"
      onPress={() => {
        this.props.navigation.navigate("Pokemon", {
          url: item.url
        });
      }}
    >
      {item.name}
    </Button>
  );
};
```

16. You can play a bit with the list now. There is one problem with it – we create a new `onPress` arrow function in each `renderPokemon`. It can impact the list performance, so we should get rid of it. Let's extract our `Button` to a separate `PureComponent` and pass url through props.

```js
// screens/PokemonList.js
import { Button } from 'react-native-paper';

class ListButton extends React.PureComponent {
  onPress = () => {
    this.props.navigation.navigate('Pokemon', {
      url: this.props.url,
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

export default class PokemonList extends React.Component {
//...
  renderPokemon = ({ item }) => {
    // we have to manually pass navigation
    return (
      <ListButton text={item.name} url={item.url} navigation={this.props.navigation} />
    );
  };
```

17. That's all! You can share the app with your friends – just ask them to install Expo app and share the link/QR code.

More things to add if you have time:

- adding a button to retry if there was an error during Pokemon fetch
- pull to refresh in the list, paging, header/footer?
- updating favorite Pokemon from the list (React Context?)
- more fun with React Navigation - changing header title etc.
