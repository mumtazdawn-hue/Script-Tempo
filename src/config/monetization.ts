export interface GearRecommendation {
  id: string;
  category: 'Microphones' | 'Teleprompters' | 'Video Editing' | 'Stock Footage' | 'Audio Interfaces';
  name: string;
  description: string;
  bestFor: string;
  priceEstimate: string;
  keyFeature: string;
  linkText: string;
  url: string;
}

export const CREATOR_TOOLKIT: GearRecommendation[] = [
  {
    id: 'shure-sm7b',
    category: 'Microphones',
    name: 'Shure SM7B Dynamic Vocal Microphone',
    description: 'The industry-standard cardioid dynamic microphone for spoken podcasts, voice-overs, and studio streaming.',
    bestFor: 'Podcasts & Voice-Over Narration',
    priceEstimate: '~$399',
    keyFeature: 'Smooth, flat, wide-range frequency response with electromagnetic hum shielding.',
    linkText: 'Explore Shure SM7B',
    url: 'https://www.shure.com/en-US/products/microphones/sm7b',
  },
  {
    id: 'rode-podmic-usb',
    category: 'Microphones',
    name: 'RØDE PodMic USB / XLR',
    description: 'Versatile broadcast-grade dynamic mic with dual USB-C and XLR connectivity, onboard DSP processing, and built-in pop filter.',
    bestFor: 'Beginner to Intermediate Creators',
    priceEstimate: '~$199',
    keyFeature: 'Dual XLR/USB-C connection with zero-latency headphone monitoring.',
    linkText: 'Explore RØDE PodMic',
    url: 'https://rode.com/en/microphones/usb/podmic-usb',
  },
  {
    id: 'elgato-prompter',
    category: 'Teleprompters',
    name: 'Elgato Prompter with Built-in Display',
    description: 'Hardware teleprompter with an integrated 9-inch screen that mirrors scripts and video feeds without requiring a separate tablet or phone.',
    bestFor: 'YouTube Talking Head & Solo Creators',
    priceEstimate: '~$279',
    keyFeature: 'Built-in 1024x600 display with direct computer USB connection and eye-contact camera alignment.',
    linkText: 'Explore Elgato Prompter',
    url: 'https://www.elgato.com/us/en/p/prompter',
  },
  {
    id: 'davinci-resolve-studio',
    category: 'Video Editing',
    name: 'DaVinci Resolve Studio',
    description: 'Hollywood-standard video editing, color grading, visual effects, and Fairlight audio post-production in a single application.',
    bestFor: 'High-Pacing Video & B-Roll Editing',
    priceEstimate: '$295 (One-time license)',
    keyFeature: 'Neural engine auto-subtitles, scene cut detection, and industry-leading color science.',
    linkText: 'Explore DaVinci Resolve',
    url: 'https://www.blackmagicdesign.com/products/davinciresolve',
  },
  {
    id: 'motu-m2',
    category: 'Audio Interfaces',
    name: 'MOTU M2 2x2 USB-C Audio Interface',
    description: 'Equipped with ESS Sabre32 Ultra DAC technology for pristine vocal tracking and ultra-clean microphone preamplifiers.',
    bestFor: 'Professional Studio Voice-Over',
    priceEstimate: '~$199',
    keyFeature: 'Full-color LCD display with clear input/output volume metering.',
    linkText: 'Explore MOTU M2',
    url: 'https://motu.com/en-us/products/m-series/m2/',
  },
];
