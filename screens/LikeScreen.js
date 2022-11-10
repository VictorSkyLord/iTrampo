import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import trampoCard from "./trampoCard";
import firebase from "firebase";
import * as Font from "expo-font";
import { FlatList } from "react-native-gesture-handler";
import { Value } from "react-native-reanimated";



//let stories = require("./temp.json");

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
      stories:[]
    };
    };
  



  componentDidMount() {
   // this._loadFontsAsync();
    this.fetchTheme()
   // this.fetchStories()
  }

  fetchStories = () =>{
    firebase.database().ref('/trampo/').on("value", data=>{
      let stories = [];
      if (data.val()) {
        Object.keys(data.val()).forEach(function(key) {
          stories.push({
            key: key,
            value: data.val()[key]
          })
        });
      }
      this.setState({stories: stories})
    })
  }

  fetchTheme= ( ) => {
    var theme
    firebase.database().ref("/").on("value", data=>{
      theme=data.val().current_theme
      this.setState({light_theme: theme === "light"})
    })

  };

  renderItem = ({ item: trampo }) => {
    return <trampoCard trampo={trampo} navigation={this.props.navigation} />;
  };

  keyExtractor = (item, index) => index.toString();

  render() {
      return (
        <View style={this.state.light_theme ? styles.containerLight : styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={this.state.light_theme ? styles.appTitleTextLight : styles.appTitleText}>Dá Like</Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.stories}
              renderItem={this.renderItem}
            />
          </View>
        </View>
      );
    }
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c"
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "500%",
    height: "500%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
  },
  cardContainer: {
    flex: 0.85
  }
});