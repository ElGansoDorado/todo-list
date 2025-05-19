import AsyncStorage from '@react-native-async-storage/async-storage';
import { Status, type Task } from '@/types/task';

const KEY = 'LIST';

export const getList = async () => {
    const list = await AsyncStorage.getItem(KEY);

    if (list) {
        const taskList: Task[] = JSON.parse(list).map((task: Task) => {
            const newTask: Task = 
            {   
                id: task.id, 
                title: task.title, 
                descriptionText: task.descriptionText, 
                location: task.location, 
                completionDate: new Date(task.completionDate), 
                createdDate: new Date(task.createdDate), 
                status: task.status,
            }

            return newTask;
        });
        return taskList;
    }
}

export const getTask = async (id: number) => {
    const list = await getList();

    if (list !== null) {
        const task = list?.find(item => item.id === id);

        return task;
    }
}

export const saveList = async (list: Task[]) => {
    await AsyncStorage.setItem(KEY, JSON.stringify(list));
}

export const createTask = async ({ title, date, text, location }: { title: string, date: Date, text: string, location: string }) => {
    const list = await AsyncStorage.getItem(KEY)

    if (list !== null && list.length >= 0) {
        const taskList: Task[] = JSON.parse(list as string);

        const newTask: Task = {
            id: taskList[taskList.length - 1].id + 1,
            title: title,
            descriptionText: text,
            location: location,

            completionDate: date,
            createdDate: new Date(),

            status: Status.Inactive,
        }

        taskList.push(newTask);
        await AsyncStorage.setItem(KEY, JSON.stringify(taskList));
    }
    else {
        const newTask: Task = {
            id: 0,
            title: title,
            descriptionText: text,
            location: location,

            completionDate: date,
            createdDate: new Date(),

            status: Status.Inactive,
        }

        const newTaskList: Task[] = [newTask];
        await AsyncStorage.setItem(KEY, JSON.stringify(newTaskList));
    }
}

export const deleteTask = async (id: number) => {
    const list = await getList()

    if (list) {
        const afterRemovalList: Task[] = list.filter((item) => item.id !== id);

        await AsyncStorage.setItem(KEY, JSON.stringify(afterRemovalList));

        return afterRemovalList;
    }
}