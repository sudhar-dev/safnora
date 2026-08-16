import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@/context/ThemeContext';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';

export default function AddTabScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();

  const options = [
    { title: 'Create New Trip', subtitle: 'Start planning a new group journey', icon: 'map-pin', route: '/(trips)/add-trip', color: '#00A896' },
    { title: 'Add Expense', subtitle: 'Record shared costs and split balances', icon: 'dollar-sign', route: '/(trips)/calculator', color: '#F59E0B' },
    { title: 'Upload Memory', subtitle: 'Share photos and notes with your trip group', icon: 'image', route: '/(tabs)/memories', color: '#10B981' },
    { title: 'Save Destination', subtitle: 'Add places to your wishlist or itinerary', icon: 'compass', route: '/(tabs)/trips', color: '#6366F1' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Create & Add</Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>What would you like to add to SAFNORA today?</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {options.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.optionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => router.push(item.route as any)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconWrapper, { backgroundColor: item.color + '15' }]}>
              <Feather name={item.icon as any} size={24} color={item.color} />
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.optionTitle, { color: colors.text }]}>{item.title}</Text>
              <Text style={[styles.optionSubtitle, { color: colors.textSecondary }]}>{item.subtitle}</Text>
            </View>
            <Feather name="chevron-right" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  headerTitle: { fontSize: 24, fontWeight: '800', marginBottom: 4 },
  headerSubtitle: { fontSize: 14 },
  scrollContent: { padding: 20 },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 14,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  textContainer: { flex: 1 },
  optionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 2 },
  optionSubtitle: { fontSize: 13 },
});
