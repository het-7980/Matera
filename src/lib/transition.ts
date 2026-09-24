import { createContext, useContext } from "react";

export const IntroContext = createContext(true);
export const PageCurtainContext = createContext(true);

export const useIntroDone = () => useContext(IntroContext);

// True once neither the intro loader nor a page-transition curtain is covering the screen.
export function usePageReady() {
  const intro = useContext(IntroContext);
  const curtain = useContext(PageCurtainContext);
  return intro && curtain;
}
