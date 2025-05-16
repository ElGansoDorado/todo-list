import { View, Text, TextInput, StyleSheet } from "react-native"

import { Colors } from "@/constants/Colors";

type Props = { 
    value: string,
    onChangeValue: (text: string) => void,
    label: string,
    placeholder: string;
}

export function CustomInput({value, onChangeValue, label, placeholder} : Props) {
    return <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={styles.input}

            value={value} 
            onChangeText={onChangeValue}
            placeholder={placeholder}
            placeholderTextColor={Colors.light.placeholder}/>
    </View>
}


const styles = StyleSheet.create({
  container: {
  },
  label: {
    marginLeft: 12,
    marginBottom: 4,

    fontWeight: "500",
    fontSize: 16,

    textTransform: 'uppercase',
    color: '#FFF',
  },
  input: {
    height: 40,
    padding: 12,

    color: '#FFF',
    backgroundColor: Colors.light.border,

    borderWidth: 1,
    borderColor: Colors.light.tint,
    borderRadius: 22,
  },
});
