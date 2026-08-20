import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Share,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "@/context/ThemeContext";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import {
  getTripsFromStorage,
  saveTripToStorage,
  TripData,
} from "@/utils/storage";

export default function TripDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useAppTheme();
  const router = useRouter();

  const [trip, setTrip] = useState<TripData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cover Image
  const [coverUri, setCoverUri] = useState<string>(
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
  );

  // Interactive Active Workspace Tab: 'overview' | 'places' | 'expenses' | 'memories' | 'polls'
  const [activeTab, setActiveTab] = useState<
    "overview" | "places" | "expenses" | "memories" | "polls"
  >("overview");

  // Bottom Sheet Drawer State: null | 'place' | 'expense' | 'memory' | 'poll'
  const [activeDrawer, setActiveDrawer] = useState<
    "place" | "expense" | "memory" | "poll" | null
  >(null);

  // Places State
  const [placesList, setPlacesList] = useState([
    {
      id: "1",
      name: "Athirapally Waterfalls",
      type: "Sightseeing",
      time: "10:00 AM",
    },
    {
      id: "2",
      name: "Valparai Tea Gardens Viewpoint",
      type: "Nature",
      time: "02:30 PM",
    },
    {
      id: "3",
      name: "Sholayar Dam Reservoir",
      type: "Scenic Spot",
      time: "05:00 PM",
    },
  ]);
  const [placeNameInput, setPlaceNameInput] = useState("");
  const [placeCategoryInput, setPlaceCategoryInput] = useState("Sightseeing");
  const [placeTimeInput, setPlaceTimeInput] = useState("11:00 AM");

  // Expenses & Paid By State
  const [expensesList, setExpensesList] = useState([
    {
      id: "1",
      title: "Resort Stay & Cabins",
      amount: 12500,
      paidBy: "Thiru Arasu",
    },
    {
      id: "2",
      title: "Waterfall Entry Tickets & Guide",
      amount: 1850,
      paidBy: "Arun Kumar",
    },
    {
      id: "3",
      title: "Traditional Kerala Lunch",
      amount: 4100,
      paidBy: "Thiru Arasu",
    },
  ]);
  const [expenseTitleInput, setExpenseTitleInput] = useState("");
  const [expenseAmountInput, setExpenseAmountInput] = useState("");
  const [expensePaidByInput, setExpensePaidByInput] = useState("Thiru Arasu");
  const [isPaidByDropdownOpen, setIsPaidByDropdownOpen] = useState(false);

  const memberOptions = [
    "Thiru Arasu",
    "Arun Kumar",
    "Kavya Sharma",
    "Praveen Raj",
    "Ananya Verma",
  ];

  // Google Drive Style Date Folders State for Memories
  const [memoryFolders, setMemoryFolders] = useState([
    {
      id: "f1",
      dateLabel: "Day 1 - Aug 24, 2026",
      expanded: true,
      photos: [
        {
          id: "1",
          caption: "Waterfall rainbow magic 🌊",
          url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        },
        {
          id: "2",
          caption: "Tea estate sunset 🌄",
          url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
        },
      ],
    },
    {
      id: "f2",
      dateLabel: "Day 2 - Aug 25, 2026",
      expanded: true,
      photos: [
        {
          id: "3",
          caption: "Resort morning coffee ☕",
          url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
        },
      ],
    },
  ]);
  const [memoryCaptionInput, setMemoryCaptionInput] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState("f1");

  // Polls State
  const [pollsList, setPollsList] = useState([
    {
      id: "1",
      question: "Dinner Choice for Night 2?",
      options: ["Kerala Seafood Feast (60%)", "South Indian Thali (40%)"],
      totalVotes: 5,
    },
  ]);
  const [pollQuestionInput, setPollQuestionInput] = useState("");
  const [pollOpt1Input, setPollOpt1Input] = useState("");
  const [pollOpt2Input, setPollOpt2Input] = useState("");

  // Three Dots Menu Dropdown
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const loadTripDetails = useCallback(async () => {
    setIsLoading(true);
    const allTrips = await getTripsFromStorage();
    const current = allTrips.find((t) => t.id === id);

    if (current) {
      setTrip(current);
    } else {
      // Fallback default trip details if accessed directly
      setTrip({
        id: id || "demo-trip",
        title: "Valparai Gateway Adventure",
        startingPoint: "Chennai",
        destination: "Valparai, Kerala",
        startDate: "Aug 24, 2026",
        endDate: "Aug 28, 2026",
        dates: "Aug 24 - Aug 28, 2026",
        description:
          "Exploring tea estates, waterfalls, and scenic hill road driving.",
        status: "Active",
        members: 5,
        statusColor: "#10B981",
      });
    }
    setIsLoading(false);
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      loadTripDetails();
    }, [loadTripDetails]),
  );

  // Stage Switcher
  const stages: ("Planning" | "Ready" | "Active" | "Completed")[] = [
    "Planning",
    "Ready",
    "Active",
    "Completed",
  ];
  const stageLabels = ["Plan", "Ready", "Active", "Done"];

  const stageColorMap: Record<string, string> = {
    Planning: "#00A896",
    Ready: "#6366F1",
    Active: "#10B981",
    Completed: "#64748B",
  };

  const handleStageChange = async (
    newStatus: "Planning" | "Ready" | "Active" | "Completed",
  ) => {
    if (!trip) return;
    const updated = {
      ...trip,
      status: newStatus,
      statusColor: stageColorMap[newStatus] || "#00A896",
    };
    setTrip(updated);
    await saveTripToStorage(updated);
  };

  // Submit Handlers for Bottom Sheets
  const handleSavePlaceDrawer = () => {
    if (!placeNameInput.trim()) return;
    setPlacesList([
      ...placesList,
      {
        id: Date.now().toString(),
        name: placeNameInput.trim(),
        type: placeCategoryInput,
        time: placeTimeInput || "11:00 AM",
      },
    ]);
    setPlaceNameInput("");
    setActiveDrawer(null);
    setActiveTab("places");
  };

  const handleSaveExpenseDrawer = () => {
    if (!expenseTitleInput.trim() || !expenseAmountInput.trim()) return;
    const numeric = parseFloat(expenseAmountInput);
    if (isNaN(numeric)) return;

    setExpensesList([
      {
        id: Date.now().toString(),
        title: expenseTitleInput.trim(),
        amount: numeric,
        paidBy: expensePaidByInput,
      },
      ...expensesList,
    ]);
    setExpenseTitleInput("");
    setExpenseAmountInput("");
    setIsPaidByDropdownOpen(false);
    setActiveDrawer(null);
    setActiveTab("expenses");
  };

  const handleSaveMemoryDrawer = () => {
    if (!memoryCaptionInput.trim()) return;
    const newPhoto = {
      id: Date.now().toString(),
      caption: memoryCaptionInput.trim(),
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    };

    setMemoryFolders((prev) =>
      prev.map((f) =>
        f.id === selectedFolderId
          ? { ...f, photos: [newPhoto, ...f.photos], expanded: true }
          : f,
      ),
    );
    setMemoryCaptionInput("");
    setActiveDrawer(null);
    setActiveTab("memories");
  };

  const handleSavePollDrawer = () => {
    if (!pollQuestionInput.trim()) return;
    const opts = [
      pollOpt1Input.trim() || "Option A",
      pollOpt2Input.trim() || "Option B",
    ];
    setPollsList([
      {
        id: Date.now().toString(),
        question: pollQuestionInput.trim(),
        options: opts.map((o) => `${o} (0%)`),
        totalVotes: 0,
      },
      ...pollsList,
    ]);
    setPollQuestionInput("");
    setPollOpt1Input("");
    setPollOpt2Input("");
    setActiveDrawer(null);
    setActiveTab("polls");
  };

  const toggleFolderExpanded = (folderId: string) => {
    setMemoryFolders((prev) =>
      prev.map((f) =>
        f.id === folderId ? { ...f, expanded: !f.expanded } : f,
      ),
    );
  };

  const handleOpenInviteMembers = () => {
    setIsMenuOpen(false);
    router.push(`/(trips)/invite-members?tripId=${trip?.id}` as any);
  };

  const handleShareTrip = async () => {
    setIsMenuOpen(false);
    try {
      await Share.share({
        message: `Join our group trip "${trip?.title || "Trip"}" on SAFNORA! Destination: ${trip?.destination}`,
      });
    } catch (e) {
      console.warn(e);
    }
  };

  if (isLoading || !trip) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <View style={styles.centerLoading}>
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
            Loading trip workspace...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentStageIndex =
    stages.indexOf(trip.status as any) !== -1
      ? stages.indexOf(trip.status as any)
      : 0;
  const totalExpenseAmount = expensesList.reduce(
    (sum, item) => sum + item.amount,
    0,
  );
  const totalPhotosCount = memoryFolders.reduce(
    (sum, f) => sum + f.photos.length,
    0,
  );

  const mockMembersList = [
    "Thiru (You)",
    "Arun K.",
    "Kavya S.",
    "Praveen R.",
    "Ananya V.",
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Top Header Navigation */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Feather name="chevron-left" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text
            style={[styles.headerTitle, { color: colors.text }]}
            numberOfLines={1}
          >
            {trip.title}
          </Text>
          <TouchableOpacity
            onPress={() => setIsMenuOpen(!isMenuOpen)}
            style={styles.menuButton}
          >
            <Feather name="more-vertical" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Menu Options Dropdown */}
        {isMenuOpen ? (
          <View
            style={[
              styles.dropdownMenu,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <TouchableOpacity style={styles.menuItem} onPress={handleShareTrip}>
              <Feather
                name="share-2"
                size={16}
                color="#00A896"
                style={{ marginRight: 10 }}
              />
              <Text style={[styles.menuItemText, { color: colors.text }]}>
                Share Trip Link
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleOpenInviteMembers}
            >
              <Feather
                name="user-plus"
                size={16}
                color="#6366F1"
                style={{ marginRight: 10 }}
              />
              <Text style={[styles.menuItemText, { color: colors.text }]}>
                Invite Members
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Trip Hero & Cover Photo Card */}
          <View style={styles.heroCard}>
            <Image source={{ uri: coverUri }} style={styles.heroImage} />
            <View style={styles.heroOverlay} />

            {/* Change Cover Photo Badge */}
            <TouchableOpacity
              style={styles.changeCoverButton}
              onPress={() =>
                setCoverUri(
                  coverUri.includes("1464822759023")
                    ? "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
                    : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
                )
              }
              activeOpacity={0.8}
            >
              <Feather
                name="camera"
                size={14}
                color="#FFFFFF"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.changeCoverText}>Change Cover</Text>
            </TouchableOpacity>

            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>{trip.title}</Text>

              <View style={styles.heroMetaRow}>
                <View style={styles.heroPill}>
                  <Feather
                    name="calendar"
                    size={13}
                    color="#FFFFFF"
                    style={{ marginRight: 4 }}
                  />
                  <Text style={styles.heroPillText}>
                    {trip.dates || "Aug 24 - Aug 28, 2026"}
                  </Text>
                </View>

                <View style={styles.heroPill}>
                  <Feather
                    name="navigation"
                    size={13}
                    color="#FFFFFF"
                    style={{ marginRight: 4 }}
                  />
                  <Text style={styles.heroPillText}>
                    {trip.startingPoint
                      ? `${trip.startingPoint} ➔ ${trip.destination}`
                      : trip.destination}
                  </Text>
                </View>
              </View>

              {/* Member Avatars Stack */}
              <View style={styles.membersRow}>
                <View style={styles.avatarStack}>
                  {mockMembersList
                    .slice(0, Math.min(4, trip.members || 5))
                    .map((m, idx) => (
                      <View
                        key={idx}
                        style={[
                          styles.avatarCircle,
                          { marginLeft: idx > 0 ? -10 : 0 },
                        ]}
                      >
                        <Text style={styles.avatarText}>{m[0]}</Text>
                      </View>
                    ))}
                </View>
                {trip.members > 4 ? (
                  <Text style={styles.extraMembersText}>
                    +{trip.members - 4} more
                  </Text>
                ) : null}
                <TouchableOpacity
                  style={styles.addMemberBadge}
                  onPress={handleOpenInviteMembers}
                  activeOpacity={0.8}
                >
                  <Feather
                    name="user-plus"
                    size={13}
                    color="#FFFFFF"
                    style={{ marginRight: 4 }}
                  />
                  <Text style={styles.addMemberBadgeText}>Invite</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Trip Progress Bar (Plan ➔ Ready ➔ Active ➔ Done) */}
          <View
            style={[
              styles.progressCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <View style={styles.progressHeaderRow}>
              <Text style={[styles.progressTitle, { color: colors.text }]}>
                Trip Progress
              </Text>
              <View
                style={[
                  styles.statusBadgePill,
                  { backgroundColor: (trip.statusColor || "#00A896") + "20" },
                ]}
              >
                <Text
                  style={[
                    styles.statusBadgeText,
                    { color: trip.statusColor || "#00A896" },
                  ]}
                >
                  {trip.status}
                </Text>
              </View>
            </View>

            <View style={styles.progressBarWrapper}>
              <View style={styles.progressTrackLine} />
              <View
                style={[
                  styles.progressActiveLine,
                  {
                    width: `${(currentStageIndex / (stages.length - 1)) * 100}%`,
                  },
                ]}
              />

              {stages.map((stg, idx) => {
                const isActive = idx <= currentStageIndex;
                const isCurrent = idx === currentStageIndex;
                return (
                  <TouchableOpacity
                    key={stg}
                    style={styles.progressNodeWrapper}
                    onPress={() => handleStageChange(stg)}
                    activeOpacity={0.8}
                  >
                    <View
                      style={[
                        styles.progressDot,
                        isActive
                          ? styles.progressDotActive
                          : styles.progressDotInactive,
                        isCurrent && styles.progressDotCurrent,
                      ]}
                    >
                      {isActive ? (
                        <Feather name="check" size={12} color="#FFFFFF" />
                      ) : null}
                    </View>
                    <Text
                      style={[
                        styles.stageLabelText,
                        isActive
                          ? styles.stageActiveText
                          : styles.stageInactiveText,
                      ]}
                    >
                      {stageLabels[idx]}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* 2x2 Quick Summary Grid */}
          <View style={styles.summaryGrid}>
            <View
              style={[
                styles.summaryCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <View
                style={[
                  styles.summaryIconWrapper,
                  { backgroundColor: "#00A89615" },
                ]}
              >
                <Feather name="map-pin" size={20} color="#00A896" />
              </View>

              <View style={styles.summaryTextWrapper}>
                <Text style={[styles.summaryValue, { color: colors.text }]}>
                  {placesList.length} Places
                </Text>
                <Text
                  style={[styles.summaryLabel, { color: colors.textSecondary }]}
                >
                  Itinerary stops
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.summaryCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <View
                style={[
                  styles.summaryIconWrapper,
                  { backgroundColor: "#F59E0B15" },
                ]}
              >
                <Text style={styles.rupeeIconMetric}>₹</Text>
              </View>

              <View style={styles.summaryTextWrapper}>
                <Text style={[styles.summaryValue, { color: colors.text }]}>
                  ₹{totalExpenseAmount.toLocaleString()}
                </Text>
                <Text
                  style={[styles.summaryLabel, { color: colors.textSecondary }]}
                >
                  Total expenses
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.summaryCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <View
                style={[
                  styles.summaryIconWrapper,
                  { backgroundColor: "#10B98115" },
                ]}
              >
                <Feather name="image" size={20} color="#10B981" />
              </View>

              <View style={styles.summaryTextWrapper}>
                <Text style={[styles.summaryValue, { color: colors.text }]}>
                  {totalPhotosCount} Memories
                </Text>
                <Text
                  style={[styles.summaryLabel, { color: colors.textSecondary }]}
                >
                  Shared photos
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.summaryCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <View
                style={[
                  styles.summaryIconWrapper,
                  { backgroundColor: "#6366F115" },
                ]}
              >
                <Feather name="calendar" size={20} color="#6366F1" />
              </View>

              <View style={styles.summaryTextWrapper}>
                <Text style={[styles.summaryValue, { color: colors.text }]}>
                  4 Days
                </Text>
                <Text
                  style={[styles.summaryLabel, { color: colors.textSecondary }]}
                >
                  Trip duration
                </Text>
              </View>
            </View>
          </View>

          {/* Quick Action Trigger Cards (Opens Bottom Drawers) */}
          <Text
            style={[styles.cardTitle, { color: colors.text, marginBottom: 10 }]}
          >
            Quick Workspace Actions
          </Text>
          <View style={styles.quickDrawerGrid}>
            <TouchableOpacity
              style={styles.drawerTriggerTile}
              onPress={() => setActiveDrawer("place")}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.drawerIconBadge,
                  { backgroundColor: "#00A89615" },
                ]}
              >
                <Feather name="plus-circle" size={20} color="#00A896" />
              </View>
              <Text style={styles.drawerTriggerLabel}>Add Place</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.drawerTriggerTile}
              onPress={() =>
                router.push(`/(trips)/calculator?tripId=${trip.id}` as any)
              }
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.drawerIconBadge,
                  { backgroundColor: "#F59E0B15" },
                ]}
              >
                <Text style={styles.rupeeIconMetric}>₹</Text>
              </View>
              <Text style={styles.drawerTriggerLabel}>Add Expense</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.drawerTriggerTile}
              onPress={() => setActiveDrawer("memory")}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.drawerIconBadge,
                  { backgroundColor: "#10B98115" },
                ]}
              >
                <Feather name="camera" size={20} color="#10B981" />
              </View>
              <Text style={styles.drawerTriggerLabel}>Add Memory</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.drawerTriggerTile}
              onPress={() => setActiveDrawer("poll")}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.drawerIconBadge,
                  { backgroundColor: "#6366F115" },
                ]}
              >
                <Feather name="check-square" size={20} color="#6366F1" />
              </View>
              <Text style={styles.drawerTriggerLabel}>Create Poll</Text>
            </TouchableOpacity>
          </View>

          {/* Tab 1 Content: Overview */}
          {activeTab === "overview" && (
            <View
              style={[
                styles.workspaceCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Trip Objective & Details
              </Text>
              <Text
                style={[styles.overviewDesc, { color: colors.textSecondary }]}
              >
                {trip.description ||
                  "Exploring tea estates, waterfalls, scenic views, and hill driving."}
              </Text>

              <View style={styles.overviewMetaBox}>
                <View style={styles.overviewMetaItem}>
                  <Feather
                    name="navigation"
                    size={16}
                    color="#00A896"
                    style={{ marginRight: 8 }}
                  />
                  <Text
                    style={[styles.overviewMetaText, { color: colors.text }]}
                  >
                    {trip.startingPoint
                      ? `${trip.startingPoint} ➔ ${trip.destination}`
                      : trip.destination}
                  </Text>
                </View>

                <View style={styles.overviewMetaItem}>
                  <Feather
                    name="calendar"
                    size={16}
                    color="#00A896"
                    style={{ marginRight: 8 }}
                  />
                  <Text
                    style={[styles.overviewMetaText, { color: colors.text }]}
                  >
                    {trip.dates || "Aug 24 - Aug 28, 2026"}
                  </Text>
                </View>
              </View>

              <Text
                style={[
                  styles.cardTitle,
                  { color: colors.text, marginTop: 16 },
                ]}
              >
                Group Members ({trip.members || 5})
              </Text>
              <View style={styles.membersListOverview}>
                {mockMembersList.map((name, idx) => (
                  <View key={idx} style={styles.memberPill}>
                    <View style={styles.memberPillAvatar}>
                      <Text style={styles.memberPillAvatarText}>{name[0]}</Text>
                    </View>
                    <Text style={styles.memberPillName}>{name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Tab 2 Content: Places & Itinerary */}
          {activeTab === "places" && (
            <View
              style={[
                styles.workspaceCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <TouchableOpacity
                style={styles.openDrawerHeaderButton}
                onPress={() => setActiveDrawer("place")}
              >
                <Feather
                  name="plus-circle"
                  size={18}
                  color="#FFFFFF"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.openDrawerHeaderButtonText}>
                  Add New Place
                </Text>
              </TouchableOpacity>

              {placesList.map((place) => (
                <View
                  key={place.id}
                  style={[
                    styles.placeRow,
                    { borderBottomColor: colors.border },
                  ]}
                >
                  <View style={styles.placeIconWrapper}>
                    <Feather name="map-pin" size={16} color="#00A896" />
                  </View>

                  <View style={styles.placeInfo}>
                    <Text style={[styles.placeName, { color: colors.text }]}>
                      {place.name}
                    </Text>
                    <Text
                      style={[
                        styles.placeMeta,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {place.type} • {place.time}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Tab 3 Content: Expenses & Add Expense */}
          {activeTab === "expenses" && (
            <View
              style={[
                styles.workspaceCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <TouchableOpacity
                style={styles.openCalculatorButton}
                onPress={() =>
                  router.push(`/(trips)/calculator?tripId=${trip.id}` as any)
                }
              >
                <Feather
                  name={"calculator" as any}
                  size={18}
                  color="#FFFFFF"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.openCalculatorText}>
                  Open Dedicated Expense Calculator & Split
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.openDrawerHeaderButton,
                  { backgroundColor: "#F59E0B" },
                ]}
                onPress={() => setActiveDrawer("expense")}
              >
                <Text
                  style={[
                    styles.openDrawerHeaderButtonText,
                    { marginRight: 6 },
                  ]}
                >
                  ₹
                </Text>
                <Text style={styles.openDrawerHeaderButtonText}>
                  Record New Expense
                </Text>
              </TouchableOpacity>

              <Text
                style={[
                  styles.cardTitle,
                  { color: colors.text, marginTop: 14, marginBottom: 8 },
                ]}
              >
                Expense History
              </Text>
              {expensesList.map((exp) => (
                <View
                  key={exp.id}
                  style={[
                    styles.placeRow,
                    { borderBottomColor: colors.border },
                  ]}
                >
                  <View
                    style={[
                      styles.placeIconWrapper,
                      { backgroundColor: "#F59E0B15" },
                    ]}
                  >
                    <Text style={styles.rupeeBadgeSmall}>₹</Text>
                  </View>

                  <View style={styles.placeInfo}>
                    <Text style={[styles.placeName, { color: colors.text }]}>
                      {exp.title}
                    </Text>
                    <Text
                      style={[
                        styles.placeMeta,
                        { color: colors.textSecondary },
                      ]}
                    >
                      Paid by {exp.paidBy}
                    </Text>
                  </View>
                  <Text style={styles.expenseAmountText}>₹{exp.amount}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Tab 4 Content: Memories */}
          {activeTab === "memories" && (
            <View
              style={[
                styles.workspaceCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.openDrawerHeaderButton,
                  { backgroundColor: "#10B981" },
                ]}
                onPress={() => setActiveDrawer("memory")}
              >
                <Feather
                  name="camera"
                  size={18}
                  color="#FFFFFF"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.openDrawerHeaderButtonText}>
                  Upload New Memory
                </Text>
              </TouchableOpacity>

              <Text
                style={[
                  styles.cardTitle,
                  { color: colors.text, marginTop: 14, marginBottom: 12 },
                ]}
              >
                Trip Photo Folders (Date-Wise)
              </Text>

              {memoryFolders.map((folder) => (
                <View
                  key={folder.id}
                  style={[
                    styles.driveFolderCard,
                    {
                      backgroundColor: colors.surfaceSubtle,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.driveFolderHeader}
                    onPress={() => toggleFolderExpanded(folder.id)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.driveFolderIconBadge}>
                      <Feather name="folder" size={18} color="#00A896" />
                    </View>
                    <View style={styles.driveFolderInfo}>
                      <Text
                        style={[
                          styles.driveFolderTitle,
                          { color: colors.text },
                        ]}
                      >
                        {folder.dateLabel}
                      </Text>
                      <Text
                        style={[
                          styles.driveFolderMeta,
                          { color: colors.textSecondary },
                        ]}
                      >
                        {folder.photos.length}{" "}
                        {folder.photos.length === 1 ? "photo" : "photos"}
                      </Text>
                    </View>
                    <Feather
                      name={folder.expanded ? "chevron-up" : "chevron-down"}
                      size={18}
                      color={colors.textMuted}
                    />
                  </TouchableOpacity>

                  {folder.expanded ? (
                    <View style={styles.drivePhotosContainer}>
                      {folder.photos.map((photo) => (
                        <View
                          key={photo.id}
                          style={[
                            styles.crispMemoryTile,
                            {
                              backgroundColor: colors.surface,
                              borderColor: colors.border,
                            },
                          ]}
                        >
                          <Image
                            source={{ uri: photo.url }}
                            style={styles.crispMemoryImage}
                            resizeMode="cover"
                          />
                          <View style={styles.crispCaptionBox}>
                            <Text
                              style={[
                                styles.crispCaptionText,
                                { color: colors.text },
                              ]}
                            >
                              {photo.caption}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  ) : null}
                </View>
              ))}
            </View>
          )}

          {/* Tab 5 Content: Group Polls */}
          {activeTab === "polls" && (
            <View
              style={[
                styles.workspaceCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.openDrawerHeaderButton,
                  { backgroundColor: "#6366F1" },
                ]}
                onPress={() => setActiveDrawer("poll")}
              >
                <Feather
                  name="check-square"
                  size={18}
                  color="#FFFFFF"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.openDrawerHeaderButtonText}>
                  Create Group Poll
                </Text>
              </TouchableOpacity>

              {pollsList.map((poll) => (
                <View key={poll.id} style={styles.pollCardInner}>
                  <Text style={[styles.pollQuestion, { color: colors.text }]}>
                    {poll.question}
                  </Text>
                  {poll.options.map((opt, idx) => (
                    <TouchableOpacity key={idx} style={styles.pollOptionBox}>
                      <Text style={styles.pollOptionText}>{opt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        {/* WhatsApp-Style Fixed Bottom Workspace Navigation Bar */}
        <View
          style={[
            styles.bottomWorkspaceNav,
            { backgroundColor: colors.surface, borderTopColor: colors.border },
          ]}
        >
          {/* Tab 1: Overview */}
          <TouchableOpacity
            style={styles.bottomNavItem}
            onPress={() => setActiveTab("overview")}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.bottomNavIconWrapper,
                activeTab === "overview" && styles.bottomNavIconActive,
              ]}
            >
              <Feather
                name="grid"
                size={20}
                color={activeTab === "overview" ? "#00A896" : colors.textMuted}
              />
            </View>
            <Text
              style={[
                styles.bottomNavLabel,
                activeTab === "overview" && styles.bottomNavLabelActive,
              ]}
            >
              Overview
            </Text>
          </TouchableOpacity>

          {/* Tab 2: Places */}
          <TouchableOpacity
            style={styles.bottomNavItem}
            onPress={() => setActiveTab("places")}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.bottomNavIconWrapper,
                activeTab === "places" && styles.bottomNavIconActive,
              ]}
            >
              <Feather
                name="map-pin"
                size={20}
                color={activeTab === "places" ? "#00A896" : colors.textMuted}
              />
              <View
                style={[
                  styles.badgeCounter,
                  activeTab === "places"
                    ? styles.badgeActive
                    : styles.badgeInactive,
                ]}
              >
                <Text style={styles.badgeText}>{placesList.length}</Text>
              </View>
            </View>
            <Text
              style={[
                styles.bottomNavLabel,
                activeTab === "places" && styles.bottomNavLabelActive,
              ]}
            >
              Places
            </Text>
          </TouchableOpacity>

          {/* Tab 3: Expenses */}
          <TouchableOpacity
            style={styles.bottomNavItem}
            onPress={() => setActiveTab("expenses")}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.bottomNavIconWrapper,
                activeTab === "expenses" && styles.bottomNavIconActive,
              ]}
            >
              <Text
                style={[
                  styles.bottomRupeeIcon,
                  activeTab === "expenses" && styles.bottomRupeeIconActive,
                ]}
              >
                ₹
              </Text>
              <View
                style={[
                  styles.badgeCounter,
                  activeTab === "expenses"
                    ? styles.badgeActive
                    : styles.badgeInactive,
                ]}
              >
                <Text style={styles.badgeText}>{expensesList.length}</Text>
              </View>
            </View>
            <Text
              style={[
                styles.bottomNavLabel,
                activeTab === "expenses" && styles.bottomNavLabelActive,
              ]}
            >
              Expenses
            </Text>
          </TouchableOpacity>

          {/* Tab 4: Memories */}
          <TouchableOpacity
            style={styles.bottomNavItem}
            onPress={() => setActiveTab("memories")}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.bottomNavIconWrapper,
                activeTab === "memories" && styles.bottomNavIconActive,
              ]}
            >
              <Feather
                name="image"
                size={20}
                color={activeTab === "memories" ? "#00A896" : colors.textMuted}
              />
              <View
                style={[
                  styles.badgeCounter,
                  activeTab === "memories"
                    ? styles.badgeActive
                    : styles.badgeInactive,
                ]}
              >
                <Text style={styles.badgeText}>{totalPhotosCount}</Text>
              </View>
            </View>
            <Text
              style={[
                styles.bottomNavLabel,
                activeTab === "memories" && styles.bottomNavLabelActive,
              ]}
            >
              Memories
            </Text>
          </TouchableOpacity>

          {/* Tab 5: Polls */}
          <TouchableOpacity
            style={styles.bottomNavItem}
            onPress={() => setActiveTab("polls")}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.bottomNavIconWrapper,
                activeTab === "polls" && styles.bottomNavIconActive,
              ]}
            >
              <Feather
                name="check-square"
                size={20}
                color={activeTab === "polls" ? "#00A896" : colors.textMuted}
              />
              <View
                style={[
                  styles.badgeCounter,
                  activeTab === "polls"
                    ? styles.badgeActive
                    : styles.badgeInactive,
                ]}
              >
                <Text style={styles.badgeText}>{pollsList.length}</Text>
              </View>
            </View>
            <Text
              style={[
                styles.bottomNavLabel,
                activeTab === "polls" && styles.bottomNavLabelActive,
              ]}
            >
              Polls
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* BOTTOM SHEET DRAWER MODAL OVERLAY */}
      <Modal
        visible={activeDrawer !== null}
        animationType="slide"
        transparent
        onRequestClose={() => setActiveDrawer(null)}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlayContainer}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <TouchableOpacity
            style={styles.modalBackdrop}
            onPress={() => setActiveDrawer(null)}
            activeOpacity={1}
          />

          {/* Drawer Sheet Body */}
          <View
            style={[
              styles.bottomDrawerSheet,
              { backgroundColor: colors.surface },
            ]}
          >
            <View style={styles.drawerDragHandle} />

            {/* DRAWER 1: ADD PLACE */}
            {activeDrawer === "place" && (
              <View style={styles.drawerContentContainer}>
                <View style={styles.drawerHeaderRow}>
                  <Text style={[styles.drawerTitle, { color: colors.text }]}>
                    Add New Itinerary Place
                  </Text>
                  <TouchableOpacity onPress={() => setActiveDrawer(null)}>
                    <Feather name="x" size={20} color={colors.textMuted} />
                  </TouchableOpacity>
                </View>

                <Text
                  style={[styles.inputLabel, { color: colors.textSecondary }]}
                >
                  Place Name
                </Text>
                <TextInput
                  style={[
                    styles.drawerInput,
                    {
                      backgroundColor: colors.surfaceSubtle,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  placeholder="e.g. Kanthalloor Waterfalls"
                  placeholderTextColor={colors.textMuted}
                  value={placeNameInput}
                  onChangeText={setPlaceNameInput}
                />

                <Text
                  style={[styles.inputLabel, { color: colors.textSecondary }]}
                >
                  Category & Time Slot
                </Text>
                <View style={styles.drawerRowTwo}>
                  <TextInput
                    style={[
                      styles.drawerInput,
                      {
                        flex: 1,
                        backgroundColor: colors.surfaceSubtle,
                        color: colors.text,
                        borderColor: colors.border,
                      },
                    ]}
                    placeholder="Category (Sightseeing)"
                    placeholderTextColor={colors.textMuted}
                    value={placeCategoryInput}
                    onChangeText={setPlaceCategoryInput}
                  />
                  <TextInput
                    style={[
                      styles.drawerInput,
                      {
                        flex: 1,
                        backgroundColor: colors.surfaceSubtle,
                        color: colors.text,
                        borderColor: colors.border,
                      },
                    ]}
                    placeholder="Time (11:00 AM)"
                    placeholderTextColor={colors.textMuted}
                    value={placeTimeInput}
                    onChangeText={setPlaceTimeInput}
                  />
                </View>

                <TouchableOpacity
                  style={styles.drawerSubmitButton}
                  onPress={handleSavePlaceDrawer}
                  activeOpacity={0.85}
                >
                  <Feather
                    name="check"
                    size={16}
                    color="#FFFFFF"
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.drawerSubmitText}>
                    Save Place to Trip
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* DRAWER 2: RECORD EXPENSE */}
            {activeDrawer === "expense" && (
              <View style={styles.drawerContentContainer}>
                <View style={styles.drawerHeaderRow}>
                  <Text style={[styles.drawerTitle, { color: colors.text }]}>
                    Record Shared Expense
                  </Text>
                  <TouchableOpacity onPress={() => setActiveDrawer(null)}>
                    <Feather name="x" size={20} color={colors.textMuted} />
                  </TouchableOpacity>
                </View>

                <Text
                  style={[styles.inputLabel, { color: colors.textSecondary }]}
                >
                  Expense Title
                </Text>
                <TextInput
                  style={[
                    styles.drawerInput,
                    {
                      backgroundColor: colors.surfaceSubtle,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  placeholder="e.g. Resort Dinner & Drinks"
                  placeholderTextColor={colors.textMuted}
                  value={expenseTitleInput}
                  onChangeText={setExpenseTitleInput}
                />

                <View
                  style={{ flexDirection: "row", gap: 10, marginBottom: 12 }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.inputLabel,
                        { color: colors.textSecondary },
                      ]}
                    >
                      Amount (₹)
                    </Text>
                    <TextInput
                      style={[
                        styles.drawerInput,
                        {
                          backgroundColor: colors.surfaceSubtle,
                          color: colors.text,
                          borderColor: colors.border,
                        },
                      ]}
                      placeholder="2500"
                      placeholderTextColor={colors.textMuted}
                      keyboardType="numeric"
                      value={expenseAmountInput}
                      onChangeText={setExpenseAmountInput}
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.inputLabel,
                        { color: colors.textSecondary },
                      ]}
                    >
                      Paid By
                    </Text>
                    <TouchableOpacity
                      style={[
                        styles.drawerInput,
                        styles.dropdownSelectorDrawer,
                        {
                          backgroundColor: colors.surfaceSubtle,
                          borderColor: colors.border,
                        },
                      ]}
                      onPress={() =>
                        setIsPaidByDropdownOpen(!isPaidByDropdownOpen)
                      }
                    >
                      <Text
                        style={[
                          styles.dropdownValueText,
                          { color: colors.text },
                        ]}
                        numberOfLines={1}
                      >
                        {expensePaidByInput}
                      </Text>
                      <Feather
                        name={
                          isPaidByDropdownOpen ? "chevron-up" : "chevron-down"
                        }
                        size={16}
                        color={colors.textMuted}
                      />
                    </TouchableOpacity>

                    {isPaidByDropdownOpen ? (
                      <View
                        style={[
                          styles.dropdownListContainerDrawer,
                          {
                            backgroundColor: colors.surface,
                            borderColor: colors.border,
                          },
                        ]}
                      >
                        {memberOptions.map((opt) => (
                          <TouchableOpacity
                            key={opt}
                            style={[
                              styles.dropdownOptionRow,
                              expensePaidByInput === opt &&
                                styles.dropdownOptionSelected,
                            ]}
                            onPress={() => {
                              setExpensePaidByInput(opt);
                              setIsPaidByDropdownOpen(false);
                            }}
                          >
                            <Text
                              style={[
                                styles.dropdownOptionText,
                                { color: colors.text },
                                expensePaidByInput === opt &&
                                  styles.dropdownOptionTextSelected,
                              ]}
                            >
                              {opt}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    ) : null}
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.drawerSubmitButton,
                    { backgroundColor: "#F59E0B" },
                  ]}
                  onPress={handleSaveExpenseDrawer}
                  activeOpacity={0.85}
                >
                  <Text style={[styles.drawerSubmitText, { marginRight: 4 }]}>
                    ₹
                  </Text>
                  <Text style={styles.drawerSubmitText}>
                    Save & Split Expense
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* DRAWER 3: UPLOAD MEMORY */}
            {activeDrawer === "memory" && (
              <View style={styles.drawerContentContainer}>
                <View style={styles.drawerHeaderRow}>
                  <Text style={[styles.drawerTitle, { color: colors.text }]}>
                    Upload Trip Photo Memory
                  </Text>
                  <TouchableOpacity onPress={() => setActiveDrawer(null)}>
                    <Feather name="x" size={20} color={colors.textMuted} />
                  </TouchableOpacity>
                </View>

                <Text
                  style={[styles.inputLabel, { color: colors.textSecondary }]}
                >
                  Photo Caption
                </Text>
                <TextInput
                  style={[
                    styles.drawerInput,
                    {
                      backgroundColor: colors.surfaceSubtle,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  placeholder="e.g. Waterfall rainbow magic 🌊"
                  placeholderTextColor={colors.textMuted}
                  value={memoryCaptionInput}
                  onChangeText={setMemoryCaptionInput}
                />

                <Text
                  style={[styles.inputLabel, { color: colors.textSecondary }]}
                >
                  Target Date Folder
                </Text>
                <View style={styles.folderSelectRow}>
                  {memoryFolders.map((f) => (
                    <TouchableOpacity
                      key={f.id}
                      style={[
                        styles.folderPillOption,
                        selectedFolderId === f.id &&
                          styles.folderPillOptionSelected,
                      ]}
                      onPress={() => setSelectedFolderId(f.id)}
                    >
                      <Feather
                        name="folder"
                        size={14}
                        color={
                          selectedFolderId === f.id ? "#FFFFFF" : "#00A896"
                        }
                        style={{ marginRight: 4 }}
                      />
                      <Text
                        style={[
                          styles.folderPillText,
                          selectedFolderId === f.id &&
                            styles.folderPillTextSelected,
                        ]}
                      >
                        {f.dateLabel.split("-")[0]}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity
                  style={[
                    styles.drawerSubmitButton,
                    { backgroundColor: "#10B981" },
                  ]}
                  onPress={handleSaveMemoryDrawer}
                  activeOpacity={0.85}
                >
                  <Feather
                    name="camera"
                    size={16}
                    color="#FFFFFF"
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.drawerSubmitText}>
                    Save Memory to Trip
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* DRAWER 4: CREATE POLL */}
            {activeDrawer === "poll" && (
              <View style={styles.drawerContentContainer}>
                <View style={styles.drawerHeaderRow}>
                  <Text style={[styles.drawerTitle, { color: colors.text }]}>
                    Create Group Poll
                  </Text>
                  <TouchableOpacity onPress={() => setActiveDrawer(null)}>
                    <Feather name="x" size={20} color={colors.textMuted} />
                  </TouchableOpacity>
                </View>

                <Text
                  style={[styles.inputLabel, { color: colors.textSecondary }]}
                >
                  Poll Question
                </Text>
                <TextInput
                  style={[
                    styles.drawerInput,
                    {
                      backgroundColor: colors.surfaceSubtle,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  placeholder="e.g. Dinner choice for Night 2?"
                  placeholderTextColor={colors.textMuted}
                  value={pollQuestionInput}
                  onChangeText={setPollQuestionInput}
                />

                <Text
                  style={[styles.inputLabel, { color: colors.textSecondary }]}
                >
                  Voting Options
                </Text>
                <TextInput
                  style={[
                    styles.drawerInput,
                    {
                      backgroundColor: colors.surfaceSubtle,
                      color: colors.text,
                      borderColor: colors.border,
                      marginBottom: 8,
                    },
                  ]}
                  placeholder="Option 1 (e.g. Kerala Seafood)"
                  placeholderTextColor={colors.textMuted}
                  value={pollOpt1Input}
                  onChangeText={setPollOpt1Input}
                />
                <TextInput
                  style={[
                    styles.drawerInput,
                    {
                      backgroundColor: colors.surfaceSubtle,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  placeholder="Option 2 (e.g. South Indian Thali)"
                  placeholderTextColor={colors.textMuted}
                  value={pollOpt2Input}
                  onChangeText={setPollOpt2Input}
                />

                <TouchableOpacity
                  style={[
                    styles.drawerSubmitButton,
                    { backgroundColor: "#6366F1" },
                  ]}
                  onPress={handleSavePollDrawer}
                  activeOpacity={0.85}
                >
                  <Feather
                    name="check-square"
                    size={16}
                    color="#FFFFFF"
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.drawerSubmitText}>Launch Group Poll</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative" },
  centerLoading: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { fontSize: 15, fontWeight: "600" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    position: "relative",
    zIndex: 20,
  },
  backButton: { padding: 4 },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    flex: 1,
    marginHorizontal: 12,
  },
  menuButton: { padding: 4 },
  dropdownMenu: {
    position: "absolute",
    top: 60,
    right: 16,
    borderRadius: 14,
    borderWidth: 1,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 100,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  menuItemText: { fontSize: 14, fontWeight: "600" },
  scrollContent: { padding: 20, paddingBottom: 110 },
  heroCard: {
    height: 220,
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
    marginBottom: 20,
    justifyContent: "flex-end",
    padding: 20,
  },
  heroImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(13, 37, 63, 0.55)",
  },
  changeCoverButton: {
    position: "absolute",
    top: 14,
    right: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  changeCoverText: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },
  heroContent: { zIndex: 10 },
  heroTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  heroMetaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  heroPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  heroPillText: { color: "#FFFFFF", fontSize: 12, fontWeight: "600" },
  membersRow: { flexDirection: "row", alignItems: "center" },
  avatarStack: { flexDirection: "row", alignItems: "center" },
  avatarCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#00A896",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: "#FFFFFF", fontSize: 12, fontWeight: "800" },
  extraMembersText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 8,
  },
  addMemberBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00A896",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginLeft: 12,
  },
  addMemberBadgeText: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },
  progressCard: {
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
  },
  progressHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  progressTitle: { fontSize: 16, fontWeight: "800" },
  statusBadgePill: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusBadgeText: { fontSize: 12, fontWeight: "700" },
  progressBarWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    paddingHorizontal: 10,
  },
  progressTrackLine: {
    position: "absolute",
    top: 14,
    left: 20,
    right: 20,
    height: 3,
    backgroundColor: "#E2E8F0",
    zIndex: 1,
  },
  progressActiveLine: {
    position: "absolute",
    top: 14,
    left: 20,
    height: 3,
    backgroundColor: "#00A896",
    zIndex: 2,
  },
  progressNodeWrapper: { alignItems: "center", zIndex: 10 },
  progressDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  progressDotActive: { backgroundColor: "#00A896" },
  progressDotInactive: { backgroundColor: "#CBD5E1" },
  progressDotCurrent: { borderWidth: 3, borderColor: "#EEF6F8" },
  stageLabelText: { fontSize: 12, fontWeight: "700" },
  stageActiveText: { color: "#00A896" },
  stageInactiveText: { color: "#94A3B8" },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },
  summaryCard: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
  },
  summaryIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  rupeeIconMetric: {
    fontSize: 20,
    fontWeight: "800",
    color: "#F59E0B",
  },
  rupeeBadgeSmall: {
    fontSize: 16,
    fontWeight: "800",
    color: "#F59E0B",
  },
  summaryTextWrapper: { flex: 1 },
  summaryValue: { fontSize: 15, fontWeight: "800" },
  summaryLabel: { fontSize: 11 },

  /* Quick Drawer Trigger Tiles Grid */
  quickDrawerGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 20,
  },
  drawerTriggerTile: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
  },
  drawerIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  drawerTriggerLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#0D253F",
  },

  workspaceCard: {
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 6,
  },
  overviewDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 14,
  },
  overviewMetaBox: {
    backgroundColor: "#EEF6F8",
    borderRadius: 14,
    padding: 14,
    gap: 10,
    marginBottom: 10,
  },
  overviewMetaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  overviewMetaText: {
    fontSize: 14,
    fontWeight: "700",
  },
  membersListOverview: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  memberPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
  },
  memberPillAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#00A896",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  memberPillAvatarText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
  memberPillName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0D253F",
  },
  openDrawerHeaderButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    backgroundColor: "#00A896",
    borderRadius: 14,
    marginBottom: 16,
  },
  openDrawerHeaderButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  placeRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  placeIconWrapper: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#EEF6F8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  placeInfo: { flex: 1 },
  placeName: { fontSize: 15, fontWeight: "700" },
  placeMeta: { fontSize: 12, marginTop: 2 },
  expenseAmountText: { fontSize: 15, fontWeight: "800", color: "#00A896" },
  openCalculatorButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    backgroundColor: "#00A896",
    borderRadius: 14,
    marginBottom: 12,
  },
  openCalculatorText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },

  /* Drive Style Date Folders & Crisp Photo Cards */
  driveFolderCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    marginBottom: 14,
  },
  driveFolderHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  driveFolderIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#EEF6F8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  driveFolderInfo: { flex: 1 },
  driveFolderTitle: { fontSize: 14, fontWeight: "800" },
  driveFolderMeta: { fontSize: 11, marginTop: 1 },
  drivePhotosContainer: {
    marginTop: 12,
    gap: 12,
  },
  crispMemoryTile: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  crispMemoryImage: {
    width: "100%",
    height: 160,
  },
  crispCaptionBox: {
    padding: 10,
  },
  crispCaptionText: {
    fontSize: 13,
    fontWeight: "700",
  },

  pollCardInner: {
    padding: 12,
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    marginBottom: 10,
  },
  pollQuestion: { fontSize: 15, fontWeight: "700", marginBottom: 10 },
  pollOptionBox: {
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    marginBottom: 8,
  },
  pollOptionText: { fontSize: 13, fontWeight: "600", color: "#0D253F" },

  /* WhatsApp-Style Fixed Bottom Workspace Navigation Bar */
  bottomWorkspaceNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopWidth: 1,
    paddingHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 200,
  },
  bottomNavItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  bottomNavIconWrapper: {
    position: "relative",
    marginBottom: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomNavIconActive: {
    transform: [{ scale: 1.05 }],
  },
  bottomNavLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
  },
  bottomNavLabelActive: {
    color: "#00A896",
    fontWeight: "800",
  },
  bottomRupeeIcon: {
    fontSize: 18,
    fontWeight: "800",
    color: "#64748B",
  },
  bottomRupeeIconActive: {
    color: "#00A896",
  },
  badgeCounter: {
    position: "absolute",
    top: -4,
    right: -10,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
  },
  badgeActive: {
    backgroundColor: "#00A896",
  },
  badgeInactive: {
    backgroundColor: "#CBD5E1",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },

  /* BOTTOM SHEET MODAL STYLES */
  modalOverlayContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(13, 37, 63, 0.45)",
  },
  bottomDrawerSheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  drawerDragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#CBD5E1",
    alignSelf: "center",
    marginBottom: 14,
  },
  drawerContentContainer: {
    gap: 4,
  },
  drawerHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  drawerTitle: {
    fontSize: 17,
    fontWeight: "800",
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "700",
    marginTop: 8,
    marginBottom: 4,
  },
  drawerInput: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontSize: 14,
  },
  drawerRowTwo: {
    flexDirection: "row",
    gap: 10,
  },
  drawerSubmitButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: "#00A896",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  drawerSubmitText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 15,
  },
  dropdownSelectorDrawer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownValueText: { fontSize: 13, fontWeight: "600" },
  dropdownListContainerDrawer: {
    position: "absolute",
    top: 52,
    left: 0,
    right: 0,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 4,
    elevation: 8,
    zIndex: 9999,
  },
  dropdownOptionRow: { paddingVertical: 10, paddingHorizontal: 12 },
  dropdownOptionSelected: { backgroundColor: "#EEF6F8" },
  dropdownOptionText: { fontSize: 13, fontWeight: "600" },
  dropdownOptionTextSelected: { color: "#00A896", fontWeight: "800" },
  folderSelectRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },
  folderPillOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#00A896",
    backgroundColor: "#EEF6F8",
  },
  folderPillOptionSelected: {
    backgroundColor: "#00A896",
  },
  folderPillText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#00A896",
  },
  folderPillTextSelected: {
    color: "#FFFFFF",
  },
});
