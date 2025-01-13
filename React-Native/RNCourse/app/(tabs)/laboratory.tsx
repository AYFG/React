import GoalInput from "@/components/GoalInput";
import GoalItem from "@/components/GoalItem";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function laboratory() {
  const [courseGoals, setCourseGoals] = useState<{ text: string; id: string }[]>([]);

  interface Goal {
    text: string;
    id: string;
  }

  interface GoalInputProps {
    onAddGoal: (enteredGoalText: string) => void;
  }

  function addGoalHandler(enteredGoalText: string) {
    setCourseGoals((currentCourseGoals: Goal[]) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
  }
  return (
    <View style={styles.appContainer}>
      <GoalInput onAddGoal={addGoalHandler} />
      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          renderItem={(itemData) => {
            return <GoalItem text={itemData.item.text} />;
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          style={styles.goalsContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  goalsContainer: {
    flex: 5,
  },
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
});
