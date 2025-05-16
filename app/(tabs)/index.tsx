import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { ScrollView, Text, View } from 'react-native';

import { useEffect, useState } from 'react';
import { getList } from '@/constants/api';
import { Task } from '@/constants/Types';

export default function HomeScreen() {
  const [list, setList] = useState<Task[]>();

  useEffect(() => {
    const testf = async () => {
      setList(await getList())
    }

    console.log(list);
    testf();
  },[])

  return (
    <ScrollView>
      <View>
        {list?.map((item) => <Text>{item.title}</Text>)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

});
