import type { StaticImageData } from 'next/image';

import ageMedical1 from '@/assets/projects/age-medical/1.webp';
import ageMedical2 from '@/assets/projects/age-medical/2.webp';
import ageMedicalLogo from '@/assets/projects/age-medical/logo.webp';
import deckiq1 from '@/assets/projects/deckiq/1.webp';
import deckiq2 from '@/assets/projects/deckiq/2.webp';
import deckiq3 from '@/assets/projects/deckiq/3.webp';
import deckiqLogo from '@/assets/projects/deckiq/logo.webp';
import elephantroom1 from '@/assets/projects/elephantroom/1.webp';
import elephantroom2 from '@/assets/projects/elephantroom/2.webp';
import elephantroomLogo from '@/assets/projects/elephantroom/logo.webp';
import elephantroomMark from '@/assets/projects/elephantroom/mark.webp';
import fengshui1 from '@/assets/projects/fengshui-modern/1.webp';
import fengshui2 from '@/assets/projects/fengshui-modern/2.webp';
import fengshui3 from '@/assets/projects/fengshui-modern/3.webp';
import gyst1 from '@/assets/projects/gyst/1.webp';
import gyst2 from '@/assets/projects/gyst/2.webp';
import gyst3 from '@/assets/projects/gyst/3.webp';
import gystLogo from '@/assets/projects/gyst/logo.webp';
import gystMark from '@/assets/projects/gyst/mark.webp';
import modernstone1 from '@/assets/projects/modernstone/1.webp';
import modernstone2 from '@/assets/projects/modernstone/2.webp';
import modernstoneLogo from '@/assets/projects/modernstone/logo.webp';
import modernstoneMark from '@/assets/projects/modernstone/mark.webp';

export type Shot = { src: StaticImageData; alt: string };

/** The product's own logo on its brand colour, for the cover and the list thumbnail (like arupb.com). */
export type Brand = { logo: StaticImageData; /** Square-ish mark for the small thumbnail. */ mark?: StaticImageData; bg: string };

export type ProjectMedia = {
  brand?: Brand;
  /** Screenshots, 16:10, shown as a carousel on the project page. Without a brand, the first is the thumbnail. */
  shots?: Shot[];
};

// Screenshots are of live public sites or of demo data only — never real customer or patient data.
export const media: Partial<Record<string, ProjectMedia>> = {
  deckiq: {
    brand: { logo: deckiqLogo, bg: '#f4f2ed' },
    shots: [
      { src: deckiq1, alt: 'DeckIQ landing page: the hero and an attention chart for a sample deck.' },
      { src: deckiq2, alt: 'Heatmap section grading each slide of a sample deck by attention.' },
      { src: deckiq3, alt: 'Attention section with a treemap of read time per slide.' },
    ],
  },
  gyst: {
    brand: { logo: gystLogo, mark: gystMark, bg: '#0b0b0b' },
    shots: [
      { src: gyst1, alt: 'GYST analytics overview: revenue, followers, views, likes and comments across platforms.' },
      { src: gyst2, alt: 'Connected platforms: YouTube, Instagram, TikTok, Twitch, Patreon and Beehiiv.' },
      { src: gyst3, alt: 'GYST dashboard home with the voice assistant and AI insights.' },
    ],
  },
  elephantroom: {
    brand: { logo: elephantroomLogo, mark: elephantroomMark, bg: '#fce4ea' },
    shots: [
      { src: elephantroom1, alt: 'elephantroom landing page: the hero and the app’s 3D room view.' },
      { src: elephantroom2, alt: 'Style carousel: Bohemian, Rustic, Minimalist, Contemporary and Industrial rooms.' },
    ],
  },
  modernstone: {
    brand: { logo: modernstoneLogo, mark: modernstoneMark, bg: '#f7f8fc' },
    shots: [
      { src: modernstone1, alt: 'Modernstone home page hero.' },
      { src: modernstone2, alt: 'What we offer: kitchens and vanities.' },
    ],
  },
  'age-medical': {
    brand: { logo: ageMedicalLogo, bg: '#24261f' },
    shots: [
      { src: ageMedical1, alt: 'Patient dashboard with demo data: health score, vitals, upcoming appointments and lab records.' },
      { src: ageMedical2, alt: 'Age Medical sign-in screen.' },
    ],
  },
  'fengshui-modern': {
    shots: [
      { src: fengshui1, alt: 'Onboarding step: a short questionnaire about the household.' },
      { src: fengshui2, alt: 'Floor-plan editor with rooms, environment and furniture panels.' },
      { src: fengshui3, alt: 'Feng shui analysis view with numbered findings on the floor plan.' },
    ],
  },
};
