import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"

type Props = {
  error: boolean,
  value: string,
  onChangeValue: (text: string) => void,
  label: string,
  placeholder: string;
}

export function RowInput({ error, value, onChangeValue, label, placeholder }: Props) {
  return <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <View>
      <TextInput
        style={error ? styles.inputError : styles.input}

        value={value}
        onChangeText={onChangeValue}
        placeholder={placeholder}
        placeholderTextColor={'#FFFFFF8A'} />

      <TouchableOpacity style={styles.clear} onPress={() => onChangeValue('')}>
        <Text style={styles.clearText}>X</Text>
      </TouchableOpacity>
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
  inputError: {
    height: 50,
    paddingVertical: 16,
    paddingLeft: 12,
    paddingRight: 44,

    color: '#FFF',
    backgroundColor: '#313131',

    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
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