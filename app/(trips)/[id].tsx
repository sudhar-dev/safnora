import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@/context/ThemeContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import { getTripsFromStorage, saveTripToStorage, TripData } from '@/utils/storage';

export default function TripDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useAppTheme();
  const router = useRouter();

  const [trip, setTrip] = useState<TripData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cover Image
  const [coverUri, setCoverUri] = useState<string>(
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
  );

  // Interactive Active Workspace Tab: 'places' | 'expenses' | 'memories' | 'polls'
  const [activeTab, setActiveTab] = useState<'places' | 'expenses' | 'memories' | 'polls'>('places');

  // Expanded Workspaces State
  const [placesList, setPlacesList] = useState([
    { id: '1', name: 'Athirapally Waterfalls', type: 'Sightseeing', time: '10:00 AM' },
    { id: '2', name: 'Valparai Tea Gardens Viewpoint', type: 'Nature', time: '02:30 PM' },
    { id: '3', name: 'Sholayar Dam Reservoir', type: 'Scenic Spot', time: '05:00 PM' },
  ]);
  const [newPlaceName, setNewPlaceName] = useState('');

  const [expensesList, setExpensesList] = useState([
    { id: '1', title: 'Resort Stay & Cabins', amount: 12500, paidBy: 'Thiru Arasu' },
    { id: '2', title: 'Waterfall Entry Tickets & Guide', amount: 1850, paidBy: 'Arun Kumar' },
    { id: '3', title: 'Traditional Kerala Lunch', amount: 4100, paidBy: 'Thiru Arasu' },
  ]);

  const [memoriesList, setMemoriesList] = useState([
    { id: '1', caption: 'Waterfall rainbow magic 🌊', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80' },
    { id: '2', caption: 'Tea estate sunset 🌄', url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80' },
  ]);

  const [pollsList, setPollsList] = useState([
    { id: '1', question: 'Dinner Choice for Night 2?', options: ['Kerala Seafood Feast (60%)', 'South Indian Thali (40%)'], totalVotes: 5 },
  ]);
  const [newPollQuestion, setNewPollQuestion] = useState('');

  // Add Member Modal
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [membersList, setMembersList] = useState(['Thiru (You)', 'Arun Kumar', 'Kavya S.', 'Praveen R.', 'Ananya V.']);

  // Three Dots Menu Dropdown
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    async function loadTripDetails() {
      setIsLoading(true);
      const allTrips = await getTripsFromStorage();
      const current = allTrips.find((t) => t.id === id);

      if (current) {
        setTrip(current);
      } else {
        // Fallback default trip details if accessed directly
        setTrip({
          id: id || 'demo-trip',
          title: 'Valparai Gateway Adventure',
          startingPoint: 'Chennai',
          destination: 'Valparai, Kerala',
          startDate: 'Aug 24, 2026',
          endDate: 'Aug 28, 2026',
          dates: 'Aug 24 - Aug 28, 2026',
          description: 'Exploring tea estates, waterfalls, and scenic hill road driving.',
          status: 'Active',
          members: 5,
          statusColor: '#10B981',
        });
      }
      setIsLoading(false);
    }

    loadTripDetails();
  }, [id]);

  // Stage Switcher
  const stages: ('Planning' | 'Ready' | 'Active' | 'Completed')[] = ['Planning', 'Ready', 'Active', 'Completed'];
  const stageLabels = ['Plan', 'Ready', 'Active', 'Done'];

  const handleStageChange = async (newStatus: 'Planning' | 'Ready' | 'Active' | 'Completed') => {
    if (!trip) return;
    const updated = { ...trip, status: newStatus };
    setTrip(updated);
    await saveTripToStorage(updated);
  };

  const handleAddPlace = () => {
    if (!newPlaceName.trim()) return;
    setPlacesList([
      ...placesList,
      { id: Date.now().toString(), name: newPlaceName.trim(), type: 'Destination', time: '11:00 AM' },
    ]);
    setNewPlaceName('');
  };

  const handleAddMember = () => {
    if (!newMemberEmail.trim()) return;
    setMembersList([...membersList, newMemberEmail.trim()]);
    if (trip) {
      const updated = { ...trip, members: (trip.members || 1) + 1 };
      setTrip(updated);
      saveTripToStorage(updated);
    }
    setNewMemberEmail('');
    setIsMemberModalOpen(false);
  };

  const handleShareTrip = async () => {
    try {
      await Share.share({
        message: `Join our group trip "${trip?.title || 'Trip'}" on SAFNORA! Destination: ${trip?.destination}`,
      });
    } catch (e) {
      console.warn(e);
    }
  };

  if (isLoading || !trip) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.centerLoading}>
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Loading trip workspace...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentStageIndex = stages.indexOf(trip.status as any) !== -1 ? stages.indexOf(trip.status as any) : 0;
  const totalExpenseAmount = expensesList.reduce((sum, item) => sum + item.amount, 0);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Header Navigation */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]} numberOfLines={1}>
          {trip.title}
        </Text>
        <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)} style={styles.menuButton}>
          <Feather name="more-vertical" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Menu Options Dropdown */}
      {isMenuOpen ? (
        <View style={[styles.dropdownMenu, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <TouchableOpacity style={styles.menuItem} onPress={handleShareTrip}>
            <Feather name="share-2" size={16} color="#00A896" style={{ marginRight: 10 }} />
            <Text style={[styles.menuItemText, { color: colors.text }]}>Share Trip Link</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setIsMemberModalOpen(true)}>
            <Feather name="user-plus" size={16} color="#6366F1" style={{ marginRight: 10 }} />
            <Text style={[styles.menuItemText, { color: colors.text }]}>Invite Members</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Trip Hero & Cover Photo Card */}
        <View style={styles.heroCard}>
          <Image source={{ uri: coverUri }} style={styles.heroImage} />
          <View style={styles.heroOverlay} />

          {/* Change Cover Photo Badge */}
          <TouchableOpacity
            style={styles.changeCoverButton}
            onPress={() =>
              setCoverUri(
                coverUri.includes('1464822759023')
                  ? 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
                  : 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
              )
            }
            activeOpacity={0.8}
          >
            <Feather name="camera" size={14} color="#FFFFFF" style={{ marginRight: 4 }} />
            <Text style={styles.changeCoverText}>Change Cover</Text>
          </TouchableOpacity>

          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>{trip.title}</Text>

            <View style={styles.heroMetaRow}>
              <View style={styles.heroPill}>
                <Feather name="calendar" size={13} color="#FFFFFF" style={{ marginRight: 4 }} />
                <Text style={styles.heroPillText}>{trip.dates || 'Aug 24 - Aug 28, 2026'}</Text>
              </View>

              <View style={styles.heroPill}>
                <Feather name="navigation" size={13} color="#FFFFFF" style={{ marginRight: 4 }} />
                <Text style={styles.heroPillText}>
                  {trip.startingPoint ? `${trip.startingPoint} ➔ ${trip.destination}` : trip.destination}
                </Text>
              </View>
            </View>

            {/* Member Avatars Stack */}
            <View style={styles.membersRow}>
              <View style={styles.avatarStack}>
                {membersList.slice(0, 4).map((m, idx) => (
                  <View key={idx} style={[styles.avatarCircle, { marginLeft: idx > 0 ? -10 : 0 }]}>
                    <Text style={styles.avatarText}>{m[0]}</Text>
                  </View>
                ))}
              </View>
              {membersList.length > 4 ? (
                <Text style={styles.extraMembersText}>+{membersList.length - 4} more</Text>
              ) : null}
              <TouchableOpacity
                style={styles.addMemberBadge}
                onPress={() => setIsMemberModalOpen(true)}
                activeOpacity={0.8}
              >
                <Feather name="plus" size={14} color="#FFFFFF" style={{ marginRight: 2 }} />
                <Text style={styles.addMemberBadgeText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Trip Progress Bar (Plan ➔ Ready ➔ Active ➔ Done) */}
        <View style={[styles.progressCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.progressTitle, { color: colors.text }]}>Trip Progress</Text>

          <View style={styles.progressBarWrapper}>
            <View style={styles.progressTrackLine} />
            <View
              style={[
                styles.progressActiveLine,
                { width: `${(currentStageIndex / (stages.length - 1)) * 100}%` },
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
                      isActive ? styles.progressDotActive : styles.progressDotInactive,
                      isCurrent && styles.progressDotCurrent,
                    ]}
                  >
                    {isActive ? <Feather name="check" size={12} color="#FFFFFF" /> : null}
                  </View>
                  <Text
                    style={[
                      styles.stageLabelText,
                      isActive ? styles.stageActiveText : styles.stageInactiveText,
                    ]}
                  >
                    {stageLabels[idx]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 2x2 Quick Summary Grid (Vector Icons Only) */}
        <View style={styles.summaryGrid}>
          <View style={[styles.summaryCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={[styles.summaryIconWrapper, { backgroundColor: '#00A89615' }]}>
              <Feather name="map-pin" size={20} color="#00A896" />
            </View>

            <View style={styles.summaryTextWrapper}>
              <Text style={[styles.summaryValue, { color: colors.text }]}>{placesList.length} Places</Text>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Itinerary stops</Text>
            </View>
          </View>

          <View style={[styles.summaryCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={[styles.summaryIconWrapper, { backgroundColor: '#F59E0B15' }]}>
              <Feather name="dollar-sign" size={20} color="#F59E0B" />
            </View>

            <View style={styles.summaryTextWrapper}>
              <Text style={[styles.summaryValue, { color: colors.text }]}>₹{totalExpenseAmount.toLocaleString()}</Text>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Total expenses</Text>
            </View>
          </View>

          <View style={[styles.summaryCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={[styles.summaryIconWrapper, { backgroundColor: '#10B98115' }]}>
              <Feather name="image" size={20} color="#10B981" />
            </View>

            <View style={styles.summaryTextWrapper}>
              <Text style={[styles.summaryValue, { color: colors.text }]}>{memoriesList.length} Memories</Text>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Shared photos</Text>
            </View>
          </View>

          <View style={[styles.summaryCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={[styles.summaryIconWrapper, { backgroundColor: '#6366F115' }]}>
              <Feather name="calendar" size={20} color="#6366F1" />
            </View>

            <View style={styles.summaryTextWrapper}>
              <Text style={[styles.summaryValue, { color: colors.text }]}>4 Days</Text>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Trip duration</Text>
            </View>
          </View>
        </View>

        {/* 4 Core Quick Actions Hub */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
        <View style={styles.quickActionsRow}>
          <TouchableOpacity
            style={[styles.actionCard, activeTab === 'places' && styles.actionCardActive]}
            onPress={() => setActiveTab('places')}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIconWrapper, { backgroundColor: '#00A89615' }]}>
              <Feather name="map-pin" size={20} color="#00A896" />
            </View>
            <Text style={styles.actionCardText}>Add Place</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, activeTab === 'expenses' && styles.actionCardActive]}
            onPress={() => router.push('/(trips)/calculator' as any)}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIconWrapper, { backgroundColor: '#F59E0B15' }]}>
              <Feather name="dollar-sign" size={20} color="#F59E0B" />
            </View>
            <Text style={styles.actionCardText}>Add Expense</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, activeTab === 'memories' && styles.actionCardActive]}
            onPress={() => setActiveTab('memories')}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIconWrapper, { backgroundColor: '#10B98115' }]}>
              <Feather name="image" size={20} color="#10B981" />
            </View>
            <Text style={styles.actionCardText}>Add Memory</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, activeTab === 'polls' && styles.actionCardActive]}
            onPress={() => setActiveTab('polls')}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIconWrapper, { backgroundColor: '#6366F115' }]}>
              <Feather name="check-square" size={20} color="#6366F1" />
            </View>
            <Text style={styles.actionCardText}>Poll</Text>
          </TouchableOpacity>
        </View>

        {/* Expanded Workspace Workspace Tabs Content */}
        <View style={styles.tabHeaderRow}>
          <TouchableOpacity
            style={[styles.tabFilterButton, activeTab === 'places' && styles.tabFilterActive]}
            onPress={() => setActiveTab('places')}
          >
            <Text style={[styles.tabFilterText, activeTab === 'places' && styles.tabFilterTextActive]}>Places</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabFilterButton, activeTab === 'expenses' && styles.tabFilterActive]}
            onPress={() => setActiveTab('expenses')}
          >
            <Text style={[styles.tabFilterText, activeTab === 'expenses' && styles.tabFilterTextActive]}>Expenses</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabFilterButton, activeTab === 'memories' && styles.tabFilterActive]}
            onPress={() => setActiveTab('memories')}
          >
            <Text style={[styles.tabFilterText, activeTab === 'memories' && styles.tabFilterTextActive]}>Memories</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabFilterButton, activeTab === 'polls' && styles.tabFilterActive]}
            onPress={() => setActiveTab('polls')}
          >
            <Text style={[styles.tabFilterText, activeTab === 'polls' && styles.tabFilterTextActive]}>Polls</Text>
          </TouchableOpacity>
        </View>

        {/* Expanded Tab 1: Places & Itinerary */}
        {activeTab === 'places' && (
          <View style={[styles.workspaceCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.inputAddRow}>
              <TextInput
                style={[styles.inlineInput, { backgroundColor: colors.surfaceSubtle, color: colors.text, borderColor: colors.border }]}
                placeholder="Add place to itinerary..."
                placeholderTextColor={colors.textMuted}
                value={newPlaceName}
                onChangeText={setNewPlaceName}
              />
              <TouchableOpacity style={styles.inlineAddButton} onPress={handleAddPlace}>
                <Feather name="plus" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {placesList.map((place) => (
              <View key={place.id} style={[styles.placeRow, { borderBottomColor: colors.border }]}>
                <View style={styles.placeIconWrapper}>
                  <Feather name="map-pin" size={16} color="#00A896" />
                </View>

                <View style={styles.placeInfo}>
                  <Text style={[styles.placeName, { color: colors.text }]}>{place.name}</Text>
                  <Text style={[styles.placeMeta, { color: colors.textSecondary }]}>
                    {place.type} • {place.time}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Expanded Tab 2: Expenses & Split */}
        {activeTab === 'expenses' && (
          <View style={[styles.workspaceCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <TouchableOpacity
              style={styles.openCalculatorButton}
              onPress={() => router.push('/(trips)/calculator' as any)}
            >
              <Feather name="calculator" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.openCalculatorText}>Open Expense Calculator & Split</Text>
            </TouchableOpacity>

            {expensesList.map((exp) => (
              <View key={exp.id} style={[styles.placeRow, { borderBottomColor: colors.border }]}>
                <View style={[styles.placeIconWrapper, { backgroundColor: '#F59E0B15' }]}>
                  <Feather name="dollar-sign" size={16} color="#F59E0B" />
                </View>

                <View style={styles.placeInfo}>
                  <Text style={[styles.placeName, { color: colors.text }]}>{exp.title}</Text>
                  <Text style={[styles.placeMeta, { color: colors.textSecondary }]}>Paid by {exp.paidBy}</Text>
                </View>
                <Text style={styles.expenseAmountText}>₹{exp.amount}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Expanded Tab 3: Photo Memories Feed */}
        {activeTab === 'memories' && (
          <View style={[styles.workspaceCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.memoriesGrid}>
              {memoriesList.map((mem) => (
                <View key={mem.id} style={styles.memoryTile}>
                  <Image source={{ uri: mem.url }} style={styles.memoryTileImage} />
                  <Text style={[styles.memoryCaption, { color: colors.text }]}>{mem.caption}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Expanded Tab 4: Group Polls */}
        {activeTab === 'polls' && (
          <View style={[styles.workspaceCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {pollsList.map((poll) => (
              <View key={poll.id} style={styles.pollCardInner}>
                <Text style={[styles.pollQuestion, { color: colors.text }]}>{poll.question}</Text>
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

      {/* Add Member Modal */}
      <Modal visible={isMemberModalOpen} transparent animationType="fade" onRequestClose={() => setIsMemberModalOpen(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.memberModalCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.modalHeaderRow}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Add Trip Member</Text>
              <TouchableOpacity onPress={() => setIsMemberModalOpen(false)}>
                <Feather name="x" size={20} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.modalSubtitle, { color: colors.textSecondary }]}>
              Enter friend's email or phone number to invite them to this trip.
            </Text>

            <TextInput
              style={[styles.inputModal, { backgroundColor: colors.surfaceSubtle, color: colors.text, borderColor: colors.border }]}
              placeholder="e.g. arun@safnora.com or phone..."
              placeholderTextColor={colors.textMuted}
              value={newMemberEmail}
              onChangeText={setNewMemberEmail}
            />

            <TouchableOpacity style={styles.confirmAddMemberButton} onPress={handleAddMember}>
              <Text style={styles.confirmAddMemberText}>Add to Trip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centerLoading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 15, fontWeight: '600' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    position: 'relative',
    zIndex: 20,
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '800', flex: 1, marginHorizontal: 12 },
  menuButton: { padding: 4 },
  dropdownMenu: {
    position: 'absolute',
    top: 60,
    right: 16,
    borderRadius: 14,
    borderWidth: 1,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 100,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  menuItemText: { fontSize: 14, fontWeight: '600' },
  scrollContent: { padding: 20 },
  heroCard: {
    height: 220,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 20,
    justifyContent: 'flex-end',
    padding: 20,
  },
  heroImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(13, 37, 63, 0.55)',
  },
  changeCoverButton: {
    position: 'absolute',
    top: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  changeCoverText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  heroContent: { zIndex: 10 },
  heroTitle: { fontSize: 22, fontWeight: '800', color: '#FFFFFF', marginBottom: 8 },
  heroMetaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  heroPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  heroPillText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  membersRow: { flexDirection: 'row', alignItems: 'center' },
  avatarStack: { flexDirection: 'row', alignItems: 'center' },
  avatarCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#00A896',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
  extraMembersText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700', marginLeft: 8 },
  addMemberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00A896',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginLeft: 12,
  },
  addMemberBadgeText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  progressCard: {
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
  },
  progressTitle: { fontSize: 16, fontWeight: '800', marginBottom: 16 },
  progressBarWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 10,
  },
  progressTrackLine: {
    position: 'absolute',
    top: 14,
    left: 20,
    right: 20,
    height: 3,
    backgroundColor: '#E2E8F0',
    zIndex: 1,
  },
  progressActiveLine: {
    position: 'absolute',
    top: 14,
    left: 20,
    height: 3,
    backgroundColor: '#00A896',
    zIndex: 2,
  },
  progressNodeWrapper: { alignItems: 'center', zIndex: 10 },
  progressDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressDotActive: { backgroundColor: '#00A896' },
  progressDotInactive: { backgroundColor: '#CBD5E1' },
  progressDotCurrent: { borderWidth: 3, borderColor: '#EEF6F8' },
  stageLabelText: { fontSize: 12, fontWeight: '700' },
  stageActiveText: { color: '#00A896' },
  stageInactiveText: { color: '#94A3B8' },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  summaryCard: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
  },
  summaryIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  summaryTextWrapper: { flex: 1 },
  summaryValue: { fontSize: 15, fontWeight: '800' },
  summaryLabel: { fontSize: 11 },
  sectionTitle: { fontSize: 16, fontWeight: '800', marginBottom: 12 },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 24,
  },
  actionCard: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 6,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  actionCardActive: { borderColor: '#00A896', backgroundColor: '#EEF6F8' },
  actionIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  actionCardText: { fontSize: 12, fontWeight: '700', color: '#0D253F', textAlign: 'center' },
  tabHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#EEF6F8',
    borderRadius: 20,
    padding: 4,
    marginBottom: 16,
  },
  tabFilterButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 16,
  },
  tabFilterActive: { backgroundColor: '#FFFFFF' },
  tabFilterText: { fontSize: 13, fontWeight: '600', color: '#64748B' },
  tabFilterTextActive: { color: '#00A896', fontWeight: '800' },
  workspaceCard: {
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
  },
  inputAddRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  inlineInput: { flex: 1, height: 44, borderRadius: 12, borderWidth: 1, paddingHorizontal: 14, fontSize: 14 },
  inlineAddButton: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#00A896', justifyContent: 'center', alignItems: 'center' },
  placeRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1 },
  placeIconWrapper: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#EEF6F8', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  placeInfo: { flex: 1 },
  placeName: { fontSize: 15, fontWeight: '700' },
  placeMeta: { fontSize: 12, marginTop: 2 },
  expenseAmountText: { fontSize: 15, fontWeight: '800', color: '#00A896' },
  openCalculatorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    backgroundColor: '#00A896',
    borderRadius: 14,
    marginBottom: 16,
  },
  openCalculatorText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  memoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  memoryTile: { width: '48%', borderRadius: 14, overflow: 'hidden' },
  memoryTileImage: { width: '100%', height: 130, borderRadius: 14 },
  memoryCaption: { fontSize: 12, fontWeight: '600', marginTop: 4 },
  pollCardInner: { padding: 12, backgroundColor: '#F8FAFC', borderRadius: 14 },
  pollQuestion: { fontSize: 15, fontWeight: '700', marginBottom: 10 },
  pollOptionBox: { padding: 12, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 10, marginBottom: 8 },
  pollOptionText: { fontSize: 13, fontWeight: '600', color: '#0D253F' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  memberModalCard: { width: '100%', borderRadius: 20, borderWidth: 1, padding: 20 },
  modalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  modalTitle: { fontSize: 18, fontWeight: '800' },
  modalSubtitle: { fontSize: 13, marginBottom: 16 },
  inputModal: { height: 48, borderRadius: 12, borderWidth: 1, paddingHorizontal: 14, fontSize: 14, marginBottom: 16 },
  confirmAddMemberButton: { height: 48, borderRadius: 24, backgroundColor: '#00A896', justifyContent: 'center', alignItems: 'center' },
  confirmAddMemberText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
});
