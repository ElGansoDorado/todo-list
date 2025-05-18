import { StyleSheet, View, Text, TouchableOpacity, Animated } from "react-native"
import { useState, useRef } from "react";
import { Task, Status } from "@/constants/Types"
import Trash from '@/assets/svg/trash-2.svg'
import X from '@/assets/svg/x-circle.svg'
import Loader from '@/assets/svg/loader.svg'
import Check from '@/assets/svg/check.svg'
import Calendar from '@/assets/svg/calendar.svg'
import Map from '@/assets/svg/map-pin.svg'

type Props = {
    task: Task,
    remove: Function,
    switchStatus: Function,
}

export default function TaskItem({ task, remove, switchStatus }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const slideAnim = useRef(new Animated.Value(0)).current; // для смещения карточки
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
                    toValue: -55, // смещение влево 
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(panelAnim, {
                    toValue: 20, // смещение вправо
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    };

    // выбираем один из вариантов цветов по id(для сохранения цвета при новой загрузки)
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
        <Animated.View style={{ translateX: panelAnim }}>
            <View style={[styles.panel, { outlineColor: colorSelection() }]}>
                <TouchableOpacity onPress={() => switchStatus(task.id, Status.Active)}>
                    <Text style={{ color: colorSelection() }}><Loader /></Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => switchStatus(task.id, Status.Completed)}>
                    <Text style={{ color: colorSelection() }}><Check /></Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => switchStatus(task.id, Status.Cancelled)}>
                    <Text style={{ color: colorSelection() }}><X /></Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => remove(task.id)}>
                    <Trash />
                </TouchableOpacity>
            </View>
        </Animated.View>
        <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
            <TouchableOpacity activeOpacity={1} style={[styles.container, { backgroundColor: colorSelection() }]} onPress={togglePanel}>
                <Text style={styles.title}>{task.title}</Text>

                <Text style={styles.text}> {task.descriptionText} </Text>

                <View style={styles.icon}>
                    <Map />
                    <Text> {task.location} </Text>
                </View>

                <Text style={styles.separator}></Text>

                <View style={styles.footer}>
                    <View style={styles.icon}>
                        <Calendar />
                        <Text>{JSON.stringify(task.completionDate)}</Text>
                    </View>
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
    text: {
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 14,
        color: '#0000008A',
    },
    icon: {
        flexDirection: 'row',
        gap: 4,

        fontWeight: '400',
        fontSize: 14,
        lineHeight: 14,
        color: '#000000CC',
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
});