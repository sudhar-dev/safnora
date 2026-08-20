import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SectionList,
  Share,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "@/context/ThemeContext";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";

export interface ContactItem {
  id: string;
  name: string;
  phone: string;
  isUser: boolean;
  isFriend: boolean;
  statusText?: string;
}

export interface ContactSection {
  title: string;
  data: ContactItem[];
}

const INITIAL_CONTACTS: ContactSection[] = [
  {
    title: "L",
    data: [
      {
        id: "l1",
        name: "Lokesh Kumar",
        phone: "+91 98765 10001",
        isUser: true,
        isFriend: true,
        statusText: "Ready for Valparai road trip 🚗",
      },
    ],
  },
  {
    title: "N",
    data: [
      {
        id: "n1",
        name: "Naren K.",
        phone: "+91 98765 10002",
        isUser: true,
        isFriend: true,
        statusText: "Outdoor explorer 🌲",
      },
    ],
  },
  {
    title: "P",
    data: [
      {
        id: "p1",
        name: "Pradeep V.",
        phone: "+91 98765 10003",
        isUser: true,
        isFriend: false,
        statusText: "Wanderlust & photography 📸",
      },
    ],
  },
  {
    title: "R",
    data: [
      {
        id: "r1",
        name: "Ruban S.",
        phone: "+91 98765 10004",
        isUser: true,
        isFriend: true,
        statusText: "Beach & coastal enthusiast 🏖️",
      },
    ],
  },
  {
    title: "S",
    data: [
      {
        id: "s1",
        name: "Sudharshan R.",
        phone: "+91 98765 10005",
        isUser: true,
        isFriend: true,
        statusText: "Trip Lead Explorer • SAFNORA",
      },
      {
        id: "s2",
        name: "Suriyah M.",
        phone: "+91 98765 10006",
        isUser: true,
        isFriend: false,
        statusText: "Highland trekking addict 🥾",
      },
      {
        id: "s3",
        name: "Suryan K.",
        phone: "+91 98765 10007",
        isUser: true,
        isFriend: false,
        statusText: "Coorg coffee estate getaway ☕",
      },
    ],
  },
  {
    title: "T",
    data: [
      {
        id: "t1",
        name: "Thakshin S.",
        phone: "+91 98765 10008",
        isUser: true,
        isFriend: true,
        statusText: "Resort & stay planner 🏨",
      },
      {
        id: "t2",
        name: "Tharun G.",
        phone: "+91 98765 10009",
        isUser: true,
        isFriend: false,
        statusText: "Weekend drive ready 🏎️",
      },
    ],
  },
  {
    title: "V",
    data: [
      {
        id: "v1",
        name: "Varun P.",
        phone: "+91 98765 10010",
        isUser: true,
        isFriend: true,
        statusText: "Camping & campfire nights 🔥",
      },
    ],
  },
];

