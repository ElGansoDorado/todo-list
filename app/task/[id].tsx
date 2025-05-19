import { useLocalSearchParams } from "expo-router/build/hooks";
import { View, Text, StyleSheet } from "react-native";
import { useCallback, useState } from 'react';
import { useFocusEffect, Link } from 'expo-router';
import { getTask } from "@/constants/api";
import { Task } from "@/constants/Types";

import { FontAwesome } from '@expo/vector-icons';

export default function TaskScreen() {
    const { id } = useLocalSearchParams();
    const [task, setTask] = useState<Task>();

    useFocusEffect(useCallback(() => {
        const numbId: number = +id;

        const loader = async () => {
            const buff = await getTask(numbId);
            setTask(buff)
        };

        loader()
    }, []))

    return <View style={styles.container}>
        <View style={styles.header}>
            <Link href="/" style={styles.link}>Cancel</Link>
            <Text style={styles.headerTitle}>Details</Text>
            <Text></Text>
        </View>
        <Text style={styles.status}>{task?.status}</Text>
        <Text style={styles.title}>{task?.title}</Text>
        <View style={styles.info}>
            <FontAwesome name="map" color={"#FFF"}/>
            <Text style={styles.infoText}>{task?.location}</Text>
        </View>
        <View style={styles.info}>
            <FontAwesome name="calendar" color={"#FFF"}/>
            <Text style={styles.infoText}>{task?.completionDate.toLocaleDateString()}</Text>
        </View>

        <Text style={styles.description}>{task?.descriptionText}</Text>
    </View>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1E1E1E",

        gap: 12,
        paddingTop: 50,
        paddingHorizontal: 25,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    link: {
        color: '#ADC6EF',
        fontWeight: '400',
        fontSize: 17,
        lineHeight: 22,
    },
    headerTitle: {
        color: "#FFFFFF",
        fontWeight: '600',
        fontSize: 17,
        lineHeight: 22,
    },

    status: {
        textAlign: 'right',
        color: '#FFFFFFCC',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 14,
    },
    title: {
        color: "#FFF",
        fontWeight: '700',
        fontSize: 32,
        lineHeight: 32,

        marginBottom: 20,
    },
    info: {
        flexDirection: 'row',
        gap: 6,
    },
    infoText: {
        color: "#FFFFFFCC",
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 14,
    },
    description: {
        marginTop: 20,
        color: "#FFFFFF8A",
        
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 16,
    }
});