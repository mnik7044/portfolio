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
import booking1 from '@/assets/projects/booking-assistant/1.webp';
import booking2 from '@/assets/projects/booking-assistant/2.webp';
import booking3 from '@/assets/projects/booking-assistant/3.webp';
import booking4 from '@/assets/projects/booking-assistant/4.webp';
import createAugustaApp1 from '@/assets/projects/create-augusta-app/1.webp';
import createAugustaApp2 from '@/assets/projects/create-augusta-app/2.webp';
import createAugustaApp3 from '@/assets/projects/create-augusta-app/3.webp';
import deliveryBrain1 from '@/assets/projects/delivery-brain/1.webp';
import deliveryBrain2 from '@/assets/projects/delivery-brain/2.webp';
import deliveryBrain3 from '@/assets/projects/delivery-brain/3.webp';
import deliveryBrain4 from '@/assets/projects/delivery-brain/4.webp';
import multisector1 from '@/assets/projects/multisector/1.webp';
import multisector2 from '@/assets/projects/multisector/2.webp';
import multisector3 from '@/assets/projects/multisector/3.webp';
import nivara1 from '@/assets/projects/nivara/1.webp';
import nivara2 from '@/assets/projects/nivara/2.webp';
import nivara3 from '@/assets/projects/nivara/3.webp';
import nivara4 from '@/assets/projects/nivara/4.webp';
import nivaraLogo from '@/assets/projects/nivara/logo.webp';
import nivaraMark from '@/assets/projects/nivara/mark.webp';
import vryseLogo from '@/assets/projects/vryse/logo.webp';

export type Shot = { src: StaticImageData; alt: string };

/** The product's own logo on its brand colour, for the cover and the list thumbnail (like arupb.com). */
export type Brand = {
  logo: StaticImageData;
  /** Square-ish mark for the small thumbnail. */
  mark?: StaticImageData;
  bg: string;
  /** Cap on the cover logo's width, for logos that only exist at small sizes. */
  width?: string;
};

export type ProjectMedia = {
  brand?: Brand;
  /** Screenshots, 16:10, shown as a carousel on the project page. Without a brand, the first is the thumbnail. */
  shots?: Shot[];
};

const vryse: Brand = { logo: vryseLogo, bg: '#4f1c89', width: '14rem' };

// Screenshots are of live public sites, or of local runs on sample/demo data — never real customer
// or patient data. Internal names in client fixtures were swapped for generic ones before capture.
export const media: Partial<Record<string, ProjectMedia>> = {
  'delivery-brain': {
    shots: [
      { src: deliveryBrain1, alt: 'Plans waiting for review, each with its acceptance-criteria coverage (sample data).' },
      { src: deliveryBrain2, alt: 'A plan: why it needs review, and which acceptance criteria are covered, partial or missing.' },
      { src: deliveryBrain3, alt: 'The same plan’s implementation steps, files touched and test plan.' },
      { src: deliveryBrain4, alt: 'Graph explorer for walking a work item’s delivery neighbourhood.' },
    ],
  },
  'booking-assistant': {
    shots: [
      { src: booking1, alt: 'Walkthrough with sample data: approved training requests waiting for a coordinator.' },
      { src: booking2, alt: 'The acknowledgement drafted from the request, ready for the coordinator to send.' },
      { src: booking3, alt: 'Course dates from every centre, ranked and offered to the requester.' },
      { src: booking4, alt: 'The requester’s reply on the ticket, read as option 1.' },
    ],
  },
  'geo-engine': { brand: vryse },
  'geo-agent': { brand: vryse },
  multisector: {
    shots: [
      { src: multisector1, alt: 'Multisector landing page hero.' },
      { src: multisector2, alt: 'Features: lead filtering, enrichment, message generation and campaign automation.' },
      { src: multisector3, alt: 'Multisector sign-in screen.' },
    ],
  },
  'create-augusta-app': {
    shots: [
      { src: createAugustaApp1, alt: 'create-augusta-app in a terminal, choosing the React + FastAPI stack.' },
      { src: createAugustaApp2, alt: 'The feature picker: auth, AI gateway, agents, search, queues, tracing and storage.' },
      { src: createAugustaApp3, alt: 'A finished run: project generated, dependencies installed, and the next steps.' },
    ],
  },
  'landing-page-generator': { brand: vryse },
  'rank-tracker': { brand: vryse },
  deckiq: {
    brand: { logo: deckiqLogo, bg: '#f4f2ed' },
    shots: [
      { src: deckiq1, alt: 'DeckIQ landing page: the hero and an attention chart for a sample deck.' },
      { src: deckiq2, alt: 'Heatmap section grading each slide of a sample deck by attention.' },
      { src: deckiq3, alt: 'Attention section with a treemap of read time per slide.' },
    ],
  },
  gyst: {
    brand: { logo: gystLogo, mark: gystMark, bg: '#0b0b0b', width: '11rem' },
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
  nivara: {
    brand: { logo: nivaraLogo, mark: nivaraMark, bg: '#f7f7f5' },
    shots: [
      { src: nivara1, alt: 'Nivara landing page hero.' },
      { src: nivara2, alt: 'Why Nivara: no visibility, no impact measurement, no guidance.' },
      { src: nivara3, alt: 'Product section: usage intelligence across a team’s AI tools.' },
      { src: nivara4, alt: 'Integrations: the tools Nivara connects to.' },
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
