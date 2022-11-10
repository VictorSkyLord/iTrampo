import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Speech from "expo-speech";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import firebase from "firebase";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class trampoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      speakerColor: "gray",
      speakerIcon: "volume-high-outline",
      light_theme: true,
      likes: this.props.route.params.trampo.likes,
      is_liked: false,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
  //  this._loadFontsAsync();
  //  this.fetchUser();
  }

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/")
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };

  async initiateTTS(title, author, trampo, moral) {
    const current_color = this.state.speakerColor;
    this.setState({
      speakerColor: current_color === "gray" ? "#ee8249" : "gray"
    });
    if (current_color === "gray") {
      Speech.speak(`${title} by ${author}`);
      Speech.speak(trampo);
      Speech.speak("A moral da história é!");
      Speech.speak(moral);
    } else {
      Speech.stop();
    }
  }

  like = () => {
    if (this.state.is_liked) {
      firebase.database().ref("trampo").child(this.props.route.params.key).child('likes').set(
        firebase.database.ServerValue.increment(-1)
      )
      this.setState({likes: (this.state.likes -=1), is_liked:false})
    } else {
      firebase.database().ref("trampo").child(this.props.route.params.key).child('likes').set(
        firebase.database.ServerValue.increment(1)
      )
      this.setState({likes: (this.state.likes +=1), is_liked:true})
    }
      }

  render() {
    if (!this.props.route.params) {
      this.props.navigation.navigate("Home");
    } else if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View
          style={
            this.state.light_theme ? styles.containerLight : styles.container
          }
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.appTitleTextLight
                    : styles.appTitleText
                }
              >
                App Narração de Histórias
              </Text>
            </View>
          </View>
          <View style={styles.trampoContainer}>
            <ScrollView
              style={
                this.state.light_theme
                  ? styles.trampoCardLight
                  : styles.trampoCard
              }
            >
              <Image
                source={require("../assets/trampo_image_1.png")}
                style={styles.image}
              ></Image>
              <View style={styles.dataContainer}>
                <View style={styles.titleTextContainer}>
                  <Text
                    style={
                      this.state.light_theme
                        ? styles.trampoTitleTextLight
                        : styles.trampoTitleText
                    }
                  >
                    {this.props.route.params.trampo.title}
                  </Text>
                  <Text
                    style={
                      this.state.light_theme
                        ? styles.trampoAuthorTextLight
                        : styles.trampoAuthorText
                    }
                  >
                    {this.props.route.params.trampo.author}
                  </Text>
                  <Text
                    style={
                      this.state.light_theme
                        ? styles.trampoAuthorTextLight
                        : styles.trampoAuthorText
                    }
                  >
                    {this.props.route.params.trampo.created_on}
                  </Text>
                </View>
                <View style={styles.iconContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      this.initiateTTS(
                        this.props.route.params.trampo.title,
                        this.props.route.params.trampo.author,
                        this.props.route.params.trampo.trampo,
                        this.props.route.params.trampo.moral
                      )
                    }
                  >
                    <Ionicons
                      name={this.state.speakerIcon}
                      size={RFValue(30)}
                      color={this.state.speakerColor}
                      style={{ margin: RFValue(15) }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.trampoTextContainer}>
                <Text
                  style={
                    this.state.light_theme
                      ? styles.trampoTextLight
                      : styles.trampoText
                  }
                >
                  {this.props.route.params.trampo.trampo}
                </Text>
                <Text
                  style={
                    this.state.light_theme
                      ? styles.moralTextLight
                      : styles.moralText
                  }
                >
                  Moral da História - {this.props.route.params.trampo.moral}
                </Text>
              </View>

             {/* <View style={styles.actionContainer}>
              <TouchableOpacity style={styles.likeButton} onPress={()=> this.like()}>
                <Ionicons
                  name={"heart"}
                  size={RFValue(30)}
                  color={this.state.light_theme ? "black" : "white"}
                />
                <Text
                  style={
                    this.state.light_theme
                      ? styles.likeTextLight
                      : styles.likeText
                  }
                > 
                  {this.state.likes} likes
                </Text>
              </TouchableOpacity>
            </View>*/}
            </ScrollView>
          </View>
        </View>
      );
    }
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
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  trampoContainer: {
    flex: 1
  },
  trampoCard: {
    margin: RFValue(20),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  trampoCardLight: {
    margin: RFValue(20),
    backgroundColor: "white",
    borderRadius: RFValue(20),
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2
  },
  image: {
    width: "100%",
    alignSelf: "center",
    height: RFValue(200),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    resizeMode: "contain"
  },
  dataContainer: {
    flexDirection: "row",
    padding: RFValue(20)
  },
  titleTextContainer: {
    flex: 0.8
  },
  trampoTitleText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "white"
  },
  trampoTitleTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "black"
  },
  trampoAuthorText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "white"
  },
  trampoAuthorTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "black"
  },
  iconContainer: {
    flex: 0.2
  },
  trampoTextContainer: {
    padding: RFValue(20)
  },
  trampoText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(15),
    color: "white"
  },
  trampoTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(15),
    color: "black"
  },
  moralText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(20),
    color: "white"
  },
  moralTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(20),
    color: "black"
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: RFValue(10)
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    flexDirection: "row",
    backgroundColor: "#eb3948",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  },
  likeTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  }
});