import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import firebase from "firebase";

/*let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};*/

export default class trampoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
      trampo_id: this.props.trampo.key,
      trampo_data: this.props.trampo.value,
      is_liked: false,
      likes: this.props.trampo.value.likes,
    };
  }

 /* async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }*/

  componentDidMount() {
   // this._loadFontsAsync();
    this.fetchUser();
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

  like = () => {
if (this.state.is_liked) {
  firebase.database().ref("trampo").child(this.state.trampo_id).update(
{likes:false}
  )
  this.setState({likes: (this.state.likes -=1), is_liked:false})
} else {
  firebase.database().ref("trampo").child(this.state.trampo_id).update(
    {likes:true}
  )
  this.setState({likes: (this.state.likes +=1), is_liked:true})
}
  }

  render() {
    let trampo = this.state.trampo_data


      let images = {
        image_1: require("../assets/trampo_image_1.png"),
        image_2: require("../assets/trampo_image_2.png"),
        image_3: require("../assets/trampo_image_3.png"),
        image_4: require("../assets/trampo_image_4.png"),
        image_5: require("../assets/trampo_image_5.png")
      }

      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() =>
            this.props.navigation.navigate("Tela de Trampo", {
              trampo: trampo
            })
          }
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <View
            style={
              this.state.light_theme
                ? styles.cardContainerLight
                : styles.cardContainer
            }
          >
            <Image
              source={require("../assets/trampo_image_1.png")}
              style={styles.trampoImage}
            ></Image>
            <View style={styles.titleContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.trampoTitleTextLight
                    : styles.trampoTitleText
                }
              >
                {trampo.title}
              </Text>
              <Text
                style={
                  this.state.light_theme
                    ? styles.trampoAuthorTextLight
                    : styles.trampoAuthorText
                }
              >
                {trampo.author}
              </Text>
              <Text
                style={
                  this.state.light_theme
                    ? styles.descriptionTextLight
                    : styles.descriptionText
                }
              >
                {trampo.description}
              </Text>
            </View>

            <View style={styles.actionContainer}>
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
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  cardContainerLight: {
    margin: RFValue(13),

    backgroundColor: "white",
    borderRadius: RFValue(20),
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: RFValue(0.5),
    shadowRadius: RFValue(5),
    elevation: RFValue(2)
  },
  trampoImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250)
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center"
  },
  titleTextContainer: {
    flex: 0.8
  },
  iconContainer: {
    flex: 0.2
  },
  trampoTitleText: {

    fontSize: RFValue(25),
    color: "white"
  },
  trampoTitleTextLight: {

    fontSize: RFValue(25),
    color: "black"
  },
  trampoAuthorText: {

    fontSize: RFValue(18),
    color: "white"
  },
  trampoAuthorTextLight: {

    fontSize: RFValue(18),
    color: "black"
  },
  descriptionContainer: {
    marginTop: RFValue(5)
  },
  descriptionText: {

    fontSize: RFValue(13),
    color: "white"
  },
  descriptionTextLight: {

    fontSize: RFValue(13),
    color: "black"
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10)
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",

    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  },
  likeTextLight: {

    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  }
});