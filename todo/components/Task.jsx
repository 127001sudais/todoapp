import { View, Text } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { Checkbox } from "react-native-paper";
import { useDispatch } from "react-redux";
import { deleteTask, loadUser, updateTask } from "../redux/action";

let Task = ({ title, description, status, taskId }) => {
  let dispatch = useDispatch();
  let [completed, setCompleted] = useState(status);

  let handleCheckbox = () => {
    setCompleted(!completed);
    dispatch(updateTask(taskId));
  };

  let deleteHandler = async () => {
    await dispatch(deleteTask(taskId));
    dispatch(loadUser());
  };

  return (
    <View
      style={{
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <View style={{ width: "70%" }}>
        <Text style={{ fontSize: 20, marginVertical: 7, color: "#900" }}>
          {title}
        </Text>
        <Text style={{ color: "#4a4a4a" }}>{description}</Text>
      </View>
      <Checkbox
        status={completed ? "checked" : "unchecked"}
        color="#474747"
        onPress={handleCheckbox}
      />
      <Icon
        name="delete"
        color="#fff"
        size={20}
        style={{
          backgroundColor: "#900",
          padding: 10,
          borderRadius: 100,
        }}
        onPress={deleteHandler}
      />
    </View>
  );
};

export default Task;
