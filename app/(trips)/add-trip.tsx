import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import { saveTripToStorage, TripData } from '@/utils/storage';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function AddTripScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();

  const [tripName, setTripName] = useState('');
  const [startingPoint, setStartingPoint] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('Aug 24, 2026');
  const [endDate, setEndDate] = useState('Aug 28, 2026');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Calendar Drawer State & Animations
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  // Calendar Selection State (Days in August 2026)
  const [selectedStartDay, setSelectedStartDay] = useState<number | null>(24);
  const [selectedEndDay, setSelectedEndDay] = useState<number | null>(28);

  const openCalendarDrawer = () => {
    setIsCalendarOpen(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const closeCalendarDrawer = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setIsCalendarOpen(false);
    });
  };

  const handleDaySelect = (day: number) => {
    if (selectedStartDay === null || (selectedStartDay !== null && selectedEndDay !== null)) {
      setSelectedStartDay(day);
      setSelectedEndDay(null);
    } else if (selectedStartDay !== null && selectedEndDay === null) {
      if (day < selectedStartDay) {
        setSelectedStartDay(day);
      } else {
        setSelectedEndDay(day);
      }
    }
  };

  const handleConfirmDates = () => {
    if (selectedStartDay) {
      const startStr = `Aug ${selectedStartDay}, 2026`;
      const endStr = selectedEndDay ? `Aug ${selectedEndDay}, 2026` : startStr;
      setStartDate(startStr);
      setEndDate(endStr);
    }
    closeCalendarDrawer();
  };

  const handleSaveTrip = async () => {
    if (!tripName.trim() || !destination.trim()) {
      setErrorMsg('Please enter both Trip Name and Destination.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const formattedDates =
      startDate.trim() && endDate.trim()
        ? `${startDate.trim()} - ${endDate.trim()}`
        : startDate.trim() || endDate.trim() || 'Upcoming';

    const newTrip: TripData = {
      id: 'trip_' + Date.now(),
      title: tripName.trim(),
      startingPoint: startingPoint.trim(),
      destination: destination.trim(),
      startDate: startDate.trim(),
      endDate: endDate.trim(),
      dates: formattedDates,
      description: description.trim(),
      status: 'Planning',
      members: 1,
      statusColor: '#00A896',
      createdAt: new Date().toISOString(),
    };

    await saveTripToStorage(newTrip);
    setIsSubmitting(false);
    router.back();
  };

  // Days grid calculation for August 2026 (starts on Saturday = index 6)
  const daysInMonth = 31;
  const startDayOffset = 6;
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Create New Trip</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.formContent} showsVerticalScrollIndicator={false}>
        {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

        <Text style={[styles.label, { color: colors.textSecondary }]}>Trip Name *</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
          placeholder="e.g. Athirapally & Valparai Gateway"
          placeholderTextColor={colors.textMuted}
          value={tripName}
          onChangeText={setTripName}
        />

        <Text style={[styles.label, { color: colors.textSecondary }]}>Starting Point (Origin)</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
          placeholder="e.g. Chennai / Bangalore"
          placeholderTextColor={colors.textMuted}
          value={startingPoint}
          onChangeText={setStartingPoint}
        />

        <Text style={[styles.label, { color: colors.textSecondary }]}>Destination *</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
          placeholder="Search destination or city..."
          placeholderTextColor={colors.textMuted}
          value={destination}
          onChangeText={setDestination}
        />

        {/* Start Date & End Date Trigger Row */}
        <View style={styles.datesRow}>
          <View style={styles.dateCol}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Start Date</Text>
            <TouchableOpacity
              style={[styles.dateInputWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={openCalendarDrawer}
              activeOpacity={0.8}
            >
              <Feather name="calendar" size={16} color="#00A896" style={{ marginRight: 8 }} />
              <Text style={[styles.dateText, { color: startDate ? colors.text : colors.textMuted }]}>
                {startDate || 'Select Date'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dateCol}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>End Date</Text>
            <TouchableOpacity
              style={[styles.dateInputWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={openCalendarDrawer}
              activeOpacity={0.8}
            >
              <Feather name="calendar" size={16} color="#00A896" style={{ marginRight: 8 }} />
              <Text style={[styles.dateText, { color: endDate ? colors.text : colors.textMuted }]}>
                {endDate || 'Select Date'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={[styles.label, { color: colors.textSecondary }]}>Description & Notes</Text>
        <TextInput
          style={[styles.textArea, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
          placeholder="Add trip objectives, ideas, or packing lists..."
          placeholderTextColor={colors.textMuted}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: colors.primary }]}
          onPress={handleSaveTrip}
          disabled={isSubmitting}
        >
          <Text style={styles.submitText}>{isSubmitting ? 'Saving...' : 'Save & Start Planning'}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Custom Calendar Drawer Modal */}
      <Modal visible={isCalendarOpen} transparent animationType="none" onRequestClose={closeCalendarDrawer}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.backdropTouch} onPress={closeCalendarDrawer} activeOpacity={1} />

          <Animated.View style={[styles.drawerContainer, { transform: [{ translateY: slideAnim }] }]}>
            {/* Drawer Handle */}
            <View style={styles.drawerHandle} />

            {/* Calendar Drawer Header */}
            <View style={styles.calendarHeader}>
              <View style={styles.monthNav}>
                <TouchableOpacity style={styles.monthNavButton}>
                  <Feather name="chevron-left" size={20} color="#0D253F" />
                </TouchableOpacity>
                <Text style={styles.monthTitle}>August 2026</Text>
                <TouchableOpacity style={styles.monthNavButton}>
                  <Feather name="chevron-right" size={20} color="#0D253F" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={closeCalendarDrawer} style={styles.closeButton}>
                <Feather name="x" size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            {/* Weekday Labels Header */}
            <View style={styles.weekdaysRow}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                <Text key={idx} style={styles.weekdayText}>
                  {day}
                </Text>
              ))}
            </View>

            {/* Calendar Days Grid */}
            <View style={styles.daysGrid}>
              {/* Offset blank cells */}
              {Array.from({ length: startDayOffset }).map((_, i) => (
                <View key={`empty-${i}`} style={styles.dayCell} />
              ))}

              {/* Month days */}
              {daysArray.map((day) => {
                const isStart = selectedStartDay === day;
                const isEnd = selectedEndDay === day;
                const inRange =
                  selectedStartDay !== null &&
                  selectedEndDay !== null &&
                  day >= selectedStartDay &&
                  day <= selectedEndDay;

                return (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.dayCell,
                      inRange && styles.dayInRange,
                      (isStart || isEnd) && styles.daySelected,
                    ]}
                    onPress={() => handleDaySelect(day)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.dayCellText,
                        inRange && styles.dayInRangeText,
                        (isStart || isEnd) && styles.daySelectedText,
                      ]}
                    >
                      {day}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Date Range Selection Status */}
            <View style={styles.selectionSummary}>
              <Feather name="calendar" size={16} color="#00A896" style={{ marginRight: 6 }} />
              <Text style={styles.summaryText}>
                {selectedStartDay
                  ? `Selected: Aug ${selectedStartDay}${selectedEndDay ? ` - Aug ${selectedEndDay}` : ''}, 2026`
                  : 'Tap dates to select range'}
              </Text>
            </View>

            {/* Confirm Dates Button */}
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmDates} activeOpacity={0.85}>
              <Text style={styles.confirmButtonText}>Confirm Dates</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  formContent: { padding: 20 },
  errorText: { color: '#EF4444', fontSize: 13, fontWeight: '600', marginBottom: 10, textAlign: 'center' },
  label: { fontSize: 14, fontWeight: '600', marginTop: 14, marginBottom: 8 },
  input: { height: 48, borderRadius: 12, borderWidth: 1, paddingHorizontal: 16, fontSize: 15 },
  datesRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateCol: {
    flex: 1,
  },
  dateInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  dateText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  textArea: { height: 100, borderRadius: 12, borderWidth: 1, padding: 12, fontSize: 15, textAlignVertical: 'top' },
  submitButton: { height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 28 },
  submitText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },

  /* Modal Drawer Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  },
  backdropTouch: {
    flex: 1,
  },
  drawerContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 36,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  drawerHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
    alignSelf: 'center',
    marginBottom: 14,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthNavButton: {
    padding: 6,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0D253F',
    marginHorizontal: 10,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EEF6F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekdaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  weekdayText: {
    width: 40,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  dayCell: {
    width: '14.28%',
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },
  dayCellText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0D253F',
  },
  dayInRange: {
    backgroundColor: '#E1F8F2',
  },
  dayInRangeText: {
    color: '#00A896',
    fontWeight: '700',
  },
  daySelected: {
    backgroundColor: '#00A896',
    borderRadius: 21,
  },
  daySelectedText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  selectionSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF6F8',
    paddingVertical: 10,
    borderRadius: 14,
    marginBottom: 16,
  },
  summaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#00A896',
  },
  confirmButton: {
    height: 52,
    backgroundColor: '#00A896',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00A896',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
