import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logout, updateProfile } from "../redux/action";
import mime from "mime";
import Loader from "../components/Loader";

let Profile = ({ navigation, route }) => {
  let { user, loading } = useSelector((state) => state.auth);

  let [name, setName] = useState(user.name);

  let [avatar, setAvatar] = useState(user.avatar.url);

  let dispatch = useDispatch();

  let submitHandler = async () => {
    let myForm = new FormData();
    myForm.append("name", name);
    myForm.append("avatar", {
      uri: avatar,
      type: mime.getType(avatar),
      name: avatar.split("/").pop(),
    });
    await dispatch(updateProfile(myForm));
    dispatch(loadUser());
  };

  let handleImage = () => {
    navigation.navigate("camera", { updateProfile: true });
  };

  let logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (route.params) {
      if (route.params.image) {
        setAvatar(route.params.image);
      }
    }
  }, [route]);

  return loading ? (
    <Loader />
  ) : (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Avatar.Image
        size={100}
        source={{ uri: avatar ? avatar : null }}
        style={{ backgroundColor: "#900" }}
      />
      <TouchableOpacity onPress={handleImage}>
        <Text style={{ color: "#900", margin: 20 }}>Change Photo</Text>
      </TouchableOpacity>

      <View style={{ width: "70%" }}>
        <TextInput
          style={Styles.Input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <Button style={Styles.btn} onPress={submitHandler}>
        {" "}
        <Text style={{ color: "#fff" }}>Update</Text>
      </Button>
      <Button
        color="rgb(50,50,50)"
        onPress={() => navigation.navigate("chnagepassword")}
      >
        Change Password
      </Button>

      <Button color="rgb(50,50,50)" onPress={logoutHandler}>
        Logout
      </Button>
      {user.verified ? null : (
        <Button onPress={() => navigation.navigate("verify")}>Verify</Button>
      )}
    </View>
  );
};

export default Profile;

let Styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    padding: 10,
    paddingLeft: 15,
    borderRadius: 5,
    marginVertical: 15,
    fontSize: 15,
  },
  btn: {
    backgroundColor: "#900",
    padding: 5,
    width: "70%",
  },
});
