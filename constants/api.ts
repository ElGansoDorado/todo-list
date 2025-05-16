import AsyncStorage from '@react-native-async-storage/async-storage';
import { Status, type Task } from '@/constants/Types';

const KEY = 'LIST';

export const getList = async () => {
    const list = await AsyncStorage.getItem(KEY);

    if (list) {
        const taskList: Task[] = JSON.parse(list);
        return taskList;
    }
}

export const createTask = async ({ title, date, text }: { title: string, date: string, text: string }) => {
    const list = await AsyncStorage.getItem(KEY)
    console.log(list);
    if (list) {
        const taskList: Task[] = JSON.parse(list);

        const newTask: Task = {
            id: taskList[taskList.length - 1].id + 1,
            title: title,
            descriptionText: text,

            completionDate: date,
            createdDate: 'new Date',

            status: Status.Active,
        }

        taskList.push(newTask);;
        await AsyncStorage.setItem(KEY, JSON.stringify(taskList));
    }
    else {
        const newTask: Task = {
            id: 0,
            title: title,
            descriptionText: text,

            completionDate: date,
            createdDate: 'new Date',

            status: Status.Active,
        }

        const newTaskList: Task[] = [newTask];
        await AsyncStorage.setItem(KEY, JSON.stringify(newTaskList));
    }
}