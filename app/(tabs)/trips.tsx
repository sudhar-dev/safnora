import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@/context/ThemeContext';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';

export default function TripsTabScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();

  const mockTrips = [
    {
      id: '1',
      title: 'Athirapally & Valparai Gateway',
      destination: 'Valparai, Kerala',
      dates: 'Aug 24 - Aug 28, 2026',
      status: 'Active',
      members: 8,
      statusColor: '#10B981',
    },
    {
      id: '2',
      title: 'Goa Coastal Exploration',
      destination: 'North Goa',
      dates: 'Sep 15 - Sep 20, 2026',
      status: 'Planning',
      members: 5,
      statusColor: '#00A896',
    },
    {
      id: '3',
      title: 'Munnar Tea Gardens Escape',
      destination: 'Munnar',
      dates: 'Jun 10 - Jun 14, 2026',
      status: 'Completed',
      members: 6,
      statusColor: '#64748B',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>My Trips</Text>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/(trips)/add-trip' as any)}
          activeOpacity={0.8}
        >
          <Feather name="plus" size={18} color="#FFFFFF" />
          <Text style={styles.addButtonText}>New Trip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {mockTrips.map((trip) => (
          <TouchableOpacity
            key={trip.id}
            style={[styles.tripCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
            activeOpacity={0.7}
          >
            <View style={styles.cardHeader}>
              <View>
                <Text style={[styles.tripTitle, { color: colors.text }]}>{trip.title}</Text>
                <View style={styles.locationRow}>
                  <Feather name="map-pin" size={14} color={colors.textSecondary} style={{ marginRight: 4 }} />
                  <Text style={[styles.locationText, { color: colors.textSecondary }]}>{trip.destination}</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: trip.statusColor + '20' }]}>
                <Text style={[styles.statusText, { color: trip.statusColor }]}>{trip.status}</Text>
              </View>
            </View>

            <View style={styles.cardFooter}>
              <View style={styles.footerInfo}>
                <Feather name="calendar" size={14} color={colors.textMuted} style={{ marginRight: 4 }} />
                <Text style={[styles.footerText, { color: colors.textSecondary }]}>{trip.dates}</Text>
              </View>
              <View style={styles.footerInfo}>
                <Feather name="users" size={14} color={colors.textMuted} style={{ marginRight: 4 }} />
                <Text style={[styles.footerText, { color: colors.textSecondary }]}>{trip.members} members</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
    paddingVertical: 16,
  },
  headerTitle: { fontSize: 24, fontWeight: '800' },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  addButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13, marginLeft: 4 },
  scrollContent: { padding: 20 },
  tripCard: {
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  tripTitle: { fontSize: 17, fontWeight: '700', marginBottom: 4 },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  locationText: { fontSize: 13 },
  statusBadge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: '700' },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  footerInfo: { flexDirection: 'row', alignItems: 'center' },
  footerText: { fontSize: 13 },
});
