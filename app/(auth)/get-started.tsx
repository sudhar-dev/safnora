import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SAFNORA_BRAND } from '@/constants/theme';
import Moon from 'lucide-react-native/dist/esm/icons/moon';
import Navigation from 'lucide-react-native/dist/esm/icons/navigation';
import Users from 'lucide-react-native/dist/esm/icons/users';
import Banknote from 'lucide-react-native/dist/esm/icons/banknote';
import ChevronRight from 'lucide-react-native/dist/esm/icons/chevron-right';

const { width } = Dimensions.get('window');

export default function GetStartedScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Graphic Header Area with Maximized Logo */}
      <View style={styles.headerGraphic}>
        {/* Crescent Moon & Stars Header */}
        <View style={styles.skyHeader}>
          <View style={styles.moonContainer}>
            <Moon size={24} color="#FFF5C0" />
          </View>
        </View>

        {/* Maximized Logo Container */}
        <View style={styles.heroLogoWrapper}>
          <Image
            source={require('@/assets/images/logo/LogoPng.png')}
            style={styles.maximizedLogo}
            resizeMode="contain"
          />
        </View>

        {/* Mountain Canvas Backdrop */}
        <View style={styles.mountainWrapper}>
          <View style={styles.leftPeak} />
          <View style={styles.centerPeak} />
          <View style={styles.rightPeak} />
        </View>
      </View>

      {/* Main Content Card */}
      <View style={styles.contentCard}>
        <ScrollView contentContainerStyle={styles.scrollInner} showsVerticalScrollIndicator={false}>
          <Text style={styles.greetingTitle}>Welcome to SAFNORA!</Text>
          <Text style={styles.brandTagline}>{SAFNORA_BRAND.tagline}</Text>

          <Text style={styles.description}>
            Connect people, places, plans, expenses, and memories into one complete digital journey.
          </Text>

          {/* Core Feature Badges using Lucide Icons */}
          <View style={styles.featuresRow}>
            <View style={styles.featurePill}>
              <Navigation size={18} color="#00A896" />
              <Text style={styles.featureText}>Plan Trips</Text>
            </View>
            <View style={styles.featurePill}>
              <Users size={18} color="#00A896" />
              <Text style={styles.featureText}>Collaborate</Text>
            </View>
            <View style={styles.featurePill}>
              <Banknote size={18} color="#00A896" />
              <Text style={styles.featureText}>Split Expenses</Text>
            </View>
          </View>

          {/* Primary GET STARTED Button */}
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => router.push('/(auth)/login')}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>GET STARTED</Text>
            <ChevronRight size={20} color="#FFFFFF" style={{ marginLeft: 6 }} />
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
    height: '52%',
    backgroundColor: '#00A896',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  skyHeader: {
    paddingTop: 54,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  moonContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroLogoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: -10,
    zIndex: 5,
  },
  maximizedLogo: {
    width: 220,
    height: 220,
  },
  mountainWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  leftPeak: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: width * 0.35,
    borderRightWidth: width * 0.35,
    borderBottomWidth: 70,
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
    borderStyle: 'solid',
    borderLeftWidth: width * 0.5,
    borderRightWidth: width * 0.5,
    borderBottomWidth: 90,
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
    borderStyle: 'solid',
    borderLeftWidth: width * 0.4,
    borderRightWidth: width * 0.4,
    borderBottomWidth: 60,
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
    marginTop: -16,
    paddingHorizontal: 28,
    paddingTop: 28,
  },
  scrollInner: {
    alignItems: 'center',
    paddingBottom: 36,
  },
  greetingTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0D253F',
    textAlign: 'center',
    marginBottom: 4,
  },
  brandTagline: {
    fontSize: 15,
    fontWeight: '600',
    color: '#00A896',
    textAlign: 'center',
    marginBottom: 14,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 20,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 28,
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
    flexDirection: 'row',
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
    paddingVertical: 8,
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
