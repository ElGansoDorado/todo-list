import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View, Button, Text, Platform } from 'react-native';

import { useState } from 'react';
import { Colors } from '@/constants/Colors';

import { RowInput } from '@/components/ui/input/RowInput';
import { MultilineInput } from '@/components/ui/input/MultilineInput';
import { DateInput } from '@/components/ui/input/DateInput';

import { createTask } from '@/constants/api';

export default function CreateScreen() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [text, setText] = useState('');

  const [titleError, setTitleError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [dateError, setDateError] = useState('');
  const [textError, setTextError] = useState('');

  const [show, setShow] = useState(false);

  const clearForm = () => {
    setTitle('');
    setLocation('');
    setText('');
    setDate(new Date());
  }

  const clearFormError = () => {
    setTitleError('');
    setLocationError('');
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

    if (location.length <= 0) {
      setLocationError('the location field is not filled in');
      return false;
    }

    if (date === undefined) {
      setDateError('the date field is not filled in');
      return false;
    }

    return true;
  }

  const created = () => {
    if (validation()) {
      createTask({ title, date, text, location });
      clearForm();
    }
  }

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <SafeAreaView style={{gap: 16}}>

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
            label="Date" date={date} 
            show={show} 
            setShow={setShow} 
            onChange={onChange}
            setDate={setDate}/>

          <Button title="Create task" onPress={() => created()} />

          <View style={styles.error}>
            <Text style={styles.error}>{titleError && titleError}</Text>
            <Text style={styles.error}>{locationError && locationError}</Text>
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

    paddingHorizontal: 10,
    paddingVertical: 15,

    backgroundColor: '#1E1E1E',
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
