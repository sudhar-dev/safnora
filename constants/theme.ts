import { Platform } from "react-native";

export const SAFNORA_BRAND = {
  name: "SAFNORA",
  tagline: "Journeys Together. Memories Forever.",
  sihProblemStatement: "SIH25082",
};

export const Colors = {
  light: {
    text: "#0D253F",
    textSecondary: "#4A6B82",
    textMuted: "#89A4B8",
    background: "#EEF6F8",
    surface: "#FFFFFF",
    surfaceSubtle: "#E2EFF2",
    border: "#D0E2E7",
    tint: "#00A896",
    primary: "#00A896",
    primaryDark: "#008475",
    accent: "#00C49F",
    secondary: "#0B2545",
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    icon: "#4A6B82",
    tabIconDefault: "#89A4B8",
    tabIconSelected: "#00A896",
    card: "#FFFFFF",
    shadow: "rgba(0, 168, 150, 0.12)",
  },
  dark: {
    text: "#F0F9FF",
    textSecondary: "#94A3B8",
    textMuted: "#64748B",
    background: "#0B192C",
    surface: "#1E293B",
    surfaceSubtle: "#0F172A",
    border: "#334155",
    tint: "#00C49F",
    primary: "#00A896",
    primaryDark: "#008475",
    accent: "#38BDF8",
    secondary: "#818CF8",
    success: "#34D399",
    warning: "#FBBF24",
    danger: "#F87171",
    icon: "#94A3B8",
    tabIconDefault: "#64748B",
    tabIconSelected: "#00C49F",
    card: "#1E293B",
    shadow: "rgba(0, 0, 0, 0.4)",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
