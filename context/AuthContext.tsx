import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfileData,
  saveUserProfileToStorage,
  getUserProfileFromStorage,
  clearUserProfileFromStorage,
} from '@/utils/storage';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
  bio?: string;
  role?: string;
  photoURL?: string | null;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  signIn: (email: string, name?: string) => Promise<void>;
  signUp: (email: string, name: string) => Promise<void>;
  updateProfile: (updatedData: Partial<UserProfile>) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: async () => {},
  signUp: async () => {},
  updateProfile: async () => {},
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Restore user profile from storage on app launch
  useEffect(() => {
    async function loadStoredUser() {
      try {
        const storedData = await getUserProfileFromStorage();
        if (storedData) {
          setUser({
            uid: storedData.uid,
            email: storedData.email,
            displayName: storedData.fullName || storedData.email.split('@')[0],
            phoneNumber: storedData.phoneNumber || '+91 98765 43210',
            bio: storedData.bio || 'Passionate group trip explorer & photographer 🏔️',
            role: storedData.role || 'Trip Lead Explorer',
            photoURL: storedData.avatarUrl || null,
          });
        }
      } catch (e) {
        console.warn('Error loading stored user:', e);
      } finally {
        setIsLoading(false);
      }
    }

    loadStoredUser();
  }, []);

  const signIn = async (email: string, name?: string) => {
    setIsLoading(true);
    const existing = await getUserProfileFromStorage();
    const displayName = name || existing?.fullName || email.split('@')[0];

    const profile: UserProfile = {
      uid: existing?.uid || 'user_' + Date.now(),
      email,
      displayName,
      phoneNumber: existing?.phoneNumber || '+91 98765 43210',
      bio: existing?.bio || 'Passionate group trip explorer & photographer 🏔️',
      role: existing?.role || 'Trip Lead Explorer',
      photoURL: existing?.avatarUrl || null,
    };

    setUser(profile);

    await saveUserProfileToStorage({
      uid: profile.uid,
      fullName: profile.displayName,
      email: profile.email,
      phoneNumber: profile.phoneNumber,
      bio: profile.bio,
      role: profile.role,
      avatarUrl: profile.photoURL,
    });

    setIsLoading(false);
  };

  const signUp = async (email: string, name: string) => {
    setIsLoading(true);
    const profile: UserProfile = {
      uid: 'user_' + Date.now(),
      email,
      displayName: name,
      phoneNumber: '+91 98765 43210',
      bio: 'Passionate group trip explorer & photographer 🏔️',
      role: 'Trip Lead Explorer',
      photoURL: null,
    };

    setUser(profile);

    await saveUserProfileToStorage({
      uid: profile.uid,
      fullName: profile.displayName,
      email: profile.email,
      phoneNumber: profile.phoneNumber,
      bio: profile.bio,
      role: profile.role,
      avatarUrl: profile.photoURL,
    });

    setIsLoading(false);
  };

  const updateProfile = async (updatedData: Partial<UserProfile>) => {
    if (!user) return;
    const updatedUser: UserProfile = {
      ...user,
      ...updatedData,
    };

    setUser(updatedUser);

    await saveUserProfileToStorage({
      uid: updatedUser.uid,
      fullName: updatedUser.displayName,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      bio: updatedUser.bio,
      role: updatedUser.role,
      avatarUrl: updatedUser.photoURL,
    });
  };

  const signOut = async () => {
    setIsLoading(true);
    await clearUserProfileFromStorage();
    setUser(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, updateProfile, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
