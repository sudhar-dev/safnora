import { Platform } from 'react-native';

export interface UserProfileData {
  uid: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  bio?: string;
  role?: string;
  avatarUrl?: string | null;
}

const STORAGE_KEY = '@safnora_user_profile';

let AsyncStorageModule: any = null;

// Dynamic import for AsyncStorage on native platforms
try {
  if (Platform.OS !== 'web') {
    AsyncStorageModule = require('@react-native-async-storage/async-storage').default;
  }
} catch (e) {
  console.warn('AsyncStorage fallback to web storage:', e);
}

export const saveUserProfileToStorage = async (data: UserProfileData): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(data);
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, jsonValue);
      }
    } else if (AsyncStorageModule) {
      await AsyncStorageModule.setItem(STORAGE_KEY, jsonValue);
    }
  } catch (e) {
    console.error('Error saving user profile to storage:', e);
  }
};

export const getUserProfileFromStorage = async (): Promise<UserProfileData | null> => {
  try {
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined' && window.localStorage) {
        const jsonValue = window.localStorage.getItem(STORAGE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      }
    } else if (AsyncStorageModule) {
      const jsonValue = await AsyncStorageModule.getItem(STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    }
  } catch (e) {
    console.error('Error reading user profile from storage:', e);
  }
  return null;
};

export const clearUserProfileFromStorage = async (): Promise<void> => {
  try {
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } else if (AsyncStorageModule) {
      await AsyncStorageModule.removeItem(STORAGE_KEY);
    }
  } catch (e) {
    console.error('Error clearing user profile from storage:', e);
  }
};
