import React from 'react';
import {SvgProps} from 'react-native-svg';
import Bell from './bell.svg';
import Calendar from './calendar.svg';
import Check from './check.svg';
import ChevronLeft from './chevron-left.svg';
import ChevronRight from './chevron-right.svg';
import Close from './close.svg';
import Document from './document.svg';
import Download from './download.svg';
import Eye from './eye.svg';
import EyeOff from './eye-off.svg';
import FaceId from './face-id.svg';
import Filter from './filter.svg';
import Help from './help.svg';
import Home from './home.svg';
import IdCard from './id-card.svg';
import Info from './info.svg';
import Lock from './lock.svg';
import Logo from './logo.svg';
import Logout from './logout.svg';
import Minus from './minus.svg';
import OpenExternal from './open-external.svg';
import PayStubs from './pay-stubs.svg';
import Plus from './plus.svg';
import Profile from './profile.svg';
import Refresh from './refresh.svg';
import Shield from './shield.svg';
import Theme from './theme.svg';
import W2 from './w2.svg';

/**
 * Icon registry. To add an icon: drop `<name>.svg` in this folder (use
 * `stroke="currentColor"` so it can be tinted), import it here and add it to
 * `icons`. Consume it through <Icon name="..." /> — never import SVGs directly
 * inside screens/components (except the multi-colour `Logo`).
 */
export const icons = {
  bell: Bell,
  calendar: Calendar,
  check: Check,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  close: Close,
  document: Document,
  download: Download,
  eye: Eye,
  'eye-off': EyeOff,
  'face-id': FaceId,
  filter: Filter,
  help: Help,
  home: Home,
  'id-card': IdCard,
  info: Info,
  lock: Lock,
  logout: Logout,
  minus: Minus,
  'open-external': OpenExternal,
  'pay-stubs': PayStubs,
  plus: Plus,
  profile: Profile,
  refresh: Refresh,
  shield: Shield,
  theme: Theme,
  w2: W2,
} satisfies Record<string, React.FC<SvgProps>>;

export type IconName = keyof typeof icons;

export {Logo};
