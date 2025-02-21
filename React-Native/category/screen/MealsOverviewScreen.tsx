import { StyleSheet, Text, View } from "react-native";

export default function MealsOverviewScreen({ route }) {
  const categoryId = route.params.categoryId;
  return (
    <View style={styles.container}>
      <Text>MealsOverviewScreen - {categoryId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
