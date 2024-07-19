import React, { useState } from "react";
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

const ReminderListScreen = () => {
  const [reminders, setReminders] = useState([]);
  const [visibleR, setVisibleR] = useState(false);
  const [newReminder, setNewReminder] = useState("");

  const showModal = () => setVisibleR(true);
  const hideModal = () => setVisibleR(false);

  const addReminder = () => {
    if (newReminder.trim()) {
      setReminders([...reminders, newReminder]);
      setNewReminder("");
      hideModal();
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={reminders}
        renderItem={({ item }) => (
          <List.Item title={item} right={() => <List.Icon icon="delete" />} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button
        mode="contained"
        onPress={showModal}
        compact={true}
        style={{
          width: 125,
          margin: "auto",
        }}
      >
        Add Reminder
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
          visible={visibleR}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}
        >
          <Text style={styles.modalTitle}>Add New Reminder</Text>
          <TextInput
            label="Task"
            value={newReminder}
            onChangeText={setNewReminder}
            style={styles.input}
          />
          <Button mode="contained" onPress={addReminder} style={styles.button}>
            Add Reminder
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

export default ReminderListScreen;
