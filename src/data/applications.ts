import type { MediaTone } from "../components/Media";
import { images } from "./images";

export interface Application {
  name: string;
  description: string;
  tone: MediaTone;
  image: string;
}

export const applications: Application[] = [
  { name: "Residential", description: "Feature walls, stairwells and living spaces where texture is meant to be lived with, not just looked at.", tone: "sand", image: images.appliedLivingRelief },
  { name: "Hospitality", description: "Lobbies and suites where a lit, textured wall sets the tone before a word is spoken.", tone: "charcoal", image: images.appliedSpotlit },
  { name: "Commercial", description: "Corridors and receptions that need depth and character under daily use.", tone: "stone", image: images.appliedHallway },
  { name: "Retail", description: "Environments designed to hold attention and reinforce a brand's material language.", tone: "clay", image: images.appliedStoneWood },
  { name: "Architecture", description: "Large wall planes where the surface itself becomes the architecture.", tone: "concrete", image: images.appliedSunlitBlock },
];
