import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';

export default function EditProfileScreen() {
  const { colors } = useAppTheme();
  const { user } = useAuth();
  const router = useRouter();

  const [displayName, setDisplayName] = useState(user?.displayName || 'Thiru Arasu');
  const [phoneNumber, setPhoneNumber] = useState('+91 98765 43210');
  const [bio, setBio] = useState('Passionate group trip explorer & photographer 🏔️✈️');

  const handleSave = () => {
    // Save profile logic
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveHeaderButton}>
          <Text style={styles.saveHeaderText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Avatar Picker Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarLarge}>
              <Text style={styles.avatarTextLarge}>
                {displayName ? displayName[0].toUpperCase() : 'U'}
              </Text>
            </View>
            <TouchableOpacity style={styles.cameraBadge} activeOpacity={0.8}>
              <Feather name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={[styles.changePhotoText, { color: colors.primary }]}>Change Profile Photo</Text>
        </View>

        {/* Input Fields */}
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Full Name</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
            value={displayName}
            onChangeText={setDisplayName}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Email Address</Text>
          <TextInput
            style={[styles.input, styles.disabledInput, { backgroundColor: colors.surfaceSubtle, color: colors.textMuted, borderColor: colors.border }]}
            value={user?.email || 'user@safnora.com'}
            editable={false}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Phone Number</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Travel Bio</Text>
          <TextInput
            style={[styles.textArea, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
            value={bio}
            onChangeText={setBio}
            multiline
            numberOfLines={3}
          />
        </View>

        <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.primary }]} onPress={handleSave}>
          <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  saveHeaderButton: { paddingHorizontal: 12, paddingVertical: 4 },
  saveHeaderText: { color: '#00A896', fontWeight: '700', fontSize: 15 },
  scrollContent: { padding: 20 },
  avatarSection: { alignItems: 'center', marginBottom: 28 },
  avatarWrapper: { position: 'relative', marginBottom: 8 },
  avatarLarge: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#00A896',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarTextLarge: { color: '#FFFFFF', fontWeight: '800', fontSize: 32 },
  cameraBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#00A896',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePhotoText: { fontSize: 13, fontWeight: '700' },
  formGroup: { marginBottom: 18 },
  label: { fontSize: 13, fontWeight: '700', marginBottom: 6 },
  input: { height: 50, borderRadius: 14, borderWidth: 1, paddingHorizontal: 16, fontSize: 15 },
  disabledInput: { opacity: 0.7 },
  textArea: { height: 90, borderRadius: 14, borderWidth: 1, padding: 14, fontSize: 15, textAlignVertical: 'top' },
  saveButton: {
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#00A896',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15, letterSpacing: 1 },
});
