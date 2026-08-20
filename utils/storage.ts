import { Platform } from "react-native";

export interface UserProfileData {
  uid: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  bio?: string;
  role?: string;
  avatarUrl?: string | null;
}

export interface TripData {
  id: string;
  title: string;
  startingPoint?: string;
  destination: string;
  startDate?: string;
  endDate?: string;
  dates?: string;
  description?: string;
  status: "Planning" | "Ready" | "Active" | "Completed";
  members: number;
  statusColor?: string;
  createdAt?: string;
}

const STORAGE_KEY = "@safnora_user_profile";
const TRIPS_STORAGE_KEY = "@safnora_trips";

let AsyncStorageModule: any = null;

// Dynamic import for AsyncStorage on native platforms
try {
  if (Platform.OS !== "web") {
    AsyncStorageModule =
      require("@react-native-async-storage/async-storage").default;
  }
} catch (e) {
  console.warn("AsyncStorage fallback to web storage:", e);
}

export const saveUserProfileToStorage = async (
  data: UserProfileData,
): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(data);
    if (Platform.OS === "web") {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, jsonValue);
      }
    } else if (AsyncStorageModule) {
      await AsyncStorageModule.setItem(STORAGE_KEY, jsonValue);
    }
  } catch (e) {
    console.error("Error saving user profile to storage:", e);
  }
};

export const getUserProfileFromStorage =
  async (): Promise<UserProfileData | null> => {
    try {
      if (Platform.OS === "web") {
        if (typeof window !== "undefined" && window.localStorage) {
          const jsonValue = window.localStorage.getItem(STORAGE_KEY);
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        }
      } else if (AsyncStorageModule) {
        const jsonValue = await AsyncStorageModule.getItem(STORAGE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      }
    } catch (e) {
      console.error("Error reading user profile from storage:", e);
    }
    return null;
  };

export const clearUserProfileFromStorage = async (): Promise<void> => {
  try {
    if (Platform.OS === "web") {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } else if (AsyncStorageModule) {
      await AsyncStorageModule.removeItem(STORAGE_KEY);
    }
  } catch (e) {
    console.error("Error clearing user profile from storage:", e);
  }
};

/* Dynamic Trip Storage Helpers */

export const getTripsFromStorage = async (): Promise<TripData[]> => {
  try {
    if (Platform.OS === "web") {
      if (typeof window !== "undefined" && window.localStorage) {
        const jsonValue = window.localStorage.getItem(TRIPS_STORAGE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
      }
    } else if (AsyncStorageModule) {
      const jsonValue = await AsyncStorageModule.getItem(TRIPS_STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    }
  } catch (e) {
    console.error("Error reading trips from storage:", e);
  }
  return [];
};

export const saveTripToStorage = async (
  newTrip: TripData,
): Promise<TripData[]> => {
  try {
    const existingTrips = await getTripsFromStorage();
    const updatedTrips = [newTrip, ...existingTrips];
    const jsonValue = JSON.stringify(updatedTrips);
    if (Platform.OS === "web") {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(TRIPS_STORAGE_KEY, jsonValue);
      }
    } else if (AsyncStorageModule) {
      await AsyncStorageModule.setItem(TRIPS_STORAGE_KEY, jsonValue);
    }
    return updatedTrips;
  } catch (e) {
    console.error("Error saving trip to storage:", e);
    return [];
  }
};

export const deleteTripFromStorage = async (
  id: string,
): Promise<TripData[]> => {
  try {
    const existingTrips = await getTripsFromStorage();
    const updatedTrips = existingTrips.filter((t) => t.id !== id);
    const jsonValue = JSON.stringify(updatedTrips);
    if (Platform.OS === "web") {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(TRIPS_STORAGE_KEY, jsonValue);
      }
    } else if (AsyncStorageModule) {
      await AsyncStorageModule.setItem(TRIPS_STORAGE_KEY, jsonValue);
    }
    return updatedTrips;
  } catch (e) {
    console.error("Error deleting trip from storage:", e);
    return [];
  }
};
