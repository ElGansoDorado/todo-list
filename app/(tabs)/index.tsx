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
    const testf = async () => {
      setList(await getList())
    }

    console.log(list);
    testf();
  }, [])

  const remove = async (id: number) => {
    const newList = await deleteTask(id)
    setList( newList );
  }

  const clear = async () => {
    setList(undefined);
    await AsyncStorage.clear();
  }


  return (
    <ScrollView >
      <View style={styles.container}>
        {list?.map((item) => <TaskItem
          key={item.id}
          task={item}
          remove={remove}/>)}
      </View>
      <Button onPress={clear} title='Clear'/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    margin: 20,
  },
});
