import React, { useState, useEffect } from "react";
import { forgetPassword } from "../redux/action";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";

let CameraComponent = ({ navigation, route }) => {
  let [hasPermission, setHasPermission] = useState(null);
  let [type, setType] = useState(CameraType.back);
  let [camera, setCamera] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Camera.requestCameraPermissionAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionAsync();

    if (permissionResult.granted === false) {
      alert("permission to access camera roll is required");
      return;
    }

    let data = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (route.params.upateProfile)
      return navigation.navigate("profile", { image: data.uri });
    else return navigation.navigate("register", { image: data.uri });
  };

  let clickPicture = async () => {
    let data = await camera.takePictureAsync();

    if (route.params.updateProfile)
      return navigation.navigate("profile", { image: data.uri });
    else return navigation.navigate("register", { image: data.uri });
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera
        type={type}
        style={{ flex: 1, aspectRatio: 1 }}
        ratio="1:1"
        ref={(e) => setCamera(e)}
      />
    </View>
  );
};
