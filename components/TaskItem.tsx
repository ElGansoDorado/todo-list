import { StyleSheet, View, Text, TouchableOpacity, Animated } from "react-native"
import { useState, useRef } from "react";
import { Task } from "@/constants/Types"
import { Background } from "@react-navigation/elements";

type Props = {
    task: Task,
    remove: Function,
}

export default function TaskItem({ task, remove }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const slideAnim = useRef(new Animated.Value(0)).current; // для смещения кнопки
    const panelAnim = useRef(new Animated.Value(0)).current; // для открытия панели

    const togglePanel = () => {
        if (isOpen) {
            // Закрываем панель и возвращаем кнопку в исходное положение
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(panelAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => setIsOpen(false));
        } else {
            // Смещаем кнопку и открываем панель
            setIsOpen(true);
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: -40, // смещение влево на 20 пикселей
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(panelAnim, {
                    toValue: 20, // панель полностью открыта
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    };

    const colorSelection = (): string => {
        const v: number = task.id % 4;

        switch (v) {
            case 0:
                return '#92CA7F';
            case 1:
                return '#ADC6EF';
            case 2:
                return '#E6F58A';
            case 3:
                return '#EDEDED';
            default:
                return '#92CA7F';
        }
    }

    return <View>
        <Animated.View style={{ transform: [{ translateX: panelAnim }] }}>
            <View style={styles.panel}>
                <TouchableOpacity style={styles.panelItem}>
                    <Text>L</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.panelItem}>
                    <Text>K</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.panelItem}>
                    <Text>c</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.panelItem} onPress={() => remove(task.id)}>
                    <Text>D</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
        <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
            <TouchableOpacity activeOpacity={1} style={[styles.container, {backgroundColor: colorSelection()}]} onPress={togglePanel}>
                <Text style={styles.title}>{task.title}</Text>

                <Text> {task.descriptionText} </Text>
                <Text> {task.location} </Text>

                <Text style={styles.separator}></Text>

                <View style={styles.footer}>
                    <Text>{JSON.stringify(task.completionDate)}</Text>
                    <Text>{task.status}</Text>
                </View>
            </TouchableOpacity >
        </Animated.View>
    </View>



}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        paddingVertical: 20,

        borderRadius: 12,
        gap: 12,
    },
    separator: {
        height: 1,
        backgroundColor: '#00000014',
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

    panel: {
        width: 300,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
        gap: 11,

        backgroundColor: '#313131',
        alignItems: 'flex-end',
        position: "absolute",
        right: 0,
    },
    panelItem: {
        width: 22,
        height: 22,
    }
});