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

    if (list !== null && list.length >= 0) {
        const taskList: Task[] = JSON.parse(list as string);

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

export const deleteTask = async (id: number) => {
    const list = await AsyncStorage.getItem(KEY)

    if (list) {
        const taskList: Task[] = JSON.parse(list);

        const afterRemovalList: Task[] = taskList.filter((item) => item.id !== id);

        await AsyncStorage.setItem(KEY, JSON.stringify(afterRemovalList));
    }
}