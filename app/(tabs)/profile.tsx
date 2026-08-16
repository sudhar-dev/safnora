import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';

export default function ProfileTabScreen() {
  const { colors, colorScheme, toggleTheme } = useAppTheme();
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <View style={[styles.userCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarTextLarge}>{user?.displayName ? user.displayName[0].toUpperCase() : 'U'}</Text>
          </View>
          <Text style={[styles.userName, { color: colors.text }]}>{user?.displayName || 'Travel Enthusiast'}</Text>
          <Text style={[styles.userEmail, { color: colors.textSecondary }]}>{user?.email || 'user@safnora.com'}</Text>

          {/* Stats Bar */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>3</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Trips</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>12</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Places</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>48</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Memories</Text>
            </View>
          </View>
        </View>

        {/* Settings Menu */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences & Settings</Text>

        <View style={[styles.menuCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.menuRow}>
            <View style={styles.menuLeft}>
              <Feather name={colorScheme === 'dark' ? 'moon' : 'sun'} size={20} color="#00A896" style={{ marginRight: 12 }} />
              <Text style={[styles.menuText, { color: colors.text }]}>Dark Theme</Text>
            </View>
            <Switch
              value={colorScheme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: '#CBD5E1', true: '#00A896' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>
            <View style={styles.menuLeft}>
              <Feather name="bell" size={20} color="#00A896" style={{ marginRight: 12 }} />
              <Text style={[styles.menuText, { color: colors.text }]}>Notifications</Text>
            </View>
            <Feather name="chevron-right" size={20} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>
            <View style={styles.menuLeft}>
              <Feather name="shield" size={20} color="#00A896" style={{ marginRight: 12 }} />
              <Text style={[styles.menuText, { color: colors.text }]}>Privacy & Safety</Text>
            </View>
            <Feather name="chevron-right" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut} activeOpacity={0.8}>
          <Feather name="log-out" size={18} color="#EF4444" style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20 },
  userCard: {
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarLarge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#00A896',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarTextLarge: { color: '#FFFFFF', fontWeight: '800', fontSize: 28 },
  userName: { fontSize: 20, fontWeight: '800', marginBottom: 2 },
  userEmail: { fontSize: 13, marginBottom: 20 },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: '800' },
  statLabel: { fontSize: 12, marginTop: 2 },
  statDivider: { width: 1, height: 24, backgroundColor: '#E2E8F0' },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  menuCard: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center' },
  menuText: { fontSize: 15, fontWeight: '600' },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FEE2E2',
  },
  logoutText: { color: '#EF4444', fontWeight: '700', fontSize: 15 },
});
