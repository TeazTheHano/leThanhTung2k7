import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import * as FORMATDATA from './interfaceFormat';

const storage = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: null,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  sync: {
    // Sync method for retrieving data from the server
  },
});

export default storage;


// TODO: change it every project
const ERROR_SAVE_MESSAGE = 'Save failed';
const ERROR_GET_MESSAGE = 'Data is not exist or get data failed';
const ERROR_CLEAR_MESSAGE = 'Clear data failed';
// END OF DEFAULT STORAGE FUNCTIONS ______________________________________________________

export const saveStorageItem = async <K extends keyof FORMATDATA.StorageItem>(key: K, item: FORMATDATA.StorageItem[K], id?: string): Promise<boolean> => {
  try {
    await storage.save({
      key,
      data: item,
      id,
    });
    console.log(`Save successfully: ${key} - ${id ? id : ''}`);

    return true;
  } catch (error) {
    console.error(`Failed to save ${key}`, error);
    return false;
  }
}

export const getStorageList = async <K extends keyof FORMATDATA.StorageItem>(key: K): Promise<FORMATDATA.StorageItem[K] | false> => {
  try {
    const ret = await storage.getAllDataForKey(key) as unknown as FORMATDATA.StorageItem[K];
    return ret;
  } catch (error) {
    console.log(`Failed to get ${key} list:`, error);
    return false;
  }
}

export const getStorageItem = async <K extends keyof FORMATDATA.StorageItem>(key: K, id?: string): Promise<FORMATDATA.StorageItem[K] | false> => {
  try {
    const ret: FORMATDATA.StorageItem[K] = await storage.load({
      key,
      id,
    });
    return ret;
  } catch (error) {
    console.log(`Failed to get ${key} by id:`, error);
    return false;
  }
}

export const removeStorageItem = async <K extends keyof FORMATDATA.StorageItem>(key: K, id?: string): Promise<boolean> => {
  try {
    await storage.remove({
      key,
      id,
    });
    return true;
  } catch (error) {
    console.log(`Failed to remove ${key}:`, error);
    return false;
  }
}

export const clearStorage = async <K extends keyof FORMATDATA.StorageItem>(key: K): Promise<boolean> => {
  try {
    await storage.clearMapForKey(key);
    return true;
  } catch (error) {
    console.log(`Failed to clear ${key} list:`, error);
    return false;
  }
}