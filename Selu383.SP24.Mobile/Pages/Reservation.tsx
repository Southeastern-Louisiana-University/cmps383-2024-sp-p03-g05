import React, { useState } from "react";
import { Button, View, Text, StyleSheet, SafeAreaView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Reservation({ route }) {
  const navigation = useNavigation(); // Get access to navigation object
  const [isStartPickerVisible, setStartPickerVisibility] = useState(false);
  const [isEndPickerVisible, setEndPickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const showStartPicker = () => {
    setStartPickerVisibility(true);
  };

  const showEndPicker = () => {
    setEndPickerVisibility(true);
  };

  const hidePicker = () => {
    setStartPickerVisibility(false);
    setEndPickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setStartDate(date); // Update start date when confirming
    hidePicker();
  };
  const handleConfirmend = (date) => {
    setEndDate(date);
    hidePicker();
  };

  const { hname, haddress } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>{hname}</Text>
          <Text style={styles.title}>{haddress}</Text>
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.dateTimeContainer}>
            <Text>Start:</Text>
            <Button title="Select Start Date" onPress={showStartPicker} />
            <DateTimePickerModal
              isVisible={isStartPickerVisible}
              mode="datetime"
              onConfirm={handleConfirm}
              onCancel={hidePicker}
            />
            <Text>{startDate ? startDate.toString() : "No date selected"}</Text>
          </View>
          <View style={styles.dateTimeContainer}>
            <Text>End:</Text>
            <Button title="Select End Date" onPress={showEndPicker} />
            <DateTimePickerModal
              isVisible={isEndPickerVisible}
              mode="datetime"
              onConfirm={handleConfirmend}
              onCancel={hidePicker}
            />
            <Text>{endDate ? endDate.toString() : "No date selected"}</Text>
          </View>
        </View>
        <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#65a30d",
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dateTimeContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
  },
});
