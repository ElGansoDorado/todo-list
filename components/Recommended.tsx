import { StyleSheet, View, Text, TouchableOpacity, Animated } from "react-native"
import { useState, useRef } from "react";

type Props = {
    title: string,
    number: number,
    sort: Function,
    color?: string,
}

export function Recommended({ title, number, sort, color }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const circleAnim = useRef(new Animated.Value(0)).current; // для смещения карточки
    const textAnim = useRef(new Animated.Value(0)).current; // для открытия панели

    const togglePanel = () => {
        sort();

        if (isOpen) {
            // Закрываем панель и возвращаем кнопку в исходное положение
            Animated.parallel([
                Animated.timing(circleAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(textAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => setIsOpen(false));
        } else {
            // Смещаем кнопку и открываем панель
            setIsOpen(true);
            Animated.parallel([
                Animated.timing(circleAnim, {
                    toValue: -110, // смещение влево 
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(textAnim, {
                    toValue: 40, // смещение вправо
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    };

    return <TouchableOpacity activeOpacity={1} onPress={togglePanel} style={styles.container}>
        <Animated.View style={{ transform: [{ translateX: textAnim }] }}>
            <Text style={styles.text}>{title}</Text>
        </Animated.View>

        <Animated.View style={[styles.circle, { backgroundColor: color, transform: [{ translateX: circleAnim }] }]}>
            <Text>{number}</Text>
        </Animated.View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        width: 160,
        height: 48,
        padding: 4,
        borderWidth: 1,
        borderColor: "#FFFFFF66",

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        borderRadius: 100,
        gap: 8,
    },
    text: {
        margin: 8,
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 24,
        color: '#FFFFFF',
    },
    circle: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',

        borderWidth: 1,
        borderColor: "#FFFFFF66",
        borderRadius: 100,

        fontWeight: '500',
        fontSize: 16,
        lineHeight: 24,

        color: '#000000',
    }

});