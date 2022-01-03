import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../constants/Storage';

const storeData = async (key: StorageKeys, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log('error saving data');
        // Error saving data
    }
}

const getData = async (key: StorageKeys) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (error) {
        console.log('error getting data');
        // Error retrieving data
    }
}

const removeData = async (key: StorageKeys) => {
    try {
        await AsyncStorage.removeItem(key);
        console.log('data removed');
    } catch (error) {
        console.log('error removing data');
        // Error retrieving data
    }
}

const clearAllData = async () => {
    try {
        await AsyncStorage.clear();
        console.log('all data removed');
    } catch (error) {
        console.log('error clearing data');
        // Error retrieving data
    }
}

export { storeData, getData, removeData, clearAllData };