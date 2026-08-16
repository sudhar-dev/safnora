import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';
import ChevronLeft from 'lucide-react-native/dist/esm/icons/chevron-left';

export default function AddTripScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();

  const [tripName, setTripName] = useState('');
  const [destination, setDestination] = useState('');
  const [description, setDescription] = useState('');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Create New Trip</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.formContent}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Trip Name</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
          placeholder="e.g. Athirapally & Valparai Gateway"
          placeholderTextColor={colors.textMuted}
          value={tripName}
          onChangeText={setTripName}
        />

        <Text style={[styles.label, { color: colors.textSecondary }]}>Destination</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
          placeholder="Search destination or city..."
          placeholderTextColor={colors.textMuted}
          value={destination}
          onChangeText={setDestination}
        />

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
          onPress={() => router.back()}
        >
          <Text style={styles.submitText}>Save & Start Planning</Text>
        </TouchableOpacity>
      </ScrollView>
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
  label: { fontSize: 14, fontWeight: '600', marginTop: 16, marginBottom: 8 },
  input: { height: 48, borderRadius: 12, borderWidth: 1, paddingHorizontal: 16, fontSize: 15 },
  textArea: { height: 100, borderRadius: 12, borderWidth: 1, padding: 12, fontSize: 15, textAlignVertical: 'top' },
  submitButton: { height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 28 },
  submitText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
});
