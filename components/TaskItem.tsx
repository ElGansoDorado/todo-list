import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { Task } from "@/constants/Types"

type Props = {
    task: Task,
    remove: Function,
}

export default function TaskItem({ task, remove }: Props) {
    return <View style={styles.container}>
        <View style={styles.header}>

            <Text style={styles.title}>{task.title}</Text>

            <TouchableOpacity style={styles.button} onPress={() => remove(task.id)}>
                <Text style={styles.buttonText}>X</Text>
            </TouchableOpacity>
        </View>

        <Text> {task.descriptionText} </Text>
        <Text> {task.location} </Text>

        <Text style={styles.separator}></Text>

        <View style={styles.footer}>
            <Text>{task.completionDate.toDateString()}</Text>
            <Text>{task.status}</Text>
        </View>
    </View >
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        paddingVertical: 20,

        borderRadius: 12,

        gap: 12,
        backgroundColor: '#92CA7F',
    },
    separator: {
        height: 1,
        backgroundColor: '#00000014',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        verticalAlign: 'middle',
    },
    button: {
        backgroundColor: "transparent",
    },
    buttonText: {
        fontSize: 18,
        color: '#0F1F38',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});