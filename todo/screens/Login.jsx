import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

let Login = ({ navigation }) => {
  let { err } = useSelector((state) => state.auth);

  let dispatch = useDispatch();

  let [email, setEmail] = useState("");

  let [password, setPassword] = useState("");

  let LoginHandler = () => {
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (err) {
      alert(err);
      dispatch({ type: "clearError" });
    }
  }, [err, dispatch, alert]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 20, margin: 20 }}>WELCOME</Text>
      <View style={{ width: "70%" }}>
        <TextInput
          style={Styles.Input}
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
        disabled={!email || !password}
        style={Styles.btn}
        onPress={LoginHandler}
      >
        <Text style={{ color: "#fff" }}>Login</Text>
      </Button>

      <Text style={{ marginTop: 20 }}>Or</Text>
      <TouchableOpacity onPress={() => navigation.navigate("register")}>
        <Text style={{ color: "#900", height: 30, margin: 20 }}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("forgetpassword")}>
        <Text>Forget Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

let Styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    padding: 10,
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
