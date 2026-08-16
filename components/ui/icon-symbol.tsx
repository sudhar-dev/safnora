import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const FEATHER_MAPPING: Record<string, keyof typeof Feather.glyphMap> = {
  'house.fill': 'home',
  'paperplane.fill': 'navigation',
  'chevron.left': 'chevron-left',
  'chevron.right': 'chevron-right',
  'chevron.left.forwardslash.chevron.right': 'code',
  'plus.circle.fill': 'plus-circle',
  'map.fill': 'map-pin',
  'photo.fill': 'image',
  'banknote.fill': 'dollar-sign',
  'person.3.fill': 'users',
  'lock.fill': 'lock',
  'envelope.fill': 'mail',
  'person.fill': 'user',
  'eye.fill': 'eye',
  'eye.slash.fill': 'eye-off',
  'moon.stars.fill': 'moon',
  'checkmark': 'check',
};

export type IconSymbolName = keyof typeof FEATHER_MAPPING;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
}) {
  const glyphName = FEATHER_MAPPING[name] || 'navigation';
  return <Feather name={glyphName} size={size} color={color} style={style} />;
}
