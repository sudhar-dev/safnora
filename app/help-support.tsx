import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@/context/ThemeContext';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';

export default function HelpSupportScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();

  const [expandedFaq, setExpandedFaq] = useState<string | null>('1');
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      id: '1',
      question: 'How do I create a new group trip?',
      answer: 'Go to the Trips tab or click the + FAB button. Enter your Trip Name, Starting Point, Destination, and Dates to save the trip to your workspace.',
    },
    {
      id: '2',
      question: 'How does SAFNORA calculate expense splits?',
      answer: 'SAFNORA takes total expense amounts and automatically divides them equally by the number of active group members, showing exact cost per person.',
    },
    {
      id: '3',
      question: 'Can I invite friends who don’t have SAFNORA?',
      answer: 'Yes! Use the Share Invite Link button in the Friends & Contacts tab to send an SMS or WhatsApp invite link to any contact.',
    },
    {
      id: '4',
      question: 'How do I change the cover photo of my trip?',
      answer: 'Open your trip details dashboard and tap the "Change Cover" badge on the hero photo card to pick a new background picture.',
    },
  ];

  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@safnora.com?subject=SAFNORA%20Help%20Request');
  };

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { backgroundColor: colors.surfaceSubtle }]}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Help & Support</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Support Banner */}
        <View style={[styles.bannerCard, { backgroundColor: '#00A896' }]}>
          <Feather name="help-circle" size={32} color="#FFFFFF" style={{ marginBottom: 8 }} />
          <Text style={styles.bannerTitle}>How can we help you today?</Text>
          <Text style={styles.bannerSub}>Search our knowledge base or get in touch with our team</Text>
        </View>

        {/* FAQ Search Bar */}
        <View style={[styles.searchWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Feather name="search" size={18} color={colors.textMuted} style={{ marginRight: 10 }} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search FAQs & travel guides..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* FAQs Accordion */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Frequently Asked Questions</Text>
        <View style={[styles.faqCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {filteredFaqs.map((faq, idx) => {
            const isExpanded = expandedFaq === faq.id;
            return (
              <View
                key={faq.id}
                style={[
                  styles.faqRow,
                  idx < filteredFaqs.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
                ]}
              >
                <TouchableOpacity
                  style={styles.faqQuestionRow}
                  onPress={() => setExpandedFaq(isExpanded ? null : faq.id)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.faqQuestionText, { color: colors.text }]}>{faq.question}</Text>
                  <Feather name={isExpanded ? 'chevron-up' : 'chevron-down'} size={18} color={colors.textMuted} />
                </TouchableOpacity>

                {isExpanded ? <Text style={[styles.faqAnswerText, { color: colors.textSecondary }]}>{faq.answer}</Text> : null}
              </View>
            );
          })}
        </View>

        {/* Direct Contact Options */}
        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 24 }]}>Contact SAFNORA Team</Text>
        <View style={styles.contactRowGrid}>
          <TouchableOpacity style={[styles.contactTile, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={handleEmailSupport}>
            <View style={[styles.iconCircle, { backgroundColor: '#00A89615' }]}>
              <Feather name="mail" size={20} color="#00A896" />
            </View>
            <Text style={[styles.contactTileTitle, { color: colors.text }]}>Email Support</Text>
            <Text style={[styles.contactTileSub, { color: colors.textSecondary }]}>support@safnora.com</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.contactTile, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={handleEmailSupport}>
            <View style={[styles.iconCircle, { backgroundColor: '#6366F115' }]}>
              <Feather name="message-square" size={20} color="#6366F1" />
            </View>
            <Text style={[styles.contactTileTitle, { color: colors.text }]}>Live Helpdesk</Text>
            <Text style={[styles.contactTileSub, { color: colors.textSecondary }]}>24/7 Response</Text>
          </TouchableOpacity>
        </View>

        {/* App Version Info Footer */}
        <View style={styles.versionFooter}>
          <Text style={[styles.versionText, { color: colors.textMuted }]}>SAFNORA App v2.4.0 (Latest Release)</Text>
        </View>
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
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '800' },
  scrollContent: { padding: 20 },
  bannerCard: {
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerTitle: { fontSize: 18, fontWeight: '800', color: '#FFFFFF', marginBottom: 4 },
  bannerSub: { fontSize: 13, color: '#E0F2FE', textAlign: 'center' },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    marginBottom: 24,
  },
  searchInput: { flex: 1, fontSize: 14 },
  sectionTitle: { fontSize: 16, fontWeight: '800', marginBottom: 12 },
  faqCard: {
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  faqRow: { paddingVertical: 14 },
  faqQuestionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  faqQuestionText: { fontSize: 15, fontWeight: '700', flex: 1, marginRight: 10 },
  faqAnswerText: { fontSize: 13, lineHeight: 19, marginTop: 8 },
  contactRowGrid: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  contactTile: {
    flex: 1,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactTileTitle: { fontSize: 14, fontWeight: '700' },
  contactTileSub: { fontSize: 11, marginTop: 2 },
  versionFooter: { alignItems: 'center', marginTop: 10 },
  versionText: { fontSize: 12, fontWeight: '600' },
});
