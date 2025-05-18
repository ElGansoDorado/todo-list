import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, Text, View, Button } from 'react-native';

import { useEffect, useState } from 'react';
import { getList } from '@/constants/api';
import { Task } from '@/constants/Types';
import TaskItem from '@/components/TaskItem';
import { deleteTask } from '@/constants/api';

export default function HomeScreen() {
  const [list, setList] = useState<Task[]>();

  useEffect(() => {
    const loader = async () => {
      setList(await getList())
    }

    loader();
  }, [])

  const remove = async (id: number) => {
    const newList = await deleteTask(id)
    setList(newList);
  }

  const clear = async () => {
    setList(undefined);
    await AsyncStorage.clear();
  }


  return (
    <ScrollView style={styles.carousel}>
      <View style={styles.container}>
        {list && list?.map((item) => <TaskItem
          key={item.id}
          task={item}
          remove={remove} />)}
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
