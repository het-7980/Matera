import type { MediaTone } from "../components/Media";
import { images } from "./images";

export interface CraftStage {
  index: string;
  name: string;
  description: string;
  tone: MediaTone;
  image: string;
}

export const craftStages: CraftStage[] = [
  {
    index: "01",
    name: "Raw Material",
    description: "Clays and mineral bodies are selected and blended to form the base of every stoneware surface we produce.",
    tone: "clay",
    image: images.rawRockLayered,
  },
  {
    index: "02",
    name: "Form",
    description: "The blended body is pressed under high tonnage into precise, dimensionally consistent tile forms.",
    tone: "sand",
    image: images.ashlarIvory,
  },
  {
    index: "03",
    name: "Fire",
    description: "Formed tiles are fired at controlled high temperatures, giving the stoneware its density and durability.",
    tone: "charcoal",
    image: images.fireFlame,
  },
  {
    index: "04",
    name: "Finish",
    description: "The textured face — split, riven, tumbled or relief — is finished to bring each collection's character forward.",
    tone: "stone",
    image: images.tileWhiteRelief,
  },
  {
    index: "05",
    name: "Inspection",
    description: "Each batch is checked for dimensional accuracy, tone consistency and surface integrity before packing.",
    tone: "concrete",
    image: images.ledgeGrey,
  },
  {
    index: "06",
    name: "Space",
    description: "The finished tile leaves the facility ready to become part of a wall, a room, and the life inside it.",
    tone: "marble",
    image: images.appliedStairLedge,
  },
];
