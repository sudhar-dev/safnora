import { Platform } from 'react-native';

export const SAFNORA_BRAND = {
  name: 'SAFNORA',
  tagline: 'Journeys Together. Memories Forever.',
  sihProblemStatement: 'SIH25082',
};

export const Colors = {
  light: {
    text: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceSubtle: '#F1F5F9',
    border: '#E2E8F0',
    tint: '#0284C7',
    primary: '#0284C7',
    primaryDark: '#0369A1',
    accent: '#38BDF8',
    secondary: '#6366F1',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    icon: '#64748B',
    tabIconDefault: '#94A3B8',
    tabIconSelected: '#0284C7',
    card: '#FFFFFF',
    shadow: 'rgba(15, 23, 42, 0.08)',
  },
  dark: {
    text: '#F8FAFC',
    textSecondary: '#CBD5E1',
    textMuted: '#64748B',
    background: '#0B0F19',
    surface: '#1E293B',
    surfaceSubtle: '#0F172A',
    border: '#334155',
    tint: '#38BDF8',
    primary: '#38BDF8',
    primaryDark: '#0284C7',
    accent: '#818CF8',
    secondary: '#A5B4FC',
    success: '#34D399',
    warning: '#FBBF24',
    danger: '#F87171',
    icon: '#94A3B8',
    tabIconDefault: '#64748B',
    tabIconSelected: '#38BDF8',
    card: '#1E293B',
    shadow: 'rgba(0, 0, 0, 0.4)',
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
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
