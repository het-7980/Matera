// Stand-in Unsplash photography (free license) — swap these for commissioned tile/interior shots.
const unsplash = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?w=${w}&q=75&auto=format&fit=crop`;

export const images = {
  // Textured stone-effect surfaces (catalogue swatches)
  ledgeGrey: unsplash("photo-1553345723-5d0630e0886c"),
  ledgeOchre: unsplash("photo-1550379469-5a14b2ae1244"),
  ledgeGraphite: unsplash("photo-1592551464477-c31b047602a0"),
  ledgePanel: unsplash("photo-1773085267084-4b09ba258636"),
  ashlarFlint: unsplash("photo-1605932870425-8c18882e1e49"),
  ashlarCarbon: unsplash("photo-1589562733209-fab72552a40b"),
  ashlarHoney: unsplash("photo-1697497710118-0d5cb5a7094a"),
  ashlarIvory: unsplash("photo-1789659530101-fbdcdc1bb523"),
  slateRiven: unsplash("photo-1767236798861-ba8b6372056a"),
  slateStacked: unsplash("photo-1777537120101-4d413545716b"),
  reliefLinear: unsplash("photo-1589307694123-ddd3b855d598"),
  stoneTerra: unsplash("photo-1571681080959-728311fe47e0"),
  tileSplitFaceStone: unsplash("photo-1675604587493-8c0ed02ff292"),
  tileTravertine: unsplash("photo-1780253460324-9d49f88c74fc"),
  tileWhiteRelief: unsplash("photo-1765556556784-7656ee0a1bd8"),
  stoneWall: unsplash("photo-1641025925967-08057696111e"),

  // Raw material & process
  rawRockLayered: unsplash("photo-1749050202077-286b58247a98"),
  rawRockGranite: unsplash("photo-1749050202257-7e01c6e9b60b"),
  fireFlame: unsplash("photo-1737303093810-60e72847623d"),
  blueprintDesk: unsplash("photo-1781888688940-5730c3fd5baf"),

  // Textured walls in real spaces
  woodStoneLobby: unsplash("photo-1758448511533-e1502259fff6", 2400),
  appliedStairLedge: unsplash("photo-1729252822745-30daad53f224"),
  appliedHallway: unsplash("photo-1769658860715-c4a315ef7ca0"),
  appliedSunlitBlock: unsplash("photo-1783423030874-3681b2741551"),
  appliedSpotlit: unsplash("photo-1783249376432-334401eab2ad"),
  appliedLivingRelief: unsplash("photo-1738585913614-b332230120c2"),
  appliedBedroomRelief: unsplash("photo-1738585608732-49294c24ece0"),
  appliedStoneWood: unsplash("photo-1768320837734-02390d59dfea"),
  bathStoneSlab: unsplash("photo-1650894622076-e09ab837c502"),
  bathShowerGrey: unsplash("photo-1629079447777-1e605162dc8d"),
  lobbyElevators: unsplash("photo-1758448721149-aa0ce8e1b2c9"),
  facadeCurved: unsplash("photo-1763568292230-343af91a3ca7"),
} as const;

const WIDTHS = [480, 800, 1200, 1800, 2400];

const isUnsplash = (url: string) => url.includes("images.unsplash.com");

// `ar` makes the CDN crop to the slot's aspect ratio, so srcset widths match what's actually displayed.
export const unsplashResize = (url: string, w: number, ar?: string) =>
  isUnsplash(url)
    ? url.replace(/([?&])w=\d+/, `$1w=${w}`) + (ar ? `&ar=${ar}` : "")
    : url;

export const unsplashSrcSet = (url: string, ar?: string) =>
  isUnsplash(url)
    ? WIDTHS.map((w) => `${unsplashResize(url, w, ar)} ${w}w`).join(", ")
    : undefined;
