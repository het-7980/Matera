import type { MediaTone } from "../components/Media";
import { images } from "./images";

export interface Collection {
  index: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  tone: MediaTone;
  image: string;
  heroImage: string;
  appliedImage: string;
  colours: string[];
  finishes: string[];
}

export const collections: Collection[] = [
  {
    index: "01",
    slug: "ledge",
    name: "Ledge",
    description: "Stacked courses. Deep shadow lines.",
    longDescription:
      "Thin, split-faced courses stacked in a running rhythm. Ledge gives a wall the depth of hand-laid ledgestone, with shadow lines that shift as the light moves — pressed as modular stoneware tiles so every course lines up.",
    tone: "stone",
    image: images.ledgeGrey,
    heroImage: images.ledgeOchre,
    appliedImage: images.appliedStairLedge,
    colours: ["Ash", "Ochre", "Graphite", "Umber"],
    finishes: ["Matte", "Rustic"],
  },
  {
    index: "02",
    slug: "ashlar",
    name: "Ashlar",
    description: "Cut blocks. Honest weight.",
    longDescription:
      "Rough-cut blocks with softened, quarried edges. Ashlar reads as solid masonry — calm, heavy and architectural — for walls that should feel built rather than finished.",
    tone: "sand",
    image: images.ashlarFlint,
    heroImage: images.ashlarIvory,
    appliedImage: images.appliedSunlitBlock,
    colours: ["Flint", "Carbon", "Honey"],
    finishes: ["Matte", "Rustic"],
  },
  {
    index: "03",
    slug: "strata",
    name: "Strata",
    description: "Riven layers. Geological rhythm.",
    longDescription:
      "Riven slate and sedimentary layers pressed into the tile face. Strata carries the fractured, irregular relief of split rock, and is at its most dramatic under grazing light.",
    tone: "charcoal",
    image: images.slateRiven,
    heroImage: images.rawRockLayered,
    appliedImage: images.appliedSpotlit,
    colours: ["Obsidian", "Storm", "Sediment"],
    finishes: ["Satin", "Matte", "Rustic"],
  },
  {
    index: "04",
    slug: "relief",
    name: "Relief",
    description: "Light, shadow and tactile depth.",
    longDescription:
      "Linear grooves, tumbled faces and rough-cut stone, sculpted to catch light. Every surface plane in Relief casts its own shadow as the sun — or a room's lighting design — moves across the wall.",
    tone: "sand",
    image: images.reliefLinear,
    heroImage: images.appliedBedroomRelief,
    appliedImage: images.appliedLivingRelief,
    colours: ["Furrow", "Tumble", "Terra"],
    finishes: ["Matte", "Honed", "Rustic"],
  },
];

export const getCollection = (slug: string) =>
  collections.find((c) => c.slug === slug);
