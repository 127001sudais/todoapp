import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { register } from "../redux/action";
import mime from "mime";

let Register = ({ navigation, route }) => {
  let [avatar, setAvatar] = useState("");
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let dispatch = useDispatch();

  let handleImage = () => {
    navigation.navigate("camera", { updateProfile: false });
  };

  let registerHandler = () => {
    let myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("avatar", {
      uri: avatar,
      type: mime.getType(avatar),
      name: avatar.split("/").pop(),
    });
    dispatch(register(myForm));
  };

  useEffect(() => {
    if (route.params) {
      if (route.params.image) {
        setAvatar(route.params.image);
      }
    }
  }, [route]);

  return (
    <view
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
        <Text style={{ color: "#900" }}>Change Photo</Text>
      </TouchableOpacity>

      <View style={{ width: "70%" }}>
        <TextInput
          style={Styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={Styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          secureTextEntry
          style={Styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <Button
        disabled={!email || !password || !name}
        style={Styles.btn}
        onPress={registerHandler}
      >
        <Text style={{ color: "#fff" }}>Register</Text>
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate("login")}>
        <Text style={{ color: "#900", height: 30, margin: 20 }}>LOGIN</Text>
      </TouchableOpacity>
    </view>
  );
};

export default Register;

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
