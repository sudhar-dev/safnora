import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@/context/ThemeContext';
import { SAFNORA_BRAND } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();

  const quickActions = [
    { title: 'Create Trip', icon: 'plus.circle.fill', route: '/(trips)/add-trip', color: '#0284C7' },
    { title: 'Explore Places', icon: 'paperplane.fill', route: '/(tabs)/explore', color: '#6366F1' },
    { title: 'Trip Memories', icon: 'photo.fill', route: '/(tabs)/explore', color: '#10B981' },
    { title: 'Expenses', icon: 'banknote.fill', route: '/(trips)/calculator', color: '#F59E0B' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Hero Branding Header */}
        <View style={[styles.heroCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.heroHeader}>
            <Image
              source={require('@/assets/images/splash-icon.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <View style={styles.heroTextContainer}>
              <Text style={[styles.brandTitle, { color: colors.text }]}>{SAFNORA_BRAND.name}</Text>
              <Text style={[styles.brandTagline, { color: colors.tint }]}>{SAFNORA_BRAND.tagline}</Text>
            </View>
          </View>
          <Text style={[styles.heroDescription, { color: colors.textSecondary }]}>
            Your all-in-one collaborative trip workspace. Plan itineraries, coordinate group expenses, share memories, and navigate together.
          </Text>
        </View>

        {/* Quick Actions Grid */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.actionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => router.push(action.route as any)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconWrapper, { backgroundColor: action.color + '20' }]}>
                <IconSymbol size={24} name={action.icon as any} color={action.color} />
              </View>
              <Text style={[styles.actionTitle, { color: colors.text }]}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Upcoming Trips Section */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Active & Upcoming Trips</Text>
        <View style={[styles.emptyCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <IconSymbol size={48} name="map.fill" color={colors.textMuted} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>No active trips yet</Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
            Start a new group journey to invite friends, add destinations, and split expenses!
          </Text>
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/(trips)/add-trip' as any)}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>+ Create New Trip</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  heroCard: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 24,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoImage: {
    width: 48,
    height: 48,
    marginRight: 12,
  },
  heroTextContainer: {
    flex: 1,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  brandTagline: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  heroDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  actionCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyCard: {
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    textAlign: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 16,
    lineHeight: 18,
  },
  primaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
