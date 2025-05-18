import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
    error: boolean,
    label: string,
    date: Date,
    setDate: (v: Date) => void,
    onChange: (event: any, selectedDate: any) => void,
    show: boolean,
    setShow: (v: boolean) => void,
}

export function DateInput({ error, label, date, show, onChange, setShow, setDate }: Props) {
    return <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity style={error ? styles.inputError : styles.input} onPress={() => setShow(true)}>
            <Text style={styles.textDate}>{date.toLocaleDateString()}</Text>

            <TouchableOpacity style={styles.clear} onPress={() => setDate(new Date())}>
                <Text style={styles.clearText}>X</Text>
            </TouchableOpacity>
        </TouchableOpacity>
        
        {show && (
            <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
            />
        )}
    </View>
}


const styles = StyleSheet.create({
    container: {
        gap: 2,
    },
    input: {
        height: 50,
        paddingVertical: 16,
        paddingLeft: 12,
        paddingRight: 44,

        color: '#FFF',
        backgroundColor: '#313131',

        borderWidth: 1,
        borderColor: '#EDF1F333',
        borderRadius: 10,
    },
    label: {
        fontWeight: "500",
        fontSize: 16,
        lineHeight: 24,

        color: '#FFF',
    },
    inputError: {
        height: 40,
        padding: 12,

        color: '#FFF',
        backgroundColor: '#313131',

        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 22,
    },
    textDate: {
        fontSize: 16,
        lineHeight: 16,
        fontWeight: '400',
        color: '#FFF',
    },

    clear: {
        width: 17,
        height: 17,

        borderWidth: 1,
        backgroundColor: "#8E8E93",
        borderRadius: 50,

        justifyContent: 'center',
        alignItems: 'center',

        position: 'absolute',
        right: 17,
        top: 16.5,
    },

    clearText: {
        fontSize: 14,
        color: '#313131'
    },
});