import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View, Button, Text } from 'react-native';

import { useState } from 'react';
import { Colors } from '@/constants/Colors';

import { CustomInput } from '@/components/CustomInput';
import { createTask } from '@/constants/api';


export default function CreateScreen() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [text, setText] = useState('');

  const [titleError, setTitleError] = useState('');
  const [dateError, setDateError] = useState('');
  const [textError, setTextError] = useState('');

  const clearForm = () => {
    setTitle('');
    setDate('');
    setText('');
  }

  const clearFormError = () => {
    setTitleError('');
    setDateError('');
    setTextError('');
  }

  const validation = () => {
    clearFormError();

    if (title.length <= 0) {
      setTitleError('the title field is not filled in');
      return false;
    }

    if (text.length <= 0) {
      setTextError('the text field is not filled in');
      return false;
    }

    if (date.length <= 0) {
      setDateError('the date field is not filled in');
      return false;
    }

    return true;
  }

  const created = () => {
    if (validation()) {
      createTask({ title, date, text });
      clearForm();
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <SafeAreaView>
          <View style={styles.box}>
            <CustomInput
              error={titleError !== ''}
              onChangeValue={setTitle}
              value={title}
              label='Title'
              placeholder='your task title'
            />

            <CustomInput
              error={dateError !== ''}
              onChangeValue={setDate}
              value={date}
              label='Date'
              placeholder='date of completion'
            />

          </View>

          <CustomInput
            error={textError !== ''}
            onChangeValue={setText}
            value={text}
            label='Text'
            placeholder='your task text'
          />

          <Button title="Нажми меня" onPress={() => created()} />
          <View style={styles.error}>
            <Text style={styles.error}>{titleError && titleError}</Text>
            <Text style={styles.error}>{dateError && dateError}</Text>
            <Text style={styles.error}>{textError && textError}</Text>
          </View>
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
  error: {
    alignItems: 'center',
    color: 'red',
  }
});
