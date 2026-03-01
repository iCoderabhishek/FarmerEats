import { Colors } from '@/core/constants/theme';
import Onboarding1 from '@/assets/images/onboarding-1.svg';
import Onboarding2 from '@/assets/images/onboarding-2.svg';
import Onboarding3 from '@/assets/images/onboarding-3.svg';

export const SLIDES = [
  {
    id: '1',
    Image: Onboarding1,
    bg: Colors.onboarding1Bg,
    title: 'Quality',
    description:
      'Sell your farm fresh products directly to consumers, cutting out the middleman and reducing emissions of the global supply chain.',
    buttonBg: Colors.primary,
  },
  {
    id: '2',
    Image: Onboarding2,
    bg: Colors.onboarding2Bg,
    title: 'Convenient',
    description:
      'Our team of delivery drivers will make sure your orders are picked up on time and promptly delivered to your customers.',
    buttonBg: Colors.secondary,
  },
  {
    id: '3',
    Image: Onboarding3,
    bg: Colors.onboarding3Bg,
    title: 'Local',
    description:
      'We love the earth and know you do too! Join us in reducing our local carbon footprint one order at a time.',
    buttonBg: Colors.accent,
  },
] as const;
