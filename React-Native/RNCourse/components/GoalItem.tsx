import { Pressable, StyleSheet, Text, View } from "react-native";

export default function GoalItem(
  this: string,
  props: {
    text: string;
    id: string;
    onDeleteItem: (id: string) => void;
  },
) {
  // function deleteItemHandler(){
  //   props.onDeleteItem(id:string );
  // }
  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "#210644" }}
        onPress={props.onDeleteItem.bind(this, props.id)}
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalText: {
    padding: 8,
    color: "white",
  },
  pressedItem: {
    opacity: 0.6,
  },
});
