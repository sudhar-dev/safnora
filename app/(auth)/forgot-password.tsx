import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

export default function ForgotPasswordScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation with Chevron Back Button */}
      <View style={styles.topNav}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Feather name="chevron-left" size={24} color="#0D253F" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Logo Branding */}
        <Image
          source={require("@/assets/images/logo/LogoPng.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />

        <View style={styles.iconCircle}>
          <Feather name="key" size={32} color="#00A896" />
        </View>

        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.message}>Forgot password will come soon</Text>

        <TouchableOpacity
          style={styles.backToLoginButton}
          onPress={() => router.back()}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Back to Log In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topNav: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEF6F8",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -40,
  },
  logoImage: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#EEF6F8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0D253F",
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00A896",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
  },
  backToLoginButton: {
    width: "100%",
    height: 52,
    backgroundColor: "#00A896",
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#00A896",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 1,
  },
});