export default function FriendsListTabScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [sections, setSections] = useState<ContactSection[]>(INITIAL_CONTACTS);

  const toggleFriend = (contactId: string) => {
    setSections((prevSections) =>
      prevSections.map((sec) => ({
        ...sec,
        data: sec.data.map((c) =>
          c.id === contactId ? { ...c, isFriend: !c.isFriend } : c,
        ),
      })),
    );
  };

  const handleShareInvite = async (name: string) => {
    try {
      await Share.share({
        message: `Hey ${name}! Join me on SAFNORA to plan trips and split travel expenses. Download here: https://safnora.app/invite`,
        title: "Invite to SAFNORA",
      });
    } catch (e) {
      console.warn(e);
    }
  };

  // Filter sections based on search query
  const filteredSections = sections
    .map((sec) => ({
      ...sec,
      data: sec.data.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.phone.includes(searchQuery),
      ),
    }))
    .filter((sec) => sec.data.length > 0);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* WhatsApp Style Top Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={styles.headerTitleRow}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Friends & Contacts
          </Text>
          <TouchableOpacity
            style={[
              styles.newGroupHeaderButton,
              { backgroundColor: colors.surfaceSubtle },
            ]}
            onPress={() => router.push("/(trips)/add-trip" as any)}
            activeOpacity={0.7}
          >
            <Feather
              name="plus"
              size={18}
              color="#00A896"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.newGroupHeaderText}>New Trip</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          Connect with friends & invite contacts to SAFNORA group trips
        </Text>

        {/* Search Bar */}
        <View
          style={[
            styles.searchContainer,
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
            placeholder="Search contacts by name or phone..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Feather name="x" size={16} color={colors.textMuted} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Alphabetical Inset Section List */}
      <SectionList
        sections={filteredSections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContentContainer}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={
          /* Scrollable Quick Actions Header (New Group Trip & Share Invite Link) */
          <View style={styles.quickBar}>
            <TouchableOpacity
              style={[
                styles.quickBarCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
              onPress={() => router.push("/(trips)/add-trip" as any)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.quickBarIconCircle,
                  { backgroundColor: "#00A89615" },
                ]}
              >
                <Feather name="users" size={20} color="#00A896" />
              </View>
              <View style={styles.quickBarTextCol}>
                <Text style={[styles.quickBarTitle, { color: colors.text }]}>
                  New Group Trip
                </Text>
                <Text
                  style={[styles.quickBarSub, { color: colors.textSecondary }]}
                >
                  Add friends & choose destination
                </Text>
              </View>
              <Feather
                name="chevron-right"
                size={18}
                color={colors.textMuted}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.quickBarCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
              onPress={() => handleShareInvite("Friends")}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.quickBarIconCircle,
                  { backgroundColor: "#6366F115" },
                ]}
              >
                <Feather name="link-2" size={20} color="#6366F1" />
              </View>
              <View style={styles.quickBarTextCol}>
                <Text style={[styles.quickBarTitle, { color: colors.text }]}>
                  Share Invite Link
                </Text>
                <Text
                  style={[styles.quickBarSub, { color: colors.textSecondary }]}
                >
                  Invite anyone via WhatsApp or SMS
                </Text>
              </View>
              <Feather name="share-2" size={16} color="#6366F1" />
            </TouchableOpacity>
          </View>
        }
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        renderItem={({ item, index, section }) => {
          const isLastInGroup = index === section.data.length - 1;
          const initials = item.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .substring(0, 2);

          return (
            <View
              style={[
                styles.insetGroupCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
                !isLastInGroup && styles.itemBorder,
              ]}
            >
              <View style={styles.contactRow}>
                {/* Avatar Initials Badge */}
                <View
                  style={[
                    styles.avatar,
                    item.isUser ? styles.avatarUser : styles.avatarNonOwner,
                  ]}
                >
                  <Text style={styles.avatarText}>{initials}</Text>
                </View>

                {/* Name & Phone Details */}
                <View style={styles.contactInfo}>
                  <View style={styles.nameRow}>
                    <Text style={[styles.contactName, { color: colors.text }]}>
                      {item.name}
                    </Text>
                    {item.isUser ? (
                      <View style={styles.safnoraBadge}>
                        <Text style={styles.safnoraBadgeText}>SAFNORA</Text>
                      </View>
                    ) : null}
                  </View>
                  <Text
                    style={[
                      styles.contactPhone,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {item.phone} {item.statusText ? `• ${item.statusText}` : ""}
                  </Text>
                </View>

                {/* Right Action Button (Added / Add Friend / Invite) */}
                {item.isUser ? (
                  item.isFriend ? (
                    <TouchableOpacity
                      style={styles.addedPill}
                      onPress={() => toggleFriend(item.id)}
                      activeOpacity={0.8}
                    >
                      <Feather
                        name="check"
                        size={14}
                        color="#00A896"
                        style={{ marginRight: 4 }}
                      />
                      <Text style={styles.addedPillText}>Friend</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.addFriendButton}
                      onPress={() => toggleFriend(item.id)}
                      activeOpacity={0.8}
                    >
                      <Feather
                        name="user-plus"
                        size={13}
                        color="#FFFFFF"
                        style={{ marginRight: 4 }}
                      />
                      <Text style={styles.addFriendText}>Add</Text>
                    </TouchableOpacity>
                  )
                ) : (
                  <TouchableOpacity
                    style={styles.inviteButton}
                    onPress={() => handleShareInvite(item.name)}
                    activeOpacity={0.8}
                  >
                    <Feather
                      name="share-2"
                      size={13}
                      color="#6366F1"
                      style={{ marginRight: 4 }}
                    />
                    <Text style={styles.inviteText}>Invite</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  headerTitle: { fontSize: 24, fontWeight: "800" },
  newGroupHeaderButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  newGroupHeaderText: { fontSize: 13, fontWeight: "700", color: "#00A896" },
  headerSubtitle: { fontSize: 13, marginBottom: 14 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
  },
  searchInput: { flex: 1, fontSize: 14 },
  quickBar: {
    paddingTop: 8,
    paddingBottom: 12,
    gap: 10,
  },
  quickBarCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  quickBarIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  quickBarTextCol: { flex: 1 },
  quickBarTitle: { fontSize: 14, fontWeight: "700" },
  quickBarSub: { fontSize: 12, marginTop: 1 },
  listContentContainer: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 40,
  },
  sectionHeaderContainer: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#00A896",
  },
  insetGroupCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    marginBottom: 8,
  },
  itemBorder: {
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarUser: {
    backgroundColor: "#00A896",
  },
  avatarNonOwner: {
    backgroundColor: "#94A3B8",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
  contactInfo: {
    flex: 1,
    marginRight: 8,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  contactName: {
    fontSize: 15,
    fontWeight: "700",
  },
  safnoraBadge: {
    backgroundColor: "#E1F8F2",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  safnoraBadgeText: {
    color: "#00A896",
    fontSize: 10,
    fontWeight: "800",
  },
  contactPhone: {
    fontSize: 12,
    marginTop: 2,
  },
  addedPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E1F8F2",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  addedPillText: {
    color: "#00A896",
    fontSize: 12,
    fontWeight: "700",
  },
  addFriendButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00A896",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
  },
  addFriendText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  inviteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    borderWidth: 1,
    borderColor: "#C7D2FE",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  inviteText: {
    color: "#6366F1",
    fontSize: 12,
    fontWeight: "700",
  },
});
