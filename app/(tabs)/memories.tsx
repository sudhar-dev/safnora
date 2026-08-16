import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@/context/ThemeContext';
import Feather from '@expo/vector-icons/Feather';

export default function MemoriesTabScreen() {
  const { colors } = useAppTheme();

  const mockMemories = [
    {
      id: '1',
      trip: 'Athirapally Gateway',
      author: 'Arun Kumar',
      time: '2 hours ago',
      location: 'Athirapally Waterfalls',
      note: 'Stunning waterfall view after a morning hike with the whole group! 🌊',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '2',
      trip: 'Valparai Hills',
      author: 'Thiru Arasu',
      time: 'Yesterday',
      location: 'Valparai Tea Estates',
      note: 'Tea plantation sunset with cloudy skies! 🌄',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Trip Memories</Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Not "My Photos" — Our Shared Journey</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {mockMemories.map((mem) => (
          <View
            key={mem.id}
            style={[styles.memoryCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
          >
            <View style={styles.authorRow}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>{mem.author[0]}</Text>
              </View>
              <View style={styles.authorInfo}>
                <Text style={[styles.authorName, { color: colors.text }]}>{mem.author}</Text>
                <Text style={[styles.tripMeta, { color: colors.textSecondary }]}>
                  {mem.trip} • {mem.time}
                </Text>
              </View>
            </View>

            <Image source={{ uri: mem.image }} style={styles.memoryImage} />

            <View style={styles.memoryFooter}>
              <View style={styles.locationTag}>
                <Feather name="map-pin" size={13} color="#00A896" style={{ marginRight: 4 }} />
                <Text style={styles.locationText}>{mem.location}</Text>
              </View>
              <Text style={[styles.noteText, { color: colors.text }]}>{mem.note}</Text>
            </View>
          </View>
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
  memoryCard: {
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
    overflow: 'hidden',
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#00A896',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
  authorInfo: { flex: 1 },
  authorName: { fontSize: 14, fontWeight: '700' },
  tripMeta: { fontSize: 12, marginTop: 1 },
  memoryImage: { width: '100%', height: 220 },
  memoryFooter: { padding: 14 },
  locationTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  locationText: { fontSize: 12, fontWeight: '700', color: '#00A896' },
  noteText: { fontSize: 14, lineHeight: 20 },
});
