import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View, Button, Text } from 'react-native';
import { useState } from 'react';

import { RowInput } from '@/components/ui/input/RowInput';
import { MultilineInput } from '@/components/ui/input/MultilineInput';
import { DateInput } from '@/components/ui/input/DateInput';
import { createTask } from '@/api/api';

export default function CreateScreen() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [inputDate, setInputDate] = useState<Date | undefined>(new Date());
  const [text, setText] = useState('');

  const [titleError, setTitleError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [dateError, setDateError] = useState('');
  const [textError, setTextError] = useState('');

  const clearForm = () => {
    setTitle('');
    setLocation('');
    setText('');
    setInputDate(new Date());
  }

  const clearFormError = () => {
    setTitleError('');
    setLocationError('');
    setDateError('');
    setTextError('');
  }

  /** проверка правильности заполнения всех полей  */
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

    if (location.length <= 0) {
      setLocationError('the location field is not filled in');
      return false;
    }

    if (inputDate === undefined) {
      setDateError('the date field is not filled in');
      return false;
    }

    return true;
  }

  /** создание Task a при выполнении всех условий валидации  */
  const created = () => {
    if (validation()) {
      const date = inputDate as Date;
      createTask({ title, date, text, location });
      clearForm();
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <SafeAreaView style={{gap: 16}}>

          <Text style={styles.title}>New Task</Text>

          <RowInput
            error={titleError !== ''}
            onChangeValue={setTitle}
            value={title}
            label='Title'
            placeholder='your task title'
          />

          <MultilineInput
            error={textError !== ''}
            onChangeValue={setText}
            value={text}
            label='Description'
            placeholder='your task description'
            max={200}
          />

          <RowInput
            error={locationError !== ''}
            onChangeValue={setLocation}
            value={location}
            label='Locate'
            placeholder='locate of completion'
          />

          <DateInput 
            error={dateError !== ''} 
            label="Date" date={inputDate} 
            setDate={setInputDate}/>

          <Button color={"#ADC6EF"} title="Create task" onPress={() => created()} />

          <View style={styles.error}>
            <Text style={styles.error}>{titleError}</Text>
            <Text style={styles.error}>{locationError}</Text>
            <Text style={styles.error}>{textError}</Text>
            <Text style={styles.error}>{dateError}</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1E1E1E',
  },
  title: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  box: {
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  error: {
    alignItems: 'center',
    color: '#FF5964',
  }
});
