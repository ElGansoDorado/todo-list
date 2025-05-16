import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { View, TextInput } from 'react-native';

import { useState } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

export default function CreateScreen() {
  const [text, setText] = useState('Useless Text');

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <SafeAreaView>
          <TextInput
            style={styles.customInput}
            onChangeText={setText}
            value={text}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  customInput: {
    height: 40,
    margin: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.light.tint,
  },
});
