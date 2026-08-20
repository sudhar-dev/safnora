import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "@/context/ThemeContext";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";

export default function NotificationsSettingsScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();

  const [tripInvites, setTripInvites] = useState(true);
  const [expenseAlerts, setExpenseAlerts] = useState(true);
  const [chatMessages, setChatMessages] = useState(true);
  const [travelTips, setTravelTips] = useState(false);
  const [soundVibration, setSoundVibration] = useState(true);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.backButton, { backgroundColor: colors.surfaceSubtle }]}
        >
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Push Notifications
        </Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>
          TRIP & ACTIVITY ALERTS
        </Text>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.settingRow}>
            <View style={styles.textCol}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>
                Trip Invitations & Updates
              </Text>
              <Text
                style={[styles.settingSub, { color: colors.textSecondary }]}
              >
                Get notified when friends invite you to trips
              </Text>
            </View>
            <Switch
              value={tripInvites}
              onValueChange={setTripInvites}
              trackColor={{ false: "#CBD5E1", true: "#00A896" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.settingRow}>
            <View style={styles.textCol}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>
                Expense & Split Reminders
              </Text>
              <Text
                style={[styles.settingSub, { color: colors.textSecondary }]}
              >
                Alerts when new trip expenses are recorded
              </Text>
            </View>
            <Switch
              value={expenseAlerts}
              onValueChange={setExpenseAlerts}
              trackColor={{ false: "#CBD5E1", true: "#00A896" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.settingRow}>
            <View style={styles.textCol}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>
                Group Chat & Memories
              </Text>
              <Text
                style={[styles.settingSub, { color: colors.textSecondary }]}
              >
                Notifications for shared photos and polls
              </Text>
            </View>
            <Switch
              value={chatMessages}
              onValueChange={setChatMessages}
              trackColor={{ false: "#CBD5E1", true: "#00A896" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <Text
          style={[
            styles.sectionHeader,
            { color: colors.textSecondary, marginTop: 24 },
          ]}
        >
          PREFERENCES
        </Text>
        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.settingRow}>
            <View style={styles.textCol}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>
                Travel Guides & Deals
              </Text>
              <Text
                style={[styles.settingSub, { color: colors.textSecondary }]}
              >
                Curated destination recommendations
              </Text>
            </View>
            <Switch
              value={travelTips}
              onValueChange={setTravelTips}
              trackColor={{ false: "#CBD5E1", true: "#00A896" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.settingRow}>
            <View style={styles.textCol}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>
                Sound & Vibration
              </Text>
              <Text
                style={[styles.settingSub, { color: colors.textSecondary }]}
              >
                Play sound for incoming push notifications
              </Text>
            </View>
            <Switch
              value={soundVibration}
              onValueChange={setSoundVibration}
              trackColor={{ false: "#CBD5E1", true: "#00A896" }}
              thumbColor="#FFFFFF"
            />
          </View>
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
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { fontSize: 18, fontWeight: "800" },
  scrollContent: { padding: 20 },
  sectionHeader: {
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 10,
    letterSpacing: 0.8,
  },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  textCol: { flex: 1, marginRight: 16 },
  settingTitle: { fontSize: 15, fontWeight: "700" },
  settingSub: { fontSize: 12, marginTop: 2 },
  divider: { height: 1 },
});
