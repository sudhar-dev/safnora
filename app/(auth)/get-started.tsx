import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, SAFNORA_BRAND } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';

const { width } = Dimensions.get('window');

export default function GetStartedScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Graphic Header Area */}
      <View style={styles.headerGraphic}>
        {/* Crescent Moon & Stars Header */}
        <View style={styles.skyHeader}>
          <View style={styles.moonContainer}>
            <IconSymbol size={28} name="moon.stars.fill" color="#FFF5C0" />
          </View>
          <View style={styles.starsRow}>
            <View style={[styles.starDot, { top: 20, left: 40 }]} />
            <View style={[styles.starDot, { top: 45, left: 120 }]} />
            <View style={[styles.starDot, { top: 15, right: 60 }]} />
          </View>
        </View>

        {/* Mountain Silhouette Canvas */}
        <View style={styles.mountainWrapper}>
          {/* Logo Badge in Hero */}
          <Image
            source={require('@/assets/images/logo/LogoPng.png')}
            style={styles.logoBadge}
            resizeMode="contain"
          />

          {/* SVG/Styled Mountain Peaks */}
          <View style={styles.peaksContainer}>
            <View style={styles.leftPeak} />
            <View style={styles.centerPeak} />
            <View style={styles.rightPeak} />
          </View>
        </View>
      </View>

      {/* Main Content Area */}
      <View style={styles.contentCard}>
        <ScrollView contentContainerStyle={styles.scrollInner} showsVerticalScrollIndicator={false}>
          <Text style={styles.greetingTitle}>Welcome to SAFNORA!</Text>
          <Text style={styles.brandTagline}>{SAFNORA_BRAND.tagline}</Text>

          <Text style={styles.description}>
            Connect people, places, plans, expenses, and memories into one complete digital journey.
          </Text>

          {/* Core Feature Badges matching screenshot icon row */}
          <View style={styles.featuresRow}>
            <View style={styles.featurePill}>
              <IconSymbol size={18} name="paperplane.fill" color="#00A896" />
              <Text style={styles.featureText}>Plan Trips</Text>
            </View>
            <View style={styles.featurePill}>
              <IconSymbol size={18} name="person.3.fill" color="#00A896" />
              <Text style={styles.featureText}>Collaborate</Text>
            </View>
            <View style={styles.featurePill}>
              <IconSymbol size={18} name="banknote.fill" color="#00A896" />
              <Text style={styles.featureText}>Split Expenses</Text>
            </View>
          </View>

          {/* Primary CTA Buttons */}
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => router.push('/(auth)/signup')}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>GET STARTED</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginLinkButton}
            onPress={() => router.push('/(auth)/login')}
            activeOpacity={0.7}
          >
            <Text style={styles.loginLinkText}>
              Already have an account? <Text style={styles.loginBold}>Log In</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D253F',
  },
  headerGraphic: {
    height: '48%',
    backgroundColor: '#00A896',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  skyHeader: {
    paddingTop: 50,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moonContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starsRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 50,
  },
  starDot: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
    opacity: 0.8,
  },
  mountainWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  logoBadge: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  peaksContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: width,
    height: 90,
  },
  leftPeak: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: width * 0.35,
    borderRightWidth: width * 0.35,
    borderBottomWidth: 80,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFFFFF',
    position: 'absolute',
    left: -20,
    bottom: 0,
  },
  centerPeak: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: width * 0.5,
    borderRightWidth: width * 0.5,
    borderBottomWidth: 100,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFFFFF',
    position: 'absolute',
    left: width * 0.1,
    bottom: 0,
  },
  rightPeak: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: width * 0.4,
    borderRightWidth: width * 0.4,
    borderBottomWidth: 70,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFFFFF',
    position: 'absolute',
    right: -30,
    bottom: 0,
  },
  contentCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -20,
    paddingHorizontal: 28,
    paddingTop: 32,
  },
  scrollInner: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  greetingTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0D253F',
    textAlign: 'center',
    marginBottom: 6,
  },
  brandTagline: {
    fontSize: 15,
    fontWeight: '600',
    color: '#00A896',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 24,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
    flexWrap: 'wrap',
  },
  featurePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EEF6F8',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  featureText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0D253F',
  },
  getStartedButton: {
    width: '100%',
    height: 54,
    backgroundColor: '#00A896',
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00A896',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  loginLinkButton: {
    paddingVertical: 10,
  },
  loginLinkText: {
    fontSize: 14,
    color: '#64748B',
  },
  loginBold: {
    color: '#00A896',
    fontWeight: '700',
  },
});
