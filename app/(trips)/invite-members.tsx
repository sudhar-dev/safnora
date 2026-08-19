import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@/context/ThemeContext';
import Feather from '@expo/vector-icons/Feather';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getTripsFromStorage, saveTripToStorage } from '@/utils/storage';

export interface FriendContact {
  id: string;
  name: string;
  phone: string;
  selected: boolean;
}

export default function InviteMembersScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();
  const { tripId } = useLocalSearchParams<{ tripId?: string }>();

  const [customInput, setCustomInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [friendsList, setFriendsList] = useState<FriendContact[]>([
    { id: '1', name: 'Arun Kumar', phone: '+91 98765 11111', selected: false },
    { id: '2', name: 'Kavya Sharma', phone: '+91 98765 22222', selected: false },
    { id: '3', name: 'Praveen Raj', phone: '+91 98765 33333', selected: false },
    { id: '4', name: 'Ananya Verma', phone: '+91 98765 44444', selected: false },
    { id: '5', name: 'Siddharth Roy', phone: '+91 98765 55555', selected: false },
  ]);

  const toggleSelectFriend = (id: string) => {
    setFriendsList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const selectedCount = friendsList.filter((f) => f.selected).length;

  const handleAddSelected = async () => {
    if (tripId) {
      const trips = await getTripsFromStorage();
      const current = trips.find((t) => t.id === tripId);
      if (current) {
        const addedNumber = selectedCount + (customInput.trim() ? 1 : 0);
        const updated = {
          ...current,
          members: (current.members || 1) + Math.max(1, addedNumber),
        };
        await saveTripToStorage(updated);
      }
    }
    router.back();
  };

  const handleShareInviteLink = async () => {
    try {
      await Share.share({
        message: 'Join our collaborative group trip on SAFNORA! Download: https://safnora.com/invite',
        title: 'Invite to SAFNORA Trip',
      });
    } catch (e) {
      console.warn(e);
    }
  };

  const filteredFriends = friendsList.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.phone.includes(searchQuery)
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { backgroundColor: colors.surfaceSubtle }]}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerTextWrapper}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Invite Trip Members</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Add companions to your trip workspace</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Quick Share Link Banner */}
        <View style={[styles.shareCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.shareIconWrapper}>
            <Feather name="link-2" size={20} color="#00A896" />
          </View>
          <View style={styles.shareTextWrapper}>
            <Text style={[styles.shareTitle, { color: colors.text }]}>Share Trip Invite Link</Text>
            <Text style={[styles.shareSubtitle, { color: colors.textSecondary }]}>Anyone with the link can join</Text>
          </View>
          <TouchableOpacity style={styles.shareLinkButton} onPress={handleShareInviteLink} activeOpacity={0.8}>
            <Feather name="share-2" size={14} color="#FFFFFF" style={{ marginRight: 4 }} />
            <Text style={styles.shareLinkText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* Add by Email / Phone Direct Form */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Add by Email or Phone</Text>
        <View style={[styles.directAddCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <TextInput
            style={[styles.directInput, { color: colors.text }]}
            placeholder="Enter friend's email or phone number..."
            placeholderTextColor={colors.textMuted}
            value={customInput}
            onChangeText={setCustomInput}
          />
        </View>

        {/* Search Contacts List */}
        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 20 }]}>Select from SAFNORA Friends</Text>
        <View style={[styles.searchWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Feather name="search" size={18} color={colors.textMuted} style={{ marginRight: 10 }} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search friends..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Friends Selector List */}
        <View style={[styles.listCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {filteredFriends.map((friend, idx) => (
            <TouchableOpacity
              key={friend.id}
              style={[
                styles.friendRow,
                idx < filteredFriends.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
              ]}
              onPress={() => toggleSelectFriend(friend.id)}
              activeOpacity={0.8}
            >
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>{friend.name[0]}</Text>
              </View>

              <View style={styles.friendInfo}>
                <Text style={[styles.friendName, { color: colors.text }]}>{friend.name}</Text>
                <Text style={[styles.friendPhone, { color: colors.textSecondary }]}>{friend.phone}</Text>
              </View>

              <View style={[styles.checkbox, friend.selected && styles.checkboxSelected]}>
                {friend.selected ? <Feather name="check" size={14} color="#FFFFFF" /> : null}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Fixed Bottom Confirmation Bar */}
      <View style={[styles.bottomBar, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleAddSelected} activeOpacity={0.85}>
          <Feather name="user-plus" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.confirmButtonText}>
            Add {selectedCount > 0 ? `${selectedCount} Selected` : 'Members'} to Trip
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTextWrapper: { flex: 1 },
  headerTitle: { fontSize: 18, fontWeight: '800' },
  headerSubtitle: { fontSize: 12, marginTop: 1 },
  scrollContent: { padding: 20, paddingBottom: 100 },
  shareCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  shareIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF6F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  shareTextWrapper: { flex: 1 },
  shareTitle: { fontSize: 14, fontWeight: '700' },
  shareSubtitle: { fontSize: 12, marginTop: 1 },
  shareLinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00A896',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 18,
  },
  shareLinkText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  sectionTitle: { fontSize: 15, fontWeight: '700', marginBottom: 10 },
  directAddCard: {
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    height: 50,
    justifyContent: 'center',
    marginBottom: 10,
  },
  directInput: { fontSize: 14 },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  searchInput: { flex: 1, fontSize: 14 },
  listCard: {
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 14,
  },
  friendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00A896',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
  friendInfo: { flex: 1 },
  friendName: { fontSize: 15, fontWeight: '700' },
  friendPhone: { fontSize: 12, marginTop: 2 },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#94A3B8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#00A896',
    borderColor: '#00A896',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
  },
  confirmButton: {
    height: 52,
    borderRadius: 26,
    backgroundColor: '#00A896',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00A896',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmButtonText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
});
