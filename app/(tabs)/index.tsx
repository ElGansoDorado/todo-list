import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { ScrollView, Text, View } from 'react-native';

import { useEffect, useState } from 'react';
import { getList } from '@/constants/api';
import { Task } from '@/constants/Types';
import TaskItem from '@/components/TaskItem';

export default function HomeScreen() {
  const [list, setList] = useState<Task[]>();

  useEffect(() => {
    const testf = async () => {
      setList(await getList())
    }

    console.log(list);
    testf();
  }, [])

  return (
    <ScrollView>
      <View>
        {list?.map((item) => <TaskItem
          key={item.id}
          id={item.id}
          title={item.title}
          descriptionText={item.descriptionText}
          status={item.status}
          completionDate={item.completionDate}
          createdDate={item.createdDate}/>)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

});
