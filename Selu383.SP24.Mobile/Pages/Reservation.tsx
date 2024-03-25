import React, { useState } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRoute } from "@react-navigation/native"

export default function Reservation({ route }){
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };





 
  

    






  return (
    <View>
      <Text style={{ fontSize: 20,
    fontWeight: 'bold',
    marginTop: 200,}}>{route.params.hname}</Text>
    <Text>Start:</Text>
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Text>End:</Text>
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};










const styles = StyleSheet.create({
  imageContainer: {
     width: '100%',
     height: undefined,
     aspectRatio: 1,
   },
   Text: {
  color: '#c1e3a8',
  fontSize: 20
  },
  container: {
   flex: 1,
   padding: 16,
   backgroundColor: '#65a30d',
  },
  title: {
   textAlign: 'center',
   fontSize: 30,
   fontWeight: 'bold',
   marginBottom: 10,
  },
  hotelContainer: {
   backgroundColor: '#869190',
   padding: 16,
   marginBottom: 10,
   borderRadius: 8,
   borderWidth: 1,
   //borderColor: '#ddd',
  },
  hotelName: {
   textAlign: 'center',
   fontSize: 18,
   fontWeight: 'bold',
   marginBottom: 8,
  },
  id: {
   textAlign: 'center',
   fontSize: 18,
   fontWeight: 'bold',
   marginBottom: 8,
  },
  hotelAddress: {
   textAlign: 'center',
   fontSize: 16,
   fontWeight: 'bold',
  },
  ManagerID: {
   textAlign: 'center',
   fontSize: 18,
   fontWeight: 'bold',
   marginBottom: 8,
  },
  Button: {
   alignItems: 'center',
   justifyContent: 'center',
   paddingVertical: 20,
   paddingHorizontal: 32,
   borderRadius: 4,
   elevation: 3,
   backgroundColor: '#787063',
  }
 });