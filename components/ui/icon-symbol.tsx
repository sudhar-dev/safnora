import Banknote from 'lucide-react-native/dist/esm/icons/banknote';
import Check from 'lucide-react-native/dist/esm/icons/check';
import ChevronLeft from 'lucide-react-native/dist/esm/icons/chevron-left';
import ChevronRight from 'lucide-react-native/dist/esm/icons/chevron-right';
import Code from 'lucide-react-native/dist/esm/icons/code';
import Eye from 'lucide-react-native/dist/esm/icons/eye';
import EyeOff from 'lucide-react-native/dist/esm/icons/eye-off';
import Home from 'lucide-react-native/dist/esm/icons/home';
import ImageIcon from 'lucide-react-native/dist/esm/icons/image';
import Lock from 'lucide-react-native/dist/esm/icons/lock';
import Mail from 'lucide-react-native/dist/esm/icons/mail';
import MapPin from 'lucide-react-native/dist/esm/icons/map-pin';
import Moon from 'lucide-react-native/dist/esm/icons/moon';
import Navigation from 'lucide-react-native/dist/esm/icons/navigation';
import PlusCircle from 'lucide-react-native/dist/esm/icons/plus-circle';
import User from 'lucide-react-native/dist/esm/icons/user';
import Users from 'lucide-react-native/dist/esm/icons/users';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

const LUCIDE_MAPPING: Record<string, React.FC<any>> = {
  'house.fill': Home,
  'paperplane.fill': Navigation,
  'chevron.left': ChevronLeft,
  'chevron.right': ChevronRight,
  'chevron.left.forwardslash.chevron.right': Code,
  'plus.circle.fill': PlusCircle,
  'map.fill': MapPin,
  'photo.fill': ImageIcon,
  'banknote.fill': Banknote,
  'person.3.fill': Users,
  'lock.fill': Lock,
  'envelope.fill': Mail,
  'person.fill': User,
  'eye.fill': Eye,
  'eye.slash.fill': EyeOff,
  'moon.stars.fill': Moon,
  'checkmark': Check,
};

export type IconSymbolName = keyof typeof LUCIDE_MAPPING;

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
  const IconComponent = LUCIDE_MAPPING[name] || Navigation;
  return <IconComponent size={size} color={color} style={style} />;
}
