export type Track = {
  title: string;
  artist: string;
  /** Real YouTube video ID — played via the IFrame Player API, not self-hosted audio. */
  youtubeId: string;
};

export type Category = {
  slug: string;
  title: string;
  tagline: string;
  /** Full-viewport background photo for this room. */
  bgImage: string;
  tracks: Track[];
  links: {
    spotify: string;
    ytmusic: string;
  };
  /** Base for the simulated live listener count. */
  listenerBase: number;
};

// Placeholder stock photography (Picsum, seeded for stability) — used only for the
// neutral landing/picker background, since each category now has its own illustration.
const bg = (seed: string) => `https://picsum.photos/seed/${seed}/1600/1000`;

export const NEUTRAL_BG = bg("vibe-radio-neutral");

export const categories: Category[] = [
  {
    slug: "90s-bollywood",
    title: "90s Bollywood",
    tagline: "What plays at every Indian barber shop",
    bgImage: "/images/bg-90s-bollywood.png",
    listenerBase: 612,
    links: {
      spotify: "https://open.spotify.com/search/90s%20bollywood%20hits",
      ytmusic: "https://music.youtube.com/search?q=90s+bollywood+hits",
    },
    tracks: [
      { title: "Mujhse Mohabbat Ka Izhaar Karta", artist: "90s Bollywood", youtubeId: "asVkFSVdJPo" },
      { title: "Mere Mehboob Qayamat Hogi", artist: "90s Bollywood", youtubeId: "yIzCBU0_LyY" },
      { title: "Tumsa Koi Pyaara", artist: "90s Bollywood", youtubeId: "Iv3K0sVXmIg" },
      { title: "Meri Neend Mera Chain", artist: "90s Bollywood", youtubeId: "8gw2Roq-olo" },
      { title: "Na Kajre Ki Dhar", artist: "90s Bollywood", youtubeId: "C_wxaIOPMZk" },
      { title: "Pehla Nasha", artist: "Jo Jeeta Wohi Sikandar (1992)", youtubeId: "hXxTe-rYHOY" },
      { title: "Tujhe Dekha To", artist: "Dilwale Dulhania Le Jayenge (1995)", youtubeId: "fwd8fQJXqyg" },
      { title: "Chaiyya Chaiyya", artist: "Dil Se (1998)", youtubeId: "JS68-1RVTNY" },
      { title: "Kuch Kuch Hota Hai", artist: "Kuch Kuch Hota Hai (1998)", youtubeId: "xnGcDsNu5DA" },
      { title: "Ek Ladki Ko Dekha Toh Aisa Laga", artist: "1942: A Love Story (1994)", youtubeId: "4T2NEV0qn34" },
    ],
  },
  {
    slug: "gujarati",
    title: "Gujarati",
    tagline: "Garba, folk, and the songs every Gujarati home knows",
    bgImage: "/images/bg-gujarati.png",
    listenerBase: 348,
    links: {
      spotify: "https://open.spotify.com/search/gujarati%20garba%20hits",
      ytmusic: "https://music.youtube.com/search?q=gujarati+garba+hits",
    },
    tracks: [
      { title: "Khalasi", artist: "Aditya Gadhvi x Achint", youtubeId: "t7wSjy9Lv-o" },
      { title: "Navrangi 2.0", artist: "Kinjal Dave", youtubeId: "BPbbBR0X2GY" },
      { title: "Kachi Re Mati Nu", artist: "Jigardan Gadhavi", youtubeId: "5NyzJ2mudf8" },
      { title: "Kapda Matching Karva Che", artist: "Kaushik Bharwad, Hina Mir", youtubeId: "BjeN_wZwQMg" },
      { title: "Vaagyo Re Dhol", artist: "Bhoomi Trivedi", youtubeId: "sDZA54sTqwQ" },
      { title: "Yaad", artist: "Umesh Barot", youtubeId: "--CyZF71xM0" },
      { title: "Aavi Radha Rani", artist: "Parthiv Gohil, Aishwarya Majmudar", youtubeId: "P9wmpobqfMI" },
      { title: "Garba Shuffle 2.0", artist: "The Comedy Factory", youtubeId: "nHTFqJK_JfA" },
      { title: "Vhalam Aavo Ne", artist: "Jigardan Gadhavi", youtubeId: "Ai1du5CG85g" },
      { title: "Nagar Mein Jogi Aaya", artist: "Aditya Gadhvi", youtubeId: "fGdTFGr8n0E" },
    ],
  },
  {
    slug: "english",
    title: "English",
    tagline: "What's actually playing right now",
    bgImage: "/images/bg-english.png",
    listenerBase: 745,
    links: {
      spotify: "https://open.spotify.com/search/trending%20pop%20hits",
      ytmusic: "https://music.youtube.com/search?q=trending+pop+hits",
    },
    tracks: [
      { title: "I Knew It, I Knew You", artist: "Taylor Swift", youtubeId: "zR3sFBAvREY" },
      { title: "hate that i made you love me", artist: "Ariana Grande", youtubeId: "82-jTNka3uc" },
      { title: "Risk It All", artist: "Bruno Mars", youtubeId: "lY5V4hSLWY8" },
      { title: "drop dead", artist: "Olivia Rodrigo", youtubeId: "78wrful9cVU" },
      { title: "Midnight Sun", artist: "Zara Larsson", youtubeId: "uvY8fdgezLQ" },
      { title: "Animal", artist: "KATSEYE", youtubeId: "m7k9UMcHbr0" },
      { title: "House Tour", artist: "Sabrina Carpenter", youtubeId: "KWoTyfPsqbE" },
      { title: "SPEED DEMON", artist: "Justin Bieber", youtubeId: "4WcD2ncHMVs" },
      { title: "Swim", artist: "BTS", youtubeId: "b4iVv91Z6lY" },
      { title: "Dai Dai", artist: "Shakira, Burna Boy", youtubeId: "H-IGHes_iig" },
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
