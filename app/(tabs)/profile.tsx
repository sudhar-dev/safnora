import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { SAFNORA_BRAND } from "@/constants/theme";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";

export default function ProfileTabScreen() {
  const { colors } = useAppTheme();
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Profile Card */}
        <View
          style={[
            styles.userCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.avatarHeader}>
            <View style={styles.avatarLarge}>
              <Text style={styles.avatarTextLarge}>
                {user?.displayName ? user.displayName[0].toUpperCase() : "T"}
              </Text>
            </View>
            <View style={styles.userInfoText}>
              <Text style={[styles.userName, { color: colors.text }]}>
                {user?.displayName || "Thiru Arasu"}
              </Text>
              <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
                {user?.email || "thiru@safnora.com"}
              </Text>

              {user?.phoneNumber ? (
                <View style={styles.infoRow}>
                  <Feather
                    name="phone"
                    size={12}
                    color={colors.textSecondary}
                    style={{ marginRight: 4 }}
                  />
                  <Text
                    style={[styles.infoText, { color: colors.textSecondary }]}
                  >
                    {user.phoneNumber}
                  </Text>
                </View>
              ) : null}

              <View style={styles.roleBadge}>
                <Feather
                  name="shield"
                  size={12}
                  color="#00A896"
                  style={{ marginRight: 4 }}
                />
                <Text style={styles.roleText}>
                  {user?.role || "Trip Lead Explorer"}
                </Text>
              </View>
            </View>
          </View>

          {user?.bio ? (
            <View
              style={[styles.bioBox, { backgroundColor: colors.surfaceSubtle }]}
            >
              <Text style={[styles.bioText, { color: colors.text }]}>
                {user.bio}
              </Text>
            </View>
          ) : null}

          {/* Edit Profile Action Button */}
          <TouchableOpacity
            style={[
              styles.editProfileButton,
              {
                backgroundColor: colors.surfaceSubtle,
                borderColor: colors.border,
              },
            ]}
            onPress={() => router.push("/edit-profile" as any)}
            activeOpacity={0.7}
          >
            <Feather
              name="edit-3"
              size={16}
              color={colors.primary}
              style={{ marginRight: 6 }}
            />
            <Text style={[styles.editProfileText, { color: colors.primary }]}>
              Edit Profile Details
            </Text>
          </TouchableOpacity>

          {/* Trip Stats Bar */}
          <View style={[styles.statsRow, { borderTopColor: colors.border }]}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>8</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Group Trips
              </Text>
            </View>
            <View
              style={[styles.statDivider, { backgroundColor: colors.border }]}
            />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>24</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Destinations
              </Text>
            </View>
            <View
              style={[styles.statDivider, { backgroundColor: colors.border }]}
            />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>
                142
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Memories
              </Text>
            </View>
          </View>
        </View>

        {/* SAFNORA Brand Capsule Card */}
        <View style={[styles.brandCard, { backgroundColor: "#00A896" }]}>
          <View style={styles.brandCardHeader}>
            <Image
              source={require("@/assets/images/logo/LogoPng.png")}
              style={styles.brandLogo}
              resizeMode="contain"
            />
            <View style={styles.brandTextWrapper}>
              <Text style={styles.brandName}>{SAFNORA_BRAND.name}</Text>
              <Text style={styles.brandTagline}>{SAFNORA_BRAND.tagline}</Text>
            </View>
          </View>
          <Text style={styles.brandSummary}>
            Connecting people, places, plans, expenses, and memories into one
            digital journey.
          </Text>
        </View>

        {/* Preferences & Settings Section */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Preferences & Settings
        </Text>

        <View
          style={[
            styles.menuCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          {/* App Theme */}
          <View style={[styles.menuRow, { borderBottomColor: colors.border }]}>
            <View style={styles.menuLeft}>
              <View
                style={[
                  styles.menuIconWrapper,
                  { backgroundColor: "#00A89615" },
                ]}
              >
                <Feather name="sun" size={18} color="#00A896" />
              </View>
              <Text style={[styles.menuText, { color: colors.text }]}>
                App Theme
              </Text>
            </View>
            <Text style={styles.themeValueText}>Light Mode</Text>
          </View>

          {/* Push Notifications */}
          <TouchableOpacity
            style={[styles.menuRow, { borderBottomColor: colors.border }]}
            onPress={() => router.push("/notifications-settings" as any)}
            activeOpacity={0.7}
          >
            <View style={styles.menuLeft}>
              <View
                style={[
                  styles.menuIconWrapper,
                  { backgroundColor: "#6366F115" },
                ]}
              >
                <Feather name="bell" size={18} color="#6366F1" />
              </View>
              <Text style={[styles.menuText, { color: colors.text }]}>
                Push Notifications
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color={colors.textMuted} />
          </TouchableOpacity>

          {/* Privacy Controls */}
          <TouchableOpacity
            style={[styles.menuRow, { borderBottomColor: colors.border }]}
            onPress={() => router.push("/privacy-settings" as any)}
            activeOpacity={0.7}
          >
            <View style={styles.menuLeft}>
              <View
                style={[
                  styles.menuIconWrapper,
                  { backgroundColor: "#10B98115" },
                ]}
              >
                <Feather name="lock" size={18} color="#10B981" />
              </View>
              <Text style={[styles.menuText, { color: colors.text }]}>
                Privacy & Permissions
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color={colors.textMuted} />
          </TouchableOpacity>

          {/* Help & Support */}
          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => router.push("/help-support" as any)}
            activeOpacity={0.7}
          >
            <View style={styles.menuLeft}>
              <View
                style={[
                  styles.menuIconWrapper,
                  { backgroundColor: "#F59E0B15" },
                ]}
              >
                <Feather name="help-circle" size={18} color="#F59E0B" />
              </View>
              <Text style={[styles.menuText, { color: colors.text }]}>
                Help & Support
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleSignOut}
          activeOpacity={0.8}
        >
          <Feather
            name="log-out"
            size={18}
            color="#EF4444"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.logoutText}>Sign Out of SAFNORA</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20 },
  userCard: {
    padding: 20,
    borderRadius: 22,
    borderWidth: 1,
    marginBottom: 20,
  },
  avatarHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarLarge: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#00A896",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarTextLarge: { color: "#FFFFFF", fontWeight: "800", fontSize: 26 },
  userInfoText: { flex: 1 },
  userName: { fontSize: 20, fontWeight: "800", marginBottom: 2 },
  userEmail: { fontSize: 13, marginBottom: 4 },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  infoText: { fontSize: 12 },
  roleBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#EEF6F8",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  roleText: { fontSize: 11, fontWeight: "700", color: "#00A896" },
  bioBox: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 14,
  },
  bioText: { fontSize: 13, fontStyle: "italic", lineHeight: 18 },
  editProfileButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 18,
  },
  editProfileText: { fontSize: 13, fontWeight: "700" },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingTop: 16,
    borderTopWidth: 1,
  },
  statItem: { flex: 1, alignItems: "center" },
  statValue: { fontSize: 18, fontWeight: "800" },
  statLabel: { fontSize: 12, marginTop: 2 },
  statDivider: { width: 1, height: 24 },
  brandCard: {
    padding: 20,
    borderRadius: 22,
    marginBottom: 24,
  },
  brandCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  brandLogo: { width: 44, height: 44, marginRight: 12 },
  brandTextWrapper: { flex: 1 },
  brandName: { color: "#FFFFFF", fontSize: 20, fontWeight: "800" },
  brandTagline: {
    color: "#E0F2FE",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 1,
  },
  brandSummary: { color: "#F0F9FF", fontSize: 13, lineHeight: 18 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 12 },
  menuCard: {
    borderRadius: 22,
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  menuLeft: { flexDirection: "row", alignItems: "center" },
  menuIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuText: { fontSize: 15, fontWeight: "600" },
  themeValueText: { fontSize: 14, fontWeight: "700", color: "#00A896" },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FEE2E2",
  },
  logoutText: { color: "#EF4444", fontWeight: "700", fontSize: 15 },
});
