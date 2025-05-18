import { View, Text, TextInput as Input, StyleSheet } from "react-native"

type Props = {
    error: boolean,
    value: string,
    onChangeValue: (text: string) => void,
    label: string,
    placeholder: string;
    max: number;
}

export function MultilineInput({ error, value, onChangeValue, label, placeholder, max }: Props) {
    return <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <Input
            style={error ? styles.inputError : styles.input}
            maxLength={max}
            multiline={true}
            value={value}
            onChangeText={onChangeValue}
            placeholder={placeholder}
            placeholderTextColor={'#FFFFFF8A'} />
        <View style={styles.maxTextBox}>
            <Text style={styles.maxText}>max {max} symbols</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        gap: 2,
    },
    label: {
        fontWeight: "500",
        fontSize: 16,
        lineHeight: 24,

        color: '#FFF',
    },
    input: {
        height: 125,
        paddingVertical: 16,
        paddingHorizontal: 12,

        color: '#FFF',
        backgroundColor: '#313131',

        borderWidth: 1,
        borderColor: '#EDF1F333',
        borderRadius: 10,
    },
    inputError: {
        height: 125,
        paddingVertical: 16,
        paddingHorizontal: 12,

        color: '#FFF',
        backgroundColor: '#313131',

        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 10,
    },
    maxTextBox: {
        alignItems: 'flex-end',
    },
    maxText: {
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 18,
        color: '#FFF'
    },
});