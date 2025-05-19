import { StyleSheet, ScrollView, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useState, useEffect } from 'react';
import { useFocusEffect } from 'expo-router';

import { getList } from '@/constants/api';
import { Task, Status } from '@/constants/Types';
import TaskItem from '@/components/TaskItem';
import { deleteTask, saveList } from '@/constants/api';
import { Recommended } from '@/components/Recommended';
import { DateInput } from '@/components/ui/input/DateInput';

export default function HomeScreen() {
  const [list, setList] = useState<Task[]>();
  const [sList, setSList] = useState<Task[]>();

  const [inInactiv, setInInactiv] = useState(0);
  const [inActiv, setInActiv] = useState(0);
  const [inCompleted, setInCompleted] = useState(0);
  const [inCancelled, setCancelled] = useState(0);

  const [filterDate, setFilterDate] = useState<Date>()
  const [filterInactive, setFilterInactive] = useState(false)
  const [filterActive, setFilterActive] = useState(false)
  const [filterCompleted, setFilterComleted] = useState(false)
  const [filterCancelled, setFilterCancelled] = useState(false)

  const search = () => {
    const searchList: Task[] = list?.filter((item) => {
      if (filterDate !== undefined && item.completionDate.getDate() === filterDate.getDate()) {
        return true;
      }

      // Проверка по статусам
      if (filterInactive && item.status === Status.Inactive) {
        return true;
      }

      if (filterActive && item.status === Status.Active) {
        return true;
      }

      if (filterCompleted && item.status === Status.Completed) {
        return true;
      }

      if (filterCancelled && item.status === Status.Cancelled) {
        return true;
      }

      if (filterDate || filterInactive || filterActive || filterCompleted || filterCancelled) {
        return false;
      }

      return true;
    }) as Task[];

    return searchList;
  }

  const count = (status: Status) => {
    return list?.filter((item) => item.status === status).length as number;
  }

  useFocusEffect(useCallback(() => {
    const loader = async () => {
      setList(await getList());
    }
    loader();
  }, []))

  useEffect(() => {
    setInInactiv(count(Status.Inactive));
    setInActiv(count(Status.Active));
    setInCompleted(count(Status.Completed));
    setCancelled(count(Status.Cancelled));
  }, [list])

  useEffect(() => {
    setSList(search());
  }, [list, filterDate, filterInactive, filterActive, filterCompleted, filterCancelled])

  const remove = async (id: number) => {
    const newList = await deleteTask(id)
    setList(newList);
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
        <DateInput 
          error={false} 
          label='Filter for date'
          date={filterDate}
          setDate={setFilterDate}/>
      </View>
      <ScrollView horizontal>
        <View style={styles.row}>
          <Recommended title="In review" number={inInactiv} sort={() => setFilterInactive(!filterInactive)} color='#ADC6EF' />
          <Recommended title="In progress" number={inActiv} sort={() => setFilterActive(!filterActive)} color='#E6F58A' />
          <Recommended title="Completed" number={inCompleted} sort={() => setFilterComleted(!filterCompleted)} color='#92CA7F' />
          <Recommended title="Cancelled" number={inCancelled} sort={() => setFilterCancelled(!filterCancelled)} color='#FF5964' />
        </View>
      </ScrollView>
      <View style={styles.container}>
        {list && sList?.map((item) => <TaskItem
          key={item.id}
          task={item}
          remove={remove}
          switchStatus={switchStatus} />)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  carousel: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 20,
    marginTop: 10,
  },
  container: {
    gap: 12,
    marginTop: 25,
    marginHorizontal: 20,
  },
});
