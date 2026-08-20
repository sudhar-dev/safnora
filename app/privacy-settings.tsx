import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@/context/ThemeContext';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';

export default function PrivacySettingsScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();

  const [locationSharing, setLocationSharing] = useState(true);
  const [contactsSync, setContactsSync] = useState(true);
  const [profileSearchable, setProfileSearchable] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);

  const handleExportData = () => {
    Alert.alert('Data Exported', 'A download link for your SAFNORA trip data has been sent to your email.');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { backgroundColor: colors.surfaceSubtle }]}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Privacy & Permissions</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>PRIVACY CONTROLS</Text>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.settingRow}>
            <View style={styles.textCol}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>Live Location Sharing</Text>
              <Text style={[styles.settingSub, { color: colors.textSecondary }]}>Share real-time GPS location during active group trips</Text>
            </View>
            <Switch
              value={locationSharing}
              onValueChange={setLocationSharing}
              trackColor={{ false: '#CBD5E1', true: '#00A896' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.settingRow}>
            <View style={styles.textCol}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>Profile Discoverability</Text>
              <Text style={[styles.settingSub, { color: colors.textSecondary }]}>Allow friends to search you by phone number</Text>
            </View>
            <Switch
              value={profileSearchable}
              onValueChange={setProfileSearchable}
              trackColor={{ false: '#CBD5E1', true: '#00A896' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.settingRow}>
            <View style={styles.textCol}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>Activity Read Receipts</Text>
              <Text style={[styles.settingSub, { color: colors.textSecondary }]}>Let trip companions see when you view itinerary updates</Text>
            </View>
            <Switch
              value={readReceipts}
              onValueChange={setReadReceipts}
              trackColor={{ false: '#CBD5E1', true: '#00A896' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <Text style={[styles.sectionHeader, { color: colors.textSecondary, marginTop: 24 }]}>APP PERMISSIONS</Text>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.settingRow}>
            <View style={styles.textCol}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>Contacts Access</Text>
              <Text style={[styles.settingSub, { color: colors.textSecondary }]}>Sync address book to easily invite friends</Text>
            </View>
            <Switch
              value={contactsSync}
              onValueChange={setContactsSync}
              trackColor={{ false: '#CBD5E1', true: '#00A896' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <TouchableOpacity style={styles.actionRow} onPress={handleExportData}>
            <View style={styles.textCol}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>Download My Data Archive</Text>
              <Text style={[styles.settingSub, { color: colors.textSecondary }]}>Export a JSON copy of all saved trips and expenses</Text>
            </View>
            <Feather name="download" size={18} color="#00A896" />
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '800' },
  scrollContent: { padding: 20 },
  sectionHeader: { fontSize: 12, fontWeight: '800', marginBottom: 10, letterSpacing: 0.8 },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  textCol: { flex: 1, marginRight: 16 },
  settingTitle: { fontSize: 15, fontWeight: '700' },
  settingSub: { fontSize: 12, marginTop: 2 },
  divider: { height: 1 },
});
