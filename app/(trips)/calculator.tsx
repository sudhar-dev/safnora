import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@/context/ThemeContext';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';

export default function ExpenseCalculatorScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();

  const [expenseTitle, setExpenseTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('Thiru Arasu');
  const [splitMembers, setSplitMembers] = useState(5);

  const [expenses, setExpenses] = useState([
    { id: '1', title: 'Resort Stay & Cabins', amount: 12500, paidBy: 'Thiru Arasu', perPerson: 2500 },
    { id: '2', title: 'Waterfall Entry Tickets & Guide', amount: 1850, paidBy: 'Arun Kumar', perPerson: 370 },
    { id: '3', title: 'Traditional Kerala Lunch', amount: 4100, paidBy: 'Thiru Arasu', perPerson: 820 },
  ]);

  const handleAddExpense = () => {
    if (!expenseTitle.trim() || !amount.trim()) return;
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) return;

    const perPerson = Math.round(numericAmount / splitMembers);

    setExpenses([
      {
        id: Date.now().toString(),
        title: expenseTitle.trim(),
        amount: numericAmount,
        paidBy,
        perPerson,
      },
      ...expenses,
    ]);

    setExpenseTitle('');
    setAmount('');
  };

  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
  const perPersonShare = Math.round(totalExpense / Math.max(1, splitMembers));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Trip Expenses & Split</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Total Expense Hero Card */}
        <View style={[styles.totalCard, { backgroundColor: '#00A896' }]}>
          <Text style={styles.totalLabel}>Total Trip Expenses</Text>
          <Text style={styles.totalAmount}>₹{totalExpense.toLocaleString()}</Text>

          <View style={styles.splitRow}>
            <View style={styles.splitItem}>
              <Text style={styles.splitSubLabel}>Group Size</Text>
              <Text style={styles.splitSubValue}>{splitMembers} Members</Text>
            </View>

            <View style={styles.splitDivider} />

            <View style={styles.splitItem}>
              <Text style={styles.splitSubLabel}>Cost Per Person</Text>
              <Text style={styles.splitSubValue}>₹{perPersonShare.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        {/* Add Expense Form */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Add New Shared Expense</Text>
        <View style={[styles.formCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Expense Title</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.surfaceSubtle, color: colors.text, borderColor: colors.border }]}
            placeholder="e.g. Dinner & Drinks"
            placeholderTextColor={colors.textMuted}
            value={expenseTitle}
            onChangeText={setExpenseTitle}
          />

          <View style={styles.amountPaidRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Amount (₹)</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.surfaceSubtle, color: colors.text, borderColor: colors.border }]}
                placeholder="2500"
                placeholderTextColor={colors.textMuted}
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Paid By</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.surfaceSubtle, color: colors.text, borderColor: colors.border }]}
                value={paidBy}
                onChangeText={setPaidBy}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleAddExpense} activeOpacity={0.85}>
            <Feather name="plus-circle" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.addButtonText}>Record Expense</Text>
          </TouchableOpacity>
        </View>

        {/* Expense History List */}
        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 20 }]}>Expense History</Text>
        <View style={[styles.historyCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {expenses.map((item, idx) => (
            <View
              key={item.id}
              style={[
                styles.historyRow,
                idx < expenses.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
              ]}
            >
              <View style={styles.iconCircle}>
                <Text style={styles.rupeeBadgeText}>₹</Text>
              </View>

              <View style={styles.historyInfo}>
                <Text style={[styles.itemTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.itemMeta, { color: colors.textSecondary }]}>
                  Paid by {item.paidBy} • ₹{item.perPerson}/person
                </Text>
              </View>

              <Text style={styles.itemAmount}>₹{item.amount.toLocaleString()}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '800' },
  scrollContent: { padding: 20 },
  totalCard: {
    padding: 24,
    borderRadius: 22,
    alignItems: 'center',
    marginBottom: 24,
  },
  totalLabel: { color: '#E0F2FE', fontSize: 13, fontWeight: '600', marginBottom: 4 },
  totalAmount: { color: '#FFFFFF', fontSize: 34, fontWeight: '800', marginBottom: 18 },
  splitRow: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.25)',
  },
  splitItem: { flex: 1, alignItems: 'center' },
  splitSubLabel: { color: '#E0F2FE', fontSize: 12 },
  splitSubValue: { color: '#FFFFFF', fontSize: 16, fontWeight: '800', marginTop: 2 },
  splitDivider: { width: 1, height: 28, backgroundColor: 'rgba(255, 255, 255, 0.25)' },
  sectionTitle: { fontSize: 16, fontWeight: '800', marginBottom: 12 },
  formCard: {
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 10,
  },
  inputLabel: { fontSize: 13, fontWeight: '700', marginBottom: 6 },
  input: { height: 48, borderRadius: 12, borderWidth: 1, paddingHorizontal: 14, fontSize: 14, marginBottom: 14 },
  amountPaidRow: { flexDirection: 'row', gap: 12 },
  addButton: {
    height: 48,
    borderRadius: 24,
    backgroundColor: '#00A896',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  addButtonText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
  historyCard: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EEF6F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rupeeBadgeText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#00A896',
  },
  historyInfo: { flex: 1 },
  itemTitle: { fontSize: 15, fontWeight: '700' },
  itemMeta: { fontSize: 12, marginTop: 2 },
  itemAmount: { fontSize: 16, fontWeight: '800', color: '#00A896' },
});
