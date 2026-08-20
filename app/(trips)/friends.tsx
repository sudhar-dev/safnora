import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Share,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "@/context/ThemeContext";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";

export interface ContactUser {
  id: string;
  name: string;
  phone: string;
  isRegistered: boolean;
  isFriend: boolean;
  avatarColor: string;
}

export default function FriendsScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [contacts, setContacts] = useState<ContactUser[]>([
    {
      id: "1",
      name: "Arun Kumar",
      phone: "+91 98765 11111",
      isRegistered: true,
      isFriend: true,
      avatarColor: "#00A896",
    },
    {
      id: "2",
      name: "Kavya Sharma",
      phone: "+91 98765 22222",
      isRegistered: true,
      isFriend: false,
      avatarColor: "#6366F1",
    },
    {
      id: "3",
      name: "Praveen Raj",
      phone: "+91 98765 33333",
      isRegistered: true,
      isFriend: false,
      avatarColor: "#10B981",
    },
    {
      id: "4",
      name: "Deepak Nathan",
      phone: "+91 98765 44444",
      isRegistered: false,
      isFriend: false,
      avatarColor: "#F59E0B",
    },
    {
      id: "5",
      name: "Ananya Verma",
      phone: "+91 98765 55555",
      isRegistered: false,
      isFriend: false,
      avatarColor: "#EC4899",
    },
    {
      id: "6",
      name: "Siddharth Roy",
      phone: "+91 98765 66666",
      isRegistered: false,
      isFriend: false,
      avatarColor: "#8B5CF6",
    },
  ]);

  const inviteCode = "SAFNORA-TRIP-789";

  const handleShareInvite = async (personName?: string) => {
    try {
      const message = personName
        ? `Hey ${personName}! Join me on SAFNORA to plan collaborative group trips & split expenses together! Download: https://safnora.com/download?ref=${inviteCode}`
        : `Join me on SAFNORA to plan collaborative group trips & split expenses together! Download: https://safnora.com/download?ref=${inviteCode}`;

      await Share.share({
        message,
        title: "Invite to SAFNORA",
      });
    } catch (e) {
      console.warn("Share error:", e);
    }
  };

  const toggleFriendship = (id: string) => {
    setContacts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFriend: !item.isFriend } : item,
      ),
    );
  };

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery),
  );

  const registeredUsers = filteredContacts.filter((c) => c.isRegistered);
  const nonRegisteredUsers = filteredContacts.filter((c) => !c.isRegistered);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Top Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.backButton, { backgroundColor: colors.surfaceSubtle }]}
        >
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerTextWrapper}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Friends & Contacts
          </Text>
          <Text
            style={[styles.headerSubtitle, { color: colors.textSecondary }]}
          >
            Connect & invite trip companions
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Share Referral Banner */}
        <View
          style={[
            styles.referralCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.referralIconWrapper}>
            <Feather name="gift" size={24} color="#00A896" />
          </View>
          <View style={styles.referralTextWrapper}>
            <Text style={[styles.referralTitle, { color: colors.text }]}>
              Invite Friends to SAFNORA
            </Text>
            <Text
              style={[styles.referralSubtitle, { color: colors.textSecondary }]}
            >
              Invite buddies using your code:{" "}
              <Text style={styles.codeHighlight}>{inviteCode}</Text>
            </Text>
          </View>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => handleShareInvite()}
            activeOpacity={0.8}
          >
            <Feather
              name="share-2"
              size={16}
              color="#FFFFFF"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.shareButtonText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* Search Input */}
        <View
          style={[
            styles.searchWrapper,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Feather
            name="search"
            size={18}
            color={colors.textMuted}
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search name or phone number..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Feather name="x" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Section 1: Registered SAFNORA Users */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Friends on SAFNORA ({registeredUsers.length})
        </Text>
        <Text style={[styles.sectionCaption, { color: colors.textSecondary }]}>
          People from your contacts who have installed SAFNORA
        </Text>

        <View
          style={[
            styles.listCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          {registeredUsers.map((item, idx) => (
            <View
              key={item.id}
              style={[
                styles.contactRow,
                idx < registeredUsers.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                },
              ]}
            >
              <View
                style={[
                  styles.avatarCircle,
                  { backgroundColor: item.avatarColor },
                ]}
              >
                <Text style={styles.avatarText}>{item.name[0]}</Text>
              </View>

              <View style={styles.contactInfo}>
                <Text style={[styles.contactName, { color: colors.text }]}>
                  {item.name}
                </Text>
                <Text
                  style={[styles.contactPhone, { color: colors.textSecondary }]}
                >
                  {item.phone}
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.actionButton,
                  item.isFriend
                    ? styles.friendAddedButton
                    : styles.addFriendButton,
                ]}
                onPress={() => toggleFriendship(item.id)}
                activeOpacity={0.8}
              >
                <Feather
                  name={item.isFriend ? "check" : "user-plus"}
                  size={14}
                  color={item.isFriend ? "#10B981" : "#FFFFFF"}
                  style={{ marginRight: 4 }}
                />
                <Text
                  style={
                    item.isFriend
                      ? styles.friendAddedText
                      : styles.addFriendText
                  }
                >
                  {item.isFriend ? "Added" : "Add Friend"}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Section 2: Non-registered Contacts (Invite Required) */}
        <Text
          style={[styles.sectionTitle, { color: colors.text, marginTop: 24 }]}
        >
          Invite Contacts to SAFNORA ({nonRegisteredUsers.length})
        </Text>
        <Text style={[styles.sectionCaption, { color: colors.textSecondary }]}>
          Contacts who haven&apos;t installed the app yet
        </Text>

        <View
          style={[
            styles.listCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          {nonRegisteredUsers.map((item, idx) => (
            <View
              key={item.id}
              style={[
                styles.contactRow,
                idx < nonRegisteredUsers.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                },
              ]}
            >
              <View
                style={[
                  styles.avatarCircle,
                  { backgroundColor: item.avatarColor },
                ]}
              >
                <Text style={styles.avatarText}>{item.name[0]}</Text>
              </View>

              <View style={styles.contactInfo}>
                <Text style={[styles.contactName, { color: colors.text }]}>
                  {item.name}
                </Text>
                <Text
                  style={[styles.contactPhone, { color: colors.textSecondary }]}
                >
                  {item.phone}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.inviteButton}
                onPress={() => handleShareInvite(item.name)}
                activeOpacity={0.8}
              >
                <Feather
                  name="send"
                  size={13}
                  color="#00A896"
                  style={{ marginRight: 4 }}
                />
                <Text style={styles.inviteText}>Invite</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerTextWrapper: { flex: 1 },
  headerTitle: { fontSize: 18, fontWeight: "800" },
  headerSubtitle: { fontSize: 12, marginTop: 1 },
  scrollContent: { padding: 20 },
  referralCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 18,
  },
  referralIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EEF6F8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  referralTextWrapper: { flex: 1 },
  referralTitle: { fontSize: 14, fontWeight: "700" },
  referralSubtitle: { fontSize: 12, marginTop: 2 },
  codeHighlight: { fontWeight: "800", color: "#00A896" },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00A896",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 18,
  },
  shareButtonText: { color: "#FFFFFF", fontWeight: "700", fontSize: 13 },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  searchInput: { flex: 1, fontSize: 14 },
  sectionTitle: { fontSize: 16, fontWeight: "700" },
  sectionCaption: { fontSize: 12, marginTop: 2, marginBottom: 12 },
  listCard: {
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 14,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  avatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: { color: "#FFFFFF", fontWeight: "800", fontSize: 16 },
  contactInfo: { flex: 1 },
  contactName: { fontSize: 15, fontWeight: "700" },
  contactPhone: { fontSize: 12, marginTop: 2 },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  addFriendButton: { backgroundColor: "#00A896" },
  addFriendText: { color: "#FFFFFF", fontWeight: "700", fontSize: 12 },
  friendAddedButton: {
    backgroundColor: "#E1F8F2",
    borderWidth: 1,
    borderColor: "#10B981",
  },
  friendAddedText: { color: "#10B981", fontWeight: "700", fontSize: 12 },
  inviteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF6F8",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#00A896",
  },
  inviteText: { color: "#00A896", fontWeight: "700", fontSize: 12 },
});
