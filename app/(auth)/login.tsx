import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import Feather from '@expo/vector-icons/Feather';

const { width } = Dimensions.get('window');
const FORM_WIDTH = width - 48; // Padding 24 on each side

export default function AuthScreen() {
  const router = useRouter();
  const { signIn, signUp } = useAuth();

  // Keep 'login' as initial active tab as requested by user
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  // Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Smooth Horizontal Slide Animation (Left to Right)
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleTabSwitch = (tab: 'login' | 'signup') => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setErrorMsg('');

    // Smooth Left-to-Right Horizontal Slide Effect
    Animated.spring(slideAnim, {
      toValue: tab === 'signup' ? -FORM_WIDTH : 0,
      tension: 48,
      friction: 9,
      useNativeDriver: true,
    }).start();
  };

  const handleLoginSubmit = async () => {
    if (!loginEmail || !loginPassword) {
      setErrorMsg('Please enter both email and password.');
      return;
    }
    setErrorMsg('');
    await signIn(loginEmail);
    router.replace('/(tabs)');
  };

  const handleSignUpSubmit = async () => {
    if (!signUpName || !signUpEmail || !signUpPassword) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('Please accept the terms to continue.');
      return;
    }
    setErrorMsg('');
    await signUp(signUpEmail, signUpName);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Top Navigation - Chevron Back Button Only */}
          <View style={styles.topNav}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton} activeOpacity={0.7}>
              <Feather name="chevron-left" size={24} color="#0D253F" />
            </TouchableOpacity>
          </View>

          {/* Hero Branding */}
          <View style={styles.brandContainer}>
            <Image
              source={require('@/assets/images/logo/LogoPng.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.title}>
              {activeTab === 'login' ? 'Welcome Back!' : 'Create Account'}
            </Text>
            <Text style={styles.subtitle}>
              {activeTab === 'login'
                ? 'Sign in to access your trip dashboard & group itineraries'
                : 'Join SAFNORA to start planning collaborative group trips!'}
            </Text>
          </View>

          {/* Interactive Horizontal Tab Switcher */}
          <View style={styles.tabSwitcher}>
            {/* Animated Active Pill Indicator */}
            <Animated.View
              style={[
                styles.activeIndicator,
                {
                  transform: [
                    {
                      translateX: slideAnim.interpolate({
                        inputRange: [-FORM_WIDTH, 0],
                        outputRange: [(FORM_WIDTH - 8) / 2, 0],
                      }),
                    },
                  ],
                },
              ]}
            />
            <TouchableOpacity
              style={styles.tabButton}
              onPress={() => handleTabSwitch('login')}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeTab === 'login' && styles.activeTabText]}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tabButton}
              onPress={() => handleTabSwitch('signup')}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeTab === 'signup' && styles.activeTabText]}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

          {/* Side-by-Side Horizontal Sliding Container (Left to Right) */}
          <View style={styles.slidingViewport}>
            <Animated.View
              style={[
                styles.slidingTrack,
                {
                  transform: [{ translateX: slideAnim }],
                },
              ]}
            >
              {/* LOG IN FORM (Left Panel) */}
              <View style={styles.formPanel}>
                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>Email Address</Text>
                  <View style={styles.inputWrapper}>
                    <Feather name="mail" size={20} color="#00A896" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="name@example.com"
                      placeholderTextColor="#94A3B8"
                      value={loginEmail}
                      onChangeText={setLoginEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <View style={styles.inputWrapper}>
                    <Feather name="lock" size={20} color="#00A896" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter password"
                      placeholderTextColor="#94A3B8"
                      value={loginPassword}
                      onChangeText={setLoginPassword}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                      {showPassword ? <Feather name="eye-off" size={20} color="#64748B" /> : <Feather name="eye" size={20} color="#64748B" />}
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.forgotPassword}
                  onPress={() => router.push('/(auth)/forgot-password')}
                >
                  <Text style={styles.forgotText}>Forgot password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.primaryButton} onPress={handleLoginSubmit} activeOpacity={0.85}>
                  <Text style={styles.primaryButtonText}>LOG IN</Text>
                </TouchableOpacity>
              </View>

              {/* SIGN UP FORM (Right Panel) */}
              <View style={styles.formPanel}>
                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>Full Name</Text>
                  <View style={styles.inputWrapper}>
                    <Feather name="user" size={20} color="#00A896" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. Thiru Arasu"
                      placeholderTextColor="#94A3B8"
                      value={signUpName}
                      onChangeText={setSignUpName}
                    />
                  </View>
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>Email Address</Text>
                  <View style={styles.inputWrapper}>
                    <Feather name="mail" size={20} color="#00A896" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="name@example.com"
                      placeholderTextColor="#94A3B8"
                      value={signUpEmail}
                      onChangeText={setSignUpEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <View style={styles.inputWrapper}>
                    <Feather name="lock" size={20} color="#00A896" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="At least 6 characters"
                      placeholderTextColor="#94A3B8"
                      value={signUpPassword}
                      onChangeText={setSignUpPassword}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                      {showPassword ? <Feather name="eye-off" size={20} color="#64748B" /> : <Feather name="eye" size={20} color="#64748B" />}
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.termsRow}
                  onPress={() => setAgreeTerms(!agreeTerms)}
                  activeOpacity={0.8}
                >
                  {agreeTerms ? (
                    <Feather name="check-square" size={20} color="#00A896" style={{ marginRight: 10 }} />
                  ) : (
                    <Feather name="square" size={20} color="#94A3B8" style={{ marginRight: 10 }} />
                  )}
                  <Text style={styles.termsText}>
                    I agree to the <Text style={styles.linkText}>Terms of Service</Text> and{' '}
                    <Text style={styles.linkText}>Privacy Policy</Text>.
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.primaryButton} onPress={handleSignUpSubmit} activeOpacity={0.85}>
                  <Text style={styles.primaryButtonText}>CREATE ACCOUNT</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Google Login Button */}
          <TouchableOpacity
            style={styles.googleButton}
            onPress={() => {
              signUp('google-user@safnora.com', 'Google Explorer');
              router.replace('/(tabs)');
            }}
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: 'https://img.icons8.com/color/48/google-logo.png' }}
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  topNav: {
    paddingTop: 12,
    marginBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF6F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0D253F',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 20,
  },
  tabSwitcher: {
    flexDirection: 'row',
    backgroundColor: '#EEF6F8',
    borderRadius: 24,
    padding: 4,
    marginBottom: 24,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    left: 4,
    width: (FORM_WIDTH - 8) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    zIndex: 1,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  activeTabText: {
    color: '#00A896',
    fontWeight: '700',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 13,
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  slidingViewport: {
    width: FORM_WIDTH,
    overflow: 'hidden',
  },
  slidingTrack: {
    flexDirection: 'row',
    width: FORM_WIDTH * 2,
  },
  formPanel: {
    width: FORM_WIDTH,
  },
  formGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0D253F',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    color: '#0D253F',
  },
  eyeIcon: {
    padding: 6,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    color: '#00A896',
    fontSize: 13,
    fontWeight: '600',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  termsText: {
    fontSize: 13,
    color: '#64748B',
    flex: 1,
    lineHeight: 18,
  },
  linkText: {
    color: '#00A896',
    fontWeight: '700',
  },
  primaryButton: {
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
    marginBottom: 20,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '500',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0D253F',
  },
});
