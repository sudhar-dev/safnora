import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "@/context/ThemeContext";
import Feather from "@expo/vector-icons/Feather";
import { useRouter, useFocusEffect } from "expo-router";
import {
  getTripsFromStorage,
  deleteTripFromStorage,
  TripData,
} from "@/utils/storage";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function TripsTabScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();

  const [trips, setTrips] = useState<TripData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Long-press Delete Drawer State
  const [selectedTripToDelete, setSelectedTripToDelete] =
    useState<TripData | null>(null);
  const [isDeleteDrawerOpen, setIsDeleteDrawerOpen] = useState<boolean>(false);
  const deleteSlideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  // Reload dynamic trips from local storage whenever tab gains focus
  useFocusEffect(
    useCallback(() => {
      async function loadTrips() {
        setIsLoading(true);
        const storedTrips = await getTripsFromStorage();
        setTrips(storedTrips);
        setIsLoading(false);
      }

      loadTrips();
    }, []),
  );

  const handleLongPressTrip = (trip: TripData) => {
    setSelectedTripToDelete(trip);
    setIsDeleteDrawerOpen(true);
    Animated.spring(deleteSlideAnim, {
      toValue: 0,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const closeDeleteDrawer = () => {
    Animated.timing(deleteSlideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 220,
      useNativeDriver: true,
    }).start(() => {
      setIsDeleteDrawerOpen(false);
      setSelectedTripToDelete(null);
    });
  };

  const confirmDeleteTrip = async () => {
    if (selectedTripToDelete) {
      const updated = await deleteTripFromStorage(selectedTripToDelete.id);
      setTrips(updated);
    }
    closeDeleteDrawer();
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Header with Left Chevron Back Button & Right Friends Icon Button */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={[
              styles.backButton,
              { backgroundColor: colors.surfaceSubtle },
            ]}
            onPress={() => router.push("/(tabs)")}
            activeOpacity={0.7}
          >
            <Feather name="chevron-left" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            My Trips
          </Text>
        </View>

        {/* Top Right Friends List Icon */}
        <TouchableOpacity
          style={[
            styles.friendsIconButton,
            { backgroundColor: colors.surfaceSubtle },
          ]}
          onPress={() => router.push("/(trips)/friends" as any)}
          activeOpacity={0.7}
        >
          <Feather name="users" size={20} color="#00A896" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {!isLoading && trips.length === 0 ? (
          /* Empty State - Rendered when no trips are present in local storage */
          <View
            style={[
              styles.emptyCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Feather name="map-pin" size={48} color={colors.textMuted} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No active trips yet
            </Text>
            <Text
              style={[styles.emptySubtitle, { color: colors.textSecondary }]}
            >
              Start a new group journey to invite friends, add destinations, and
              split expenses!
            </Text>
            <TouchableOpacity
              style={[
                styles.primaryButton,
                { backgroundColor: colors.primary },
              ]}
              onPress={() => router.push("/(trips)/add-trip" as any)}
              activeOpacity={0.8}
            >
              <Feather
                name="plus"
                size={18}
                color="#FFFFFF"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.primaryButtonText}>Create New Trip</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* Dynamic Trips List from Local Storage */
          trips.map((trip) => (
            <TouchableOpacity
              key={trip.id}
              style={[
                styles.tripCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
              activeOpacity={0.7}
              onPress={() => router.push(`/(trips)/${trip.id}` as any)}
              onLongPress={() => handleLongPressTrip(trip)}
            >
              <View style={styles.cardHeader}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={[styles.tripTitle, { color: colors.text }]}>
                    {trip.title}
                  </Text>
                  <View style={styles.locationRow}>
                    <Feather
                      name="navigation"
                      size={14}
                      color="#00A896"
                      style={{ marginRight: 6 }}
                    />
                    <Text
                      style={[
                        styles.locationText,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {trip.startingPoint
                        ? `${trip.startingPoint} ➔ ${trip.destination}`
                        : trip.destination}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: (trip.statusColor || "#00A896") + "20" },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      { color: trip.statusColor || "#00A896" },
                    ]}
                  >
                    {trip.status}
                  </Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.footerInfo}>
                  <Feather
                    name="calendar"
                    size={14}
                    color={colors.textMuted}
                    style={{ marginRight: 4 }}
                  />
                  <Text
                    style={[styles.footerText, { color: colors.textSecondary }]}
                  >
                    {trip.dates || "Upcoming"}
                  </Text>
                </View>
                <View style={styles.footerInfo}>
                  <Feather
                    name="users"
                    size={14}
                    color={colors.textMuted}
                    style={{ marginRight: 4 }}
                  />
                  <Text
                    style={[styles.footerText, { color: colors.textSecondary }]}
                  >
                    {trip.members || 1} member
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Floating Action Button (Circular + FAB Only) */}
      <TouchableOpacity
        style={[styles.fabButton, { backgroundColor: colors.primary }]}
        onPress={() => router.push("/(trips)/add-trip" as any)}
        activeOpacity={0.85}
      >
        <Feather name="plus" size={26} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Delete Confirmation Bottom Drawer (Sliding from bottom: 0) */}
      <Modal
        visible={isDeleteDrawerOpen}
        transparent
        animationType="none"
        onRequestClose={closeDeleteDrawer}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.backdropTouch}
            onPress={closeDeleteDrawer}
            activeOpacity={1}
          />

          <Animated.View
            style={[
              styles.drawerContainer,
              { transform: [{ translateY: deleteSlideAnim }] },
            ]}
          >
            <View style={styles.drawerHandle} />

            <View style={styles.deleteHeaderRow}>
              <View style={styles.deleteIconBadge}>
                <Feather name="trash-2" size={22} color="#EF4444" />
              </View>
              <Text style={styles.deleteTitle}>Delete Trip?</Text>
            </View>

            <Text style={styles.deleteMessage}>
              Are you sure you want to delete{" "}
              <Text style={styles.tripNameHighlight}>
                &quot;{selectedTripToDelete?.title}&quot;
              </Text>
              ? This action will remove all saved itinerary notes and split
              expenses.
            </Text>

            <View style={styles.deleteActionsRow}>
              <TouchableOpacity
                style={styles.cancelDeleteButton}
                onPress={closeDeleteDrawer}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelDeleteText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmDeleteButton}
                onPress={confirmDeleteTrip}
                activeOpacity={0.85}
              >
                <Feather
                  name="trash-2"
                  size={16}
                  color="#FFFFFF"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.confirmDeleteText}>Delete Trip</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
  },
  friendsIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 90,
  },
  emptyCard: {
    padding: 28,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: "center",
    marginTop: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 14,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 20,
    lineHeight: 20,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  tripCard: {
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  tripTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 13,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  footerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    fontSize: 13,
  },
  fabButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#00A896",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
    zIndex: 100,
  },

  /* Delete Confirmation Bottom Drawer Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "flex-end",
  },
  backdropTouch: {
    flex: 1,
  },
  drawerContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  drawerHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#CBD5E1",
    alignSelf: "center",
    marginBottom: 16,
  },
  deleteHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  deleteIconBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  deleteTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0D253F",
  },
  deleteMessage: {
    fontSize: 14,
    lineHeight: 20,
    color: "#64748B",
    marginBottom: 24,
  },
  tripNameHighlight: {
    fontWeight: "700",
    color: "#0D253F",
  },
  deleteActionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  cancelDeleteButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EEF6F8",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelDeleteText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#64748B",
  },
  confirmDeleteButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EF4444",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  confirmDeleteText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
  },
});
