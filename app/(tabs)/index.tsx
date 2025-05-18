import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, View, Button } from 'react-native';

import { useFocusEffect } from 'expo-router';

import { useCallback, useState } from 'react';
import { getList } from '@/constants/api';
import { Task, Status } from '@/constants/Types';
import TaskItem from '@/components/TaskItem';
import { deleteTask, saveList } from '@/constants/api';

export default function HomeScreen() {
  const [list, setList] = useState<Task[]>();

  useFocusEffect(useCallback(() => {
    const loader = async () => {
      setList(await getList())
    }

    loader();
  }, []))

  const remove = async (id: number) => {
    const newList = await deleteTask(id)
    setList(newList);
  }

  const clear = async () => {
    setList(undefined);
    await AsyncStorage.clear();
  }

  const switchStatus = async (id: number, status: Status) => {
    var i: number = 0;

    const newArray = list?.map((item) => {
      if (item.id === id) {
        const newTask = item;
        newTask.status = status;
        return newTask;
      }

      return item;
    });

    setList(newArray);
    saveList(newArray as Task[]);
  }

  return (
    <ScrollView style={styles.carousel}>
      <View style={styles.container}>
        {list && list?.map((item) => <TaskItem
          key={item.id}
          task={item}
          remove={remove}
          switchStatus={switchStatus} />)}
      </View>
      <Button onPress={clear} title='Clear' />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  carousel: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  container: {
    gap: 12,
    margin: 20,
  },
});
