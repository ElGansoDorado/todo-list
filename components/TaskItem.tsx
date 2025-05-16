import { StyleSheet, View, Text, Button } from "react-native"
import { Task } from "@/constants/Types"
import { deleteTask } from "@/constants/api";

export default function TaskItem({id, title, descriptionText, status} : Task) {
    return <View>
        <View style={styles.header}>
            <Text>{title}</Text>
            <Text>{status}</Text>
        </View>
        <Text>
            {descriptionText}
        </Text>

        <Button 
            title="Delete"
            onPress={() => deleteTask(id)}/>
    </View>
}

const styles = StyleSheet.create({
  container: {
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});