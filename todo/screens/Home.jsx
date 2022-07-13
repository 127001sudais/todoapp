import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Task from "../components/Task";
import Icon from "react-native-vector-icons/Entypo";
import { Dialog, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { addTask, loadUser } from "../redux/action";

let Home = ({ navigation }) => {
  let { user } = useSelector((state) => state.auth);

  let dispatch = useDispatch();

  let { loading, message, err } = useSelector((state) => state.message);

  let [openDialog, setOpenDialog] = useState(false);
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");

  let hideDialog = () => {
    setOpenDialog(!openDialog);
  };

  let addTaskHandler = async () => {
    await dispatch(addTask(title, description));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (err) {
      alert(err);
      dispatch({ type: "clearError" });
    }
    if (message) {
      alert(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, err, message, dispatch]);

  return (
    <>
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <ScrollView>
          <SafeAreaView>
            <Text style={Styles.heading}>All Tasks</Text>
            {user &&
              user.task.map((item) => (
                <Task
                  key={item._id}
                  title={item.title}
                  description={item.description}
                  status={item.completed}
                  taskId={item._id}
                />
              ))}

            <TouchableOpacity style={styles.addBtn} onPress={hideDialog}>
              <Icon name="add-to-list" size={20} color="#900" />
            </TouchableOpacity>
          </SafeAreaView>
        </ScrollView>
      </View>

      <Dialog visible={openDialog} onDismiss={hideDialog}>
        <Dialog.Title>Add a task</Dialog.Title>
        <Dialog.Content>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value="title"
            onChangeText={setTitle}
          />
        </Dialog.Content>
      </Dialog>
    </>
  );
};
