import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Pressable } from "react-native";
import {
  Button,
  List,
  Modal,
  Portal,
  TextInput,
  Text,
} from "react-native-paper";
import { FontAwesome6 } from "@expo/vector-icons";

const TaskListScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [visible, setVisible] = useState(false);
  const [newTask, setNewTask] = useState("");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  async function addTask() {
    const requestBody = {
      user_id: 1,
      task: newTask,
    };
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask("");
      hideModal();
    }

    //Update the server
    // const apiUrlPut = "http://35.195.190.151:80/task";
    // const requestBody = {}
    // const response = await fetch(apiUrlPut, {
    //   method: "POST",
    //   headers: {
    //     "content-type": "applicatin/json",
    //   },
    //   body: JSON.stringify(requestBody),
    // });

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name: newTask,
      time: new Date(),
      completion_date: null,
      patient_id: 1,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://35.195.190.151:80/task", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }
  useEffect(() => {
    //Fetch from server
    const apiUrl = "https://api.example.com/data";

    // const fetchData = async () => {
    //   try {
    //     const response = await fetch(apiUrl);
    //     const result = await response.json();
    //     setData(result);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchData();
    setTasks(["Read Book", "Meetup with Jack", "Lunch"]);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <List.Item title={item} right={() => <List.Icon icon="delete" />} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button
        mode="contained"
        onPress={showModal}
        compact={true}
        style={{ width: 100, margin: "auto" }}
      >
        Add Task
      </Button>
      {/* <Pressable
        style={{
          alignItems: "center",
          // justifyContent: "center",
          margin: "auto",
          paddingVertical: 12,
          // paddingHorizontal: 32,
          borderRadius: 4,
          elevation: 3,
          backgroundColor: "gray",
          width: 80,
        }}
        onPress={showModal}
      >
        <Text>Add Task</Text>
      </Pressable> */}

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}
        >
          <Text style={styles.modalTitle}>Add New Task</Text>
          <TextInput
            label="Task"
            value={newTask}
            onChangeText={setNewTask}
            style={styles.input}
          />
          <Button mode="contained" onPress={addTask} style={styles.button}>
            Add Task
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: "auto",
    height: "auto",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    margin: "auto",
    width: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default TaskListScreen;
