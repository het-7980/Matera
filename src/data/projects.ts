import type { MediaTone } from "../components/Media";
import { images } from "./images";

export interface Project {
  slug: string;
  name: string;
  location: string;
  application: string;
  collection: string;
  year: string;
  tone: MediaTone;
  image: string;
  gallery: [string, string, string];
  description: string;
}

export const projects: Project[] = [
  {
    slug: "the-linden-residence",
    name: "The Linden Residence",
    location: "Aspen, Colorado",
    application: "Residential",
    collection: "Ledge",
    year: "2024",
    tone: "stone",
    image: images.appliedStairLedge,
    gallery: [images.ledgeGrey, images.appliedLivingRelief, images.tileSplitFaceStone],
    description:
      "A mountain residence where Ash ledge tiles climb the full height of the main stair, their split-faced courses picking up low alpine light from the landing window.",
  },
  {
    slug: "hotel-alder",
    name: "Hotel Alder",
    location: "Portland, Oregon",
    application: "Hospitality",
    collection: "Strata",
    year: "2023",
    tone: "charcoal",
    image: images.appliedSpotlit,
    gallery: [images.slateRiven, images.appliedHallway, images.slateStacked],
    description:
      "A boutique hotel lobby where Obsidian riven tiles are grazed by a line of recessed spotlights, turning the reception wall into the first thing guests notice.",
  },
  {
    slug: "meridian-tower-lobby",
    name: "Meridian Tower Lobby",
    location: "Chicago, Illinois",
    application: "Commercial",
    collection: "Ashlar",
    year: "2024",
    tone: "concrete",
    image: images.appliedSunlitBlock,
    gallery: [images.ashlarFlint, images.lobbyElevators, images.ashlarIvory],
    description:
      "A double-height commercial lobby clad in Flint blocks, chosen for the way its rough-cut faces break up afternoon sun from the clerestory glazing.",
  },
  {
    slug: "studio-noor",
    name: "Studio Noor",
    location: "Austin, Texas",
    application: "Retail",
    collection: "Relief",
    year: "2023",
    tone: "clay",
    image: images.appliedStoneWood,
    gallery: [images.reliefLinear, images.stoneTerra, images.tileTravertine],
    description:
      "A concept retail space pairing Terra's rough-cut relief with oak panelling, giving the fitting rooms a warm, sculptural backdrop under directional track lighting.",
  },
  {
    slug: "the-birchwood-spa",
    name: "The Birchwood Spa",
    location: "Napa Valley, California",
    application: "Hospitality",
    collection: "Relief",
    year: "2022",
    tone: "sand",
    image: images.appliedBedroomRelief,
    gallery: [images.tileTravertine, images.bathStoneSlab, images.appliedLivingRelief],
    description:
      "A wellness retreat using Tumble behind every treatment bed, backlit so the softened relief glows warmly under low ambient lighting.",
  },
  {
    slug: "arden-street-offices",
    name: "Arden Street Offices",
    location: "Toronto, Ontario",
    application: "Commercial",
    collection: "Ledge",
    year: "2024",
    tone: "sand",
    image: images.appliedHallway,
    gallery: [images.ledgeOchre, images.woodStoneLobby, images.ledgePanel],
    description:
      "A workplace interior where Ochre ledge tiles line the main circulation corridor, bringing warmth and texture to an otherwise quiet palette of timber and plaster.",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
