import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View, Button } from 'react-native';

import { useState } from 'react';
import { Colors } from '@/constants/Colors';

import { CustomInput } from '@/components/ui/CustomInput';
import { createTask } from '@/constants/api';


export default function CreateScreen() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <SafeAreaView>
          <View style={styles.box}>
            <CustomInput
              onChangeValue={setTitle}
              value={title}
              label='Title'
              placeholder='your task title'
            />

            <CustomInput
              onChangeValue={setDate}
              value={date}
              label='Date'
              placeholder='date of completion'
            />

          </View>

          <CustomInput
            onChangeValue={setText}
            value={text}
            label='Text'
            placeholder='your task text'
          />

          <Button title="Нажми меня"  onPress={() => createTask({title, date, text})}/>

        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    flex: 1,

    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    
    backgroundColor: Colors.light.background,
  },
  box: {
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
});
