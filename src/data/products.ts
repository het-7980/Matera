import type { MediaTone } from "../components/Media";
import { collections } from "./collections";
import { images } from "./images";

export interface Product {
  slug: string;
  name: string;
  collection: string;
  colour: string;
  finish: string;
  size: string;
  surface: string;
  application: string[];
  tone: MediaTone;
  image: string;
  inSituImage: string;
}

export const TILE_FORMATS = ["300 × 450 mm", "300 × 600 mm"] as const;
const [F450, F600] = TILE_FORMATS;

export const products: Product[] = [
  { slug: "ledge-ash", name: "Ash", collection: "Ledge", colour: "Grey", finish: "Matte", size: F600, surface: "Split-Face", application: ["Residential", "Commercial"], tone: "stone", image: images.ledgeGrey, inSituImage: images.appliedStairLedge },
  { slug: "ledge-ochre", name: "Ochre", collection: "Ledge", colour: "Ochre", finish: "Rustic", size: F600, surface: "Stacked", application: ["Residential", "Hospitality"], tone: "sand", image: images.ledgeOchre, inSituImage: images.appliedHallway },
  { slug: "ledge-graphite", name: "Graphite", collection: "Ledge", colour: "Charcoal", finish: "Rustic", size: F450, surface: "Stacked", application: ["Commercial", "Architecture"], tone: "charcoal", image: images.ledgeGraphite, inSituImage: images.bathShowerGrey },
  { slug: "ledge-umber", name: "Umber", collection: "Ledge", colour: "Brown", finish: "Matte", size: F450, surface: "Stacked", application: ["Retail", "Hospitality"], tone: "clay", image: images.ledgePanel, inSituImage: images.appliedStoneWood },
  { slug: "ashlar-flint", name: "Flint", collection: "Ashlar", colour: "Grey", finish: "Matte", size: F600, surface: "Rough-Cut", application: ["Architecture", "Commercial"], tone: "concrete", image: images.ashlarFlint, inSituImage: images.appliedSunlitBlock },
  { slug: "ashlar-carbon", name: "Carbon", collection: "Ashlar", colour: "Charcoal", finish: "Matte", size: F450, surface: "Rough-Cut", application: ["Commercial", "Retail"], tone: "charcoal", image: images.ashlarCarbon, inSituImage: images.appliedSpotlit },
  { slug: "ashlar-honey", name: "Honey", collection: "Ashlar", colour: "Sand", finish: "Rustic", size: F600, surface: "Rough-Cut", application: ["Residential", "Hospitality"], tone: "sand", image: images.ashlarHoney, inSituImage: images.woodStoneLobby },
  { slug: "strata-obsidian", name: "Obsidian", collection: "Strata", colour: "Black", finish: "Satin", size: F600, surface: "Riven", application: ["Hospitality", "Commercial"], tone: "charcoal", image: images.slateRiven, inSituImage: images.appliedSpotlit },
  { slug: "strata-storm", name: "Storm", collection: "Strata", colour: "Grey", finish: "Matte", size: F450, surface: "Riven", application: ["Residential", "Architecture"], tone: "concrete", image: images.slateStacked, inSituImage: images.lobbyElevators },
  { slug: "strata-sediment", name: "Sediment", collection: "Strata", colour: "Brown", finish: "Rustic", size: F600, surface: "Layered", application: ["Hospitality", "Retail"], tone: "stone", image: images.rawRockLayered, inSituImage: images.bathStoneSlab },
  { slug: "relief-furrow", name: "Furrow", collection: "Relief", colour: "Beige", finish: "Matte", size: F600, surface: "Linear Relief", application: ["Commercial", "Residential"], tone: "sand", image: images.reliefLinear, inSituImage: images.appliedLivingRelief },
  { slug: "relief-tumble", name: "Tumble", collection: "Relief", colour: "Cream", finish: "Honed", size: F450, surface: "Tumbled", application: ["Residential", "Hospitality"], tone: "ivory", image: images.tileTravertine, inSituImage: images.appliedBedroomRelief },
  { slug: "relief-terra", name: "Terra", collection: "Relief", colour: "Terracotta", finish: "Rustic", size: F450, surface: "Rough-Cut", application: ["Hospitality", "Retail"], tone: "clay", image: images.stoneTerra, inSituImage: images.appliedStoneWood },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const filterOptions = {
  collection: collections.map((c) => c.name),
  colour: Array.from(new Set(products.map((p) => p.colour))),
  finish: Array.from(new Set(products.map((p) => p.finish))),
  size: [...TILE_FORMATS],
  surface: Array.from(new Set(products.map((p) => p.surface))),
  application: Array.from(new Set(products.flatMap((p) => p.application))),
};
